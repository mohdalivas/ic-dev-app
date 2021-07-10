import { Alert } from 'reactstrap'

const AlertDismissable = props => {

  return (
    <div className='demo-spacing-0'>
      <Alert color={props.color} isOpen={props.visible} toggle={() => props.setVisible(false)}>
        <div className='alert-body'>{props.alertBody}</div>
      </Alert>
    </div>
  )
}
export default AlertDismissable
