import { useState } from "react"
import { XCircle } from 'react-bootstrap-icons';

interface props {
    message: string;
    close: Function;
  }

const MessageError = ({message, close}: props) => {
  return (
    <div className="d-flex align-items-center justify-content-between back-message-error cursor-pointer" onClick={() => close(false)}>
      <div className="mr-3">{message}</div>
      <XCircle />
    </div>
  )
}
  
export default MessageError