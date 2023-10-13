import './App.css'
import 'semantic-ui-css/semantic.min.css'
import { createMedia } from '@artsy/fresnel'
import { Container, Grid, Header, Image, Loader, Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import wedding from './assets/wed2.svg'
import { useEffect, useState } from 'react'
import { AgreeModal, RejectModal } from './Modals'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024
  }
})

const deadline = new Date('2023-12-16 15:00:00').getTime()

const HomepageHeading = ({ mobile }) => {
  const [days, setDays] = useState({ days: 0, minutes: 0, hours: 0, seconds: 0, time_up: '' })
  const count = () => {
    const now = new Date().getTime()
    const t = deadline - now
    const days = Math.floor(t / (1000 * 60 * 60 * 24))
    const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((t % (1000 * 60)) / 1000)
    setDays({ days, minutes, hours, seconds })
    if (t < 0) {
      clearInterval({ days: 0, minutes: 0, hours: 0, seconds: 0, time_up: 'TIME IS UP' })
    }
  }

  setInterval(count, 1000)

  return (
    <Container>
      <Header
        as="h2"
        content="Приглашение на свадьбу"
        style={{
          fontFamily: 'Pacifico, cursive',
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: '100',
          marginBottom: 0,
          marginTop: mobile ? '1.5em' : '3em',
          color: '#00b5ad'
        }}
      />
      <Header
        as="h1"
        content="Виталия и Ксении"
        style={{
          fontFamily: 'Pacifico, cursive',
          fontSize: mobile ? '2em' : '4em',
          fontWeight: '100',
          marginTop: mobile ? '0.1rem' : '0.5rem',
          color: '#00b5ad'
        }}
      />
      <Image src={wedding} size="medium" centered />
      <Header
        as="h2"
        style={{
          fontFamily: 'Pacifico, cursive',
          fontWeight: '100',
          color: '#00b5ad'
        }}
        content={'До события осталось:'}
      />
      <Header
        as="h1"
        style={{
          fontFamily: 'Pacifico, cursive',
          fontWeight: '100',
          color: '#00b5ad'
        }}
        content={days.days + ' дней ' + days.hours + ' часов ' + days.minutes + ' минут ' + days.seconds + ' секунд'}
      />
    </Container>
  )
}

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
}

const DesktopContainer = ({ children }) => {
  return (
    <Media greaterThan="mobile">
      <Segment textAlign="center" style={{ minHeight: 700, padding: '1em 0em' }} vertical>
        <HomepageHeading />
      </Segment>
      {children}
    </Media>
  )
}

DesktopContainer.propTypes = {
  children: PropTypes.node
}

const MobileContainer = ({ children }) => {
  return (
    <Media at="mobile">
      <Segment textAlign="center" style={{ minHeight: 350, padding: '1em 0em' }} vertical>
        <HomepageHeading mobile />
      </Segment>
      {children}
    </Media>
  )
}

MobileContainer.propTypes = {
  children: PropTypes.node
}

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node
}

const App = () => {
  const params = useParams()
  const [guest, setGuest] = useState({ success: false, data: null })

  const getGuestInfo = async () => {
    try {
      const res = await axios.get('http://95.163.242.71:5000/api/guests/' + params.id)
      setGuest(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getGuestInfo()
  }, [])

  const { success, data } = guest

  return (
    <ResponsiveContainer>
      <Segment style={{ padding: '8em 0em' }} vertical>
        {!success ? (
          <Loader />
        ) : (
          <Grid container stackable verticalAlign="middle">
            {data.status === 1 ? (
              <Grid.Row>
                <Grid.Column width={8}>
                  <Header as="h3" style={{ fontSize: '2em' }}>
                    {data.invite_msg},
                  </Header>
                  <p style={{ fontSize: '1.33em' }}>Вы придете отпраздновать с нами этот праздник?</p>
                </Grid.Column>
                <Grid.Column floated="right" width={6}>
                  <Grid.Column textAlign="center" style={{ display: 'flex', justifyContent: 'center' }}>
                    <AgreeModal guest={data} />
                    <RejectModal />
                  </Grid.Column>
                </Grid.Column>
              </Grid.Row>
            ) : (
              <Grid.Row>
                <Grid.Column width={8}>
                  <Header as="h3" style={{ fontSize: '2em' }}>
                    {data.invite_msg},
                  </Header>
                  <p style={{ fontSize: '1.33em' }}>Вы уже приняли решение, если хотите его изменить, то нажмите на кнопку</p>
                </Grid.Column>
                <Grid.Column floated="right" width={6}>
                  <Grid.Column textAlign="center" style={{ display: 'flex', justifyContent: 'center' }}>
                    <AgreeModal guest={data} />
                  </Grid.Column>
                </Grid.Column>
              </Grid.Row>
            )}
          </Grid>
        )}
      </Segment>

      <Segment style={{ padding: '0em' }} vertical>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as="h3" style={{ fontSize: '2em' }}>
                Регистрация
              </Header>
              <p style={{ fontSize: '1.33em' }}>Регистрация пройдет 16 декабря в 15:00 в Доме семейных торжеств (ул. Проспект Мира 24 Г)</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as="h3" style={{ fontSize: '2em' }}>
                Банкет
              </Header>
              <p style={{ fontSize: '1.33em' }}>Банкет пройдет в ресторан Buon Gusto (ул. Молокова 1, к 1). Сбор гостей в 16:00</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid divided stackable>
            <Grid.Row textAlign="center">
              <Grid.Column textAlign="center">
                <Header as="h4" inverted>
                  Важная информация!
                </Header>
                <p>При изменении планов, просьба, заранее собщить об этом.</p>
                <p>Более подробную информацию можно получить по телефонам:</p>
                <p>
                  Виталий:
                  <a style={{ color: 'white' }} href="tel:+79131804786">
                    +7-913-180-47-86
                  </a>
                </p>
                <p>
                  Ксения:
                  <a style={{ color: 'white' }} href="tel:+79131804786">
                    +7-913-183-63-83
                  </a>
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </ResponsiveContainer>
  )
}

export default App
