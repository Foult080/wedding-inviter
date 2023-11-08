import './App.css'
import 'semantic-ui-css/semantic.min.css'
import { createMedia } from '@artsy/fresnel'
import { Container, Divider, Grid, Header, Image, Loader, Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import wedding from './assets/wedding2.svg'
import reg from './assets/reg.jpg'
import reg2 from './assets/reg3.jpg'
import { useEffect, useState } from 'react'
import { AgreeModal, RejectModal } from './Modals'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const { MediaContextProvider, Media } = createMedia({ breakpoints: { mobile: 0, tablet: 768, computer: 1024 } })

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
    <div style={{ marginTop: mobile ? '160px' : '0px' }}>
      <Container>
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
    </div>
  )
}

HomepageHeading.propTypes = { mobile: PropTypes.bool }

const DesktopContainer = ({ children }) => {
  const { mobile } = children
  return (
    <Media greaterThan="mobile">
      <div>
        <Header
          textAlign="center"
          as="h2"
          content="ВИТАЛИЙ & КСЕНИЯ"
          style={{
            fontFamily: 'Pacifico, cursive',
            fontSize: mobile ? '1.5em' : '3em',
            fontWeight: '100',
            marginBottom: 0,
            marginTop: mobile ? '0.5em' : '1em',
            color: '#003633'
          }}
        />
        <Header
          as="h1"
          textAlign="center"
          content="16.12.2023"
          style={{
            fontFamily: 'Pacifico, cursive',
            fontSize: mobile ? '1em' : '2em',
            fontWeight: '100',
            marginTop: mobile ? '0.1rem' : '0.5rem'
          }}
        />
        <Header
          as="h1"
          textAlign="center"
          content="ПРИГЛАШЕНИЕ НА СВАДЬБУ"
          style={{
            fontFamily: 'Pacifico, cursive',
            fontSize: mobile ? '1.3em' : '2em',
            fontWeight: '100',
            marginTop: mobile ? '0.1rem' : '0.5rem',
            marginBottom: '1rem'
          }}
        />
      </div>
      <Segment
        textAlign="center"
        style={{ minHeight: 400, padding: '1em 0em', backgroundImage: "url('/wall.svg')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
        vertical
      >
        <HomepageHeading />
      </Segment>
      {children}
    </Media>
  )
}

DesktopContainer.propTypes = { children: PropTypes.node }

const MobileContainer = ({ children }) => {
  const { mobile } = children
  return (
    <Media at="mobile">
      <div>
        <Header
          textAlign="center"
          as="h2"
          content="ВИТАЛИЙ & КСЕНИЯ"
          style={{
            fontFamily: 'Pacifico, cursive',
            fontSize: mobile ? '1.5em' : '3em',
            fontWeight: '100',
            marginBottom: 0,
            marginTop: mobile ? '0.5em' : '1em',
            color: '#003633'
          }}
        />
        <Header
          as="h1"
          textAlign="center"
          content="16.12.2023"
          style={{
            fontFamily: 'Pacifico, cursive',
            fontSize: mobile ? '1em' : '2em',
            fontWeight: '100',
            marginTop: mobile ? '0.1rem' : '0.5rem'
          }}
        />
        <Header
          as="h1"
          textAlign="center"
          content="ПРИГЛАШЕНИЕ НА СВАДЬБУ"
          style={{
            fontFamily: 'Pacifico, cursive',
            fontSize: mobile ? '1.3em' : '2em',
            fontWeight: '100',
            marginTop: mobile ? '0.1rem' : '0.5rem',
            marginBottom: '1rem'
          }}
        />
      </div>
      <Segment
        textAlign="center"
        style={{
          minHeight: 350,
          padding: '1em 0em',
          backgroundImage: "url('/wallmobile.svg')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
        vertical
      >
        <HomepageHeading mobile />
      </Segment>
      {children}
    </Media>
  )
}

MobileContainer.propTypes = { children: PropTypes.node }

const ResponsiveContainer = ({ children }) => (
  <MediaContextProvider id="media-context">
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = { children: PropTypes.node }

const App = () => {
  const params = useParams()
  const [guest, setGuest] = useState({ success: false, data: null })
  const [decision, setDecision] = useState({ status: false, result: null })
  const getGuestInfo = async () => {
    try {
      const { data } = await axios.get('/api/guests/' + params.id)
      setGuest(data)
      if (data.data.status === 2) setDecision({ status: true, result: true })
      if (data.data.status === 3) setDecision({ status: true, decision: false })
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
            {decision.status ? (
              decision.result === true ? (
                <Grid.Row>
                  <Grid.Column textAlign="center">
                    <Header as="h3" style={{ fontSize: '2em' }}>
                      {data.invite_msg},
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>Мы очень рады, что вы приняли наше приглашение </p>
                    <AgreeModal setDecision={setDecision} guest={data} msg="Изменить запись" />
                    <RejectModal setDecision={setDecision} id={data.id} />
                  </Grid.Column>
                </Grid.Row>
              ) : (
                <Grid.Row>
                  <Grid.Column textAlign="center">
                    <Header as="h3" style={{ fontSize: '2em' }}>
                      {data.invite_msg},
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                      Нам очень жаль, что вы не приняли наше приглашение. Если планы изменяться, то вы можете изменить ваше решение
                    </p>
                    <AgreeModal setDecision={setDecision} guest={data} msg="Принять приглашение" />
                  </Grid.Column>
                </Grid.Row>
              )
            ) : data.status === 1 ? (
              <Grid.Row>
                <Grid.Column width={8}>
                  <Header as="h3" style={{ fontSize: '2em' }}>
                    {data.invite_msg},
                  </Header>
                  <p style={{ fontSize: '1.33em' }}>Вы придете отпраздновать с нами этот праздник?</p>
                </Grid.Column>
                <Grid.Column floated="right" width={6}>
                  <Grid.Column textAlign="center" style={{ display: 'flex', justifyContent: 'center' }}>
                    <AgreeModal setDecision={setDecision} guest={data} msg="Принять приглашение" />
                    <RejectModal setDecision={setDecision} id={data.id} />
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
                    <AgreeModal setDecision={setDecision} guest={data} msg="Изменить запись" />
                    <RejectModal setDecision={setDecision} guest={data} id={data.id} />
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
              <Image style={{ objectFit: 'cover', maxHeight: '300px', maxWidth: '300px', height: '300px' }} src={reg} centered size="medium" />
              <div style={{ marginTop: '1rem' }}>
                <Header as="h3" style={{ fontSize: '2em' }}>
                  Регистрация
                </Header>
                <p style={{ fontSize: '1.33em' }}>Регистрация пройдет 16 декабря в 15:00</p>
                <p style={{ fontSize: '1.33em' }}> в Доме семейных торжеств по адресу ул. Проспект Мира, 24Г</p>
              </div>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Image src={reg2} style={{ objectFit: 'cover', maxHeight: '300px', maxWidth: '300px', height: '300px' }} centered size="medium" />
              <div style={{ marginTop: '1rem' }}>
                <Header as="h3" style={{ fontSize: '2em' }}>
                  Банкет
                </Header>
                <p style={{ fontSize: '1.33em' }}>Банкет пройдет в ресторанe Buon Gusto по адресу ул. Молокова 1, к 1.</p>
                <p style={{ fontSize: '1.33em' }}> Сбор гостей в 16:00</p>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Container style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        <Header as="h2" textAlign="center" style={{ fontSize: '2em' }} content="Дресс-код" />
        <Header
          as="h2"
          textAlign="center"
          style={{ fontSize: '1.6em', color: '#266d69 !important' }}
          content="Мы будем очень рады, если вы поддержите цветовую палитру нашего торжества:"
        />
        <div>
          <Image.Group centered size="tiny" style={{ display: 'flex', justifyContent: 'center' }}>
            <Image circular src="https://placehold.co/100x100/d3d4d8/d3d4d8" />
            <Image circular src="https://placehold.co/100x100/ddc6b6/ddc6b6" />
            <Image circular src="https://placehold.co/100x100/7d2c19/7d2c19" />
          </Image.Group>
          <Divider hidden />
          <Image.Group centered size="tiny" style={{ display: 'flex', justifyContent: 'center' }}>
            <Image circular src="https://placehold.co/100x100/3db0fb/3db0fb" />
            <Image circular src="https://placehold.co/100x100/4ac6c8/4ac6c8" />
            <Image circular src="https://placehold.co/100x100/186145/186145" />
          </Image.Group>
          <Divider hidden />
          <Image.Group centered size="tiny" style={{ display: 'flex', justifyContent: 'center' }}>
            <Image circular src="https://placehold.co/100x100/eec1be/eec1be" />
            <Image circular src="https://placehold.co/100x100/e21d4b/e21d4b" />
            <Image circular src="https://placehold.co/100x100/71152b/71152b" />
          </Image.Group>
        </div>
      </Container>

      <Segment vertical style={{ padding: '2em 0em' }}>
        <Container>
          <Grid divided stackable>
            <Grid.Row textAlign="center">
              <Grid.Column textAlign="center">
                <Header as="h2" style={{ color: '#ffffff !important', fontSize: '2rem' }}>
                  Важная информация!
                </Header>
                <p>При изменении планов, просьба, заранее собщить об этом.</p>
                <p>Более подробную информацию можно получить по телефонам:</p>
                <p>
                  Виталий:
                  <a style={{ color: '#266d69' }} href="tel:+79131804786">
                    +7-913-180-47-86
                  </a>
                </p>
                <p>
                  Ксения:
                  <a style={{ color: '#266d69' }} href="tel:+79131804786">
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
