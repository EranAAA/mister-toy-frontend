import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EMIT_TYPE_MSG } from '../services/socket.service'

function _ChatApp({ toy, loggedInUser }) {

   const [msg, setMsg] = useState({ txt: '' })
   const [msgs, setMsgs] = useState([])
   const [typing, setTyping] = useState('')
   const [topic, setTopic] = useState(toy._id)
   const [isBotMode, setIsBotMode] = useState(false)
   let timeout;

   useEffect(() => {
      // socketService.setup();
      console.log(toy);
      socketService.emit('chat topic', topic);
      // remove listener and make sure we dont have duplicate listner
      socketService.off(SOCKET_EMIT_SEND_MSG);
      socketService.on(SOCKET_EMIT_SEND_MSG, addMsg);
      socketService.on(SOCKET_EMIT_TYPE_MSG, typeMsg);

      return () => {
         socketService.off(SOCKET_EMIT_SEND_MSG, msg)
         // socketService.terminate()
         clearTimeout(timeout)
      }
   }, [isBotMode])


   const msgHandleChange = ev => {
      const { name, value } = ev.target
      const from = loggedInUser?.fullname || 'Me'
      setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
      socketService.emit('type newMsg', { txt: `${from} is typing...` })
      // console.log('msgHandleChange');
  }

   const addMsg = (newMsg) => {
      console.log('newMsg', newMsg);
      setMsgs(prevMsgs => [...prevMsgs, newMsg])
      setTyping('')
      // console.log('Msgs', msgs);
      // console.log('from addMsg', isBotMode);

      //if (isBotMode) sendBotResponse();
  }

   const typeMsg = (msg) => {
      // console.log('typeMsg', msg);
      setTyping(msg)
  }

   const onSubmit = (ev) => {
      !!ev && ev.preventDefault()
      const from = loggedInUser?.fullname || 'Me'
      socketService.emit('chat newMsg', { from, txt: msg.txt, isBotMode })
      setMsg({ from: 'Me', txt: '' })
      setTyping('')
   }

   return (
      <section className="chat-app">
         <div className="chat">
            {msgs.map((msg, idx) => {
               return <div key={idx}>
                  <p className='question' >{msg.from}:  {msg.txt}</p>
               </div>
            })}
            <div>{typing.txt}</div>
         </div>
         <form onSubmit={onSubmit}>
            <input type="search" placeholder="Ask question" name="txt" value={msg.txt} onChange={msgHandleChange} />
            <input type="submit" value="Send" />
         </form>
      </section>
   )
}

const mapStateToProps = state => {
   return {
      loggedInUser: state.userModule.user,
      toy: state.toyModule.toy
   }
}
const mapDispatchToProps = {
}

export const ChatApp = connect(mapStateToProps, mapDispatchToProps)(_ChatApp)