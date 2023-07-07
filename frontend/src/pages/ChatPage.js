import React from 'react'
import axios from 'axios'
import {useEffect, useState} from 'react'

const ChatPage = () => {
    const [ chats , setChats] = useState([]);
    const chatdata = async () => {
        const data = await axios.get('/data')
        setChats(data);
    };

    useEffect(() => { 
        chatdata();
    }, []);

    return (
      <div>

        <div>heyy user</div>
      </div>
    );
   
}

export default ChatPage
