import PropTypes from 'prop-types'
import { Button, Form, Header, Icon, Modal } from 'semantic-ui-react'
import { useState } from 'react'

export const AgreeModal = () => {
  const [open, setOpen] = useState(false)

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
            <Form.Input label="Наименование" labelPosition="right" id="name" name="name" placeholder="Значение справочника" required />
            <Form.Input
              label="Описание"
              icon="list"
              labelPosition="right"
              type="text"
              id="description"
              name="description"
              placeholder="Подробное описание поля"
              required
            />
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
  dict: PropTypes.string,
  item: PropTypes.object,
  icon: PropTypes.string,
  color: PropTypes.string,
  path: PropTypes.string,
  updateFunc: PropTypes.func
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
