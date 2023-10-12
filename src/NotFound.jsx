import { Link } from 'react-router-dom'
import { Button, Container, Header, Image } from 'semantic-ui-react'
import NotFoundEx from './assets/notFound.svg'

const NotFound = () => {
  return (
    <Container>
      <Image centered src={NotFoundEx} size="large" style={{ marginTop: '1rem' }} />
      <div style={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
        <Header as="h2" textAlign="center" content="По вашему запросу ничего не найдено" style={{ marginTop: '1rem' }} />
        <Link to="/">
          <Button color="green" content="Назад на главную" size="large" />
        </Link>
      </div>
    </Container>
  )
}

export default NotFound
