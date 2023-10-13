import PropTypes from 'prop-types'
import { Button, Form, Header, Icon, Modal } from 'semantic-ui-react'
import { useState } from 'react'
import axios from 'axios'

const options = [
  { key: 1, text: 1, value: 1 },
  { key: 2, text: 2, value: 2 },
  { key: 3, text: 3, value: 3 }
]

const sendData = async (agreement, id) => {
  try {
    await axios.put('http://95.163.242.71:5000/api/guests/' + id, agreement, { 'Content-Type': 'application/json' })
  } catch (error) {
    console.error(error)
  }
}

export const AgreeModal = ({ guest, msg }) => {
  const [open, setOpen] = useState(false)
  const [addGuest, setAddGuest] = useState(guest.additional_guest ? true : false)
  const [agreement, setAgreement] = useState({
    guest: guest.guest || '',
    additionalGuest: guest.additional_guest || '',
    telNumber: guest.tel_number || '',
    guestCount: guest.guest_count || 1,
    status: 2
  })

  const OnChangeForm = (e, { name, value }) => setAgreement({ ...agreement, [name]: value })

  const clearGuest = () => {
    setAddGuest(false)
    setAgreement({ ...agreement, additionalGuest: '' })
  }

  const SubmitForm = async () => {
    await sendData(agreement, guest.id).then(() => {
      setOpen(false)
      setAddGuest(false)
    })
  }
  return (
    <Modal
      closeIcon
      size="tiny"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button content={msg} color="teal" icon="checkmark" size="large" />}
    >
      <Modal.Header>{msg}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>* При возникновении осложений с заполнением формы, пожалуйста, обратитесь к отправителю</p>
          <Form>
            <Form.Input
              label="Фамилия и Имя гостя"
              icon="user"
              id="guest"
              name="guest"
              placeholder="фамили и имя гостя"
              value={agreement.guest}
              onChange={OnChangeForm}
              required
            />
            {!addGuest ? (
              <Button style={{ marginBottom: '1rem' }} content="Добавить гостя" icon="user plus" color="teal" onClick={() => setAddGuest(true)} />
            ) : (
              <>
                <Form.Input
                  label="Добавить гостя"
                  icon="user plus"
                  type="text"
                  id="additionalGuest"
                  name="additionalGuest"
                  placeholder="укажите имя еще одного гостя, который придет с вами"
                  value={agreement.additionalGuest}
                  onChange={OnChangeForm}
                  required
                />
                <Button style={{ marginBottom: '1rem' }} content="Убрать гостя" icon="close" color="red" onClick={clearGuest} />
              </>
            )}
            <Form.Input
              label="Телефон для связи"
              icon="phone"
              id="telNumber"
              name="telNumber"
              placeholder="контактный телефон"
              value={agreement.telNumber}
              onChange={OnChangeForm}
              required
            />
            <Form.Select
              fluid
              label="Всего гостей"
              options={options}
              placeholder="Гостей"
              value={agreement.guestCount}
              id="guestCount"
              name="guestCount"
              onChange={OnChangeForm}
              required
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content="Отмена" labelPosition="right" icon="close" onClick={() => setOpen(false)} negative />
        <Button content="Отправить" labelPosition="right" icon="checkmark" positive onClick={SubmitForm} />
      </Modal.Actions>
    </Modal>
  )
}

AgreeModal.propTypes = { guest: PropTypes.object, msg: PropTypes.string }

const sendReject = async (id) => {
  try {
    await axios.delete('http://95.163.242.71:5000/api/guests/' + id)
  } catch (error) {
    console.error(error)
  }
}

export const RejectModal = ({ id }) => {
  const [open, setOpen] = useState(false)

  const clickReject = async () => {
    await sendReject(id)
    setOpen(false)
  }

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={<Button content="Нет возможности" icon="remove" color="red" size="large" />}
    >
      <Header icon>
        <Icon name="remove" />
        Вы уверены? <br />
        Нам очень жаль, что так вышло. Вы сможете изменить своё решение не позднее 1 декабря.
      </Header>
      <Modal.Actions>
        <div style={{ textAlign: 'center' }}>
          <Button color="red" onClick={() => setOpen(false)}>
            <Icon name="remove" /> Отмена
          </Button>
          <Button color="green" onClick={clickReject}>
            <Icon name="checkmark" /> Подтвердить
          </Button>
        </div>
      </Modal.Actions>
    </Modal>
  )
}

RejectModal.propTypes = { id: PropTypes.string }
