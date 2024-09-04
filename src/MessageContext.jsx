import { createContext, useReducer} from 'react'

const messageReducer = (state, action) => {
    state = action
    return state
  
}

const MessageContext = createContext()

export const MessageContextProvider = (props) => {
    const [message, messageDispatch] = useReducer(messageReducer, '')
    return(
        <MessageContext.Provider value={[message, messageDispatch]}>
            {props.children}
        </MessageContext.Provider>
    )
}

export default MessageContext