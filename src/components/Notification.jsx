import { useContext } from "react"
import MessageContext from "../MessageContext"

const Notification = () => {
  const [message] = useContext(MessageContext)
  console.log(message)
  const style = {
    display: 'none',
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if(message !== ''){
    style.display = 'block'
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
