import React from 'react'
import axios from 'axios'
import {useEffect} from 'react'

const ChatPage = () => {

    const chatdata = async () => {
        const data = await axios.get('/data')
        console.log(data);
    };

    useEffect(() => { 
        chatdata();
    }, []);

  return (
    <div>
          chat page
          
    </div>
  )
}

export default ChatPage
