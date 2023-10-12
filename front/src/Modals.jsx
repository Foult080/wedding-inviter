import PropTypes from 'prop-types'
import { Button, Form, Header, Icon, Modal } from 'semantic-ui-react'
import { useState } from 'react'

const options = [
  { key: 1, text: 1, value: 1 },
  { key: 2, text: 2, value: 2 },
  { key: 3, text: 3, value: 3 }
]

export const AgreeModal = ({ guest }) => {
  const [open, setOpen] = useState(false)
  console.log(guest)
  return (
    <Modal
      closeIcon
      size="tiny"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button content="Принять приглашение" color="teal" icon="checkmark" size="large" />}
    >
      <Modal.Header>{'Принять приглашение'}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Input label="Фамилия и Имя гостя" icon="user" id="guest" name="guest" placeholder="фамили и имя гостя" required />
            <Form.Input
              label="Добавить гостя"
              icon="user plus"
              type="text"
              id="additional_guest"
              name="additional_guest"
              placeholder="укажите имя еще одного гостя, который придет с вами"
              required
            />
            <Form.Input label="Телефон для связи" icon="phone" id="telNumber" name="telNumber" placeholder="контактный телефон" required />
            <Form.Select fluid label="Всего гостей" options={options} placeholder="Гостей" value={guest.guest_count} />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content="Отмена" labelPosition="right" icon="close" onClick={() => setOpen(false)} negative />
        <Button content="Отправить" labelPosition="right" icon="checkmark" positive type="submit" />
      </Modal.Actions>
    </Modal>
  )
}

AgreeModal.propTypes = {
  guest: PropTypes.object
}

export const RejectModal = () => {
  const [open, setOpen] = useState(false)
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
          <Button color="green">
            <Icon name="checkmark" /> Подтвердить
          </Button>
        </div>
      </Modal.Actions>
    </Modal>
  )
}
