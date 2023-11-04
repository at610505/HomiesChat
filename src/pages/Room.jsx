import React, { useEffect, useState } from 'react';
import client,{databases , DATABASE_ID ,COLLECTION_ID_MESSAGES} from "../appwriteConfig";
import { ID ,Query , Role, Permission} from 'appwrite';
import {Trash} from "react-feather";
import Header from '../Components/Header';
import { useAuth } from '../utils/AuthContext';


const Room = () => {

    const {user} = useAuth();   

    const [messages, setMessages] = useState([]);
    const [messageBody, setMessageBody] = useState("");

    useEffect(()=>{
        getMessages();
        const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {
        // Callback will be executed on changes for documents A and all files.
        // console.log('REAL-TIME:',response);
        if(response.events.includes("databases.*.collections.*.documents.*.create")){
            console.log("A Document has been Create");
            setMessages(prevState=>[response.payload,...messages]);

        }
        if(response.events.includes("databases.*.collections.*.documents.*.delete")){
            console.log("A Document has been Delete");
            setMessages(prevState=>messages.filter((message)=>message.$id !== response.payload.$id));

        }

});

return ()=>{
    unsubscribe();
}
},[messages])

    const handleSubmit = async (e)=>{
        e.preventDefault();

        let payload = {
            user_id : user.$id,
            username : user.name,
            body : messageBody
        }
        try {
            
        let permissions = [
            Permission.write(Role.user(user.$id))
        ];

            let response = await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID_MESSAGES,
                ID.unique(),
                payload,
                permissions
            );
            // setMessages(prevState=>[response,...messages]);
            setMessageBody("");
            // console.log("Created",response);
        } catch (error) {
            console.error(error);
        }

    }

    const getMessages = async ()=>{
        try {
            
            let response = await databases.listDocuments(DATABASE_ID,
                COLLECTION_ID_MESSAGES,
                [
                    Query.orderDesc("$createdAt"),
                    Query.limit(10)
                ] );
            // console.log("RESPONSE: ",response.documents);
            setMessages(response.documents);
        } catch (error) {
            
            console.log(error);

        }
        

    }

    const deleteMessage = async (id)=>{

        try {
            const promise = await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, id);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
    <main className='container'>
    <Header/>
    <div className='room--container'>
        <form onSubmit={handleSubmit} id='message-form'>
            <div>
                <textarea 
                required 
                maxLength={"1000" } 
                placeholder='Enter messages' 
                onChange={(e)=>{setMessageBody(e.target.value)}} 
                value={messageBody}></textarea>
            </div>
            <div className='send-btn--wrapper'>
                <button className='btn btn--secondary' type="submit" >Send</button>
            </div>
        </form>
    <div>
    {messages.map( message => {
        return <div key={message.$id} className='message--wrapper'>
                <div className='message--header'>
                    <p>{message.username?
                    <span>{message.username}</span>
                    :
                    <span>Anonymous User</span>
                    }
                    <small className='message-timestamp'>{new Date(message.$createdAt).toLocaleString()}</small>
                    </p>
                {message.$permissions.includes(`delete(\"user:${user.$id}")`)
                && 
                (<Trash className='delete--btn' onClick={()=>{deleteMessage(message.$id)}}/>)}
                
                </div>
                <div className='message--body'>
                <span>{message.body}</span>
            </div>
        </div>
    })}
    </div>
    </div>
    </main>
    </>
  )
}

export default Room