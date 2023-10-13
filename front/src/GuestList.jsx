import { useEffect, useState } from 'react'
import { Container, Header, Loader, Table } from 'semantic-ui-react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const convertStatus = (status) => {
  switch (status) {
    case 1:
      return 'Приглашение отправлено'
    case 2:
      return 'Принял'
    case 3:
      return 'Не придет'
  }
}

const GuestList = () => {
  const [guests, setGuests] = useState({ success: false, data: [], count: null, guestsCount: null })

  const getListGuest = async () => {
    try {
      const res = await axios.get('http://95.163.242.71:5000/api/guests')
      setGuests(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getListGuest()
  }, [])

  const { success, data, guestsCount } = guests

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Header content="Список гостей" textAlign="center" />
      {!success ? (
        <Loader />
      ) : (
        <div>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Имя гостя</Table.HeaderCell>
                <Table.HeaderCell>Приглашение</Table.HeaderCell>
                <Table.HeaderCell>Придет вместе с</Table.HeaderCell>
                <Table.HeaderCell>Количество гостей</Table.HeaderCell>
                <Table.HeaderCell>Статус</Table.HeaderCell>
                <Table.HeaderCell>Дата изменения</Table.HeaderCell>
                <Table.HeaderCell>Ссылка</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.guest}</Table.Cell>
                  <Table.Cell>{item.invite_msg}</Table.Cell>
                  <Table.Cell>{item.additional_guest}</Table.Cell>
                  <Table.Cell>{item.guest_count}</Table.Cell>
                  <Table.Cell>{convertStatus(item.status)}</Table.Cell>
                  <Table.Cell>{item.mddate}</Table.Cell>
                  <Table.Cell>
                    <Link to={'http://95.163.242.71:5000/' + item.id}>{'http://95.163.242.71:5000/' + item.id}</Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Header textAlign="center" content={'Всего придет: ' + guestsCount.guests} />
        </div>
      )}
    </Container>
  )
}

export default GuestList
