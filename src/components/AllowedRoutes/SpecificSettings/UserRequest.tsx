import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../authentication/firebase'; // Adjust the import path as necessary
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../authentication/firebase'

type Message = {
    id: string;
    senderId: string; // Assuming you store the sender's ID
    senderUsername: string; // You might also want to store the sender's username for easy display
    content: string;
    timestamp?: Timestamp;
  };

const UserRequest = () => {
    
    const [authUser] = useAuthState(auth); // auth is your Firebase auth instance
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]); // Assuming Message is properly typed
    const { threadId } = useParams<{ threadId: string }>();

  // Fetch messages for this thread
  useEffect(() => {
    if (threadId) {
      const messagesRef = collection(firestore, `threads/${threadId}/messages`);
      const q = query(messagesRef, orderBy('timestamp', 'asc'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedMessages: Message[] = []; // Explicitly type this as an array of Message
        querySnapshot.forEach((doc) => {
            // Assuming messageData does not contain an 'id' property and only the contents of the message.
            const messageData = doc.data() as Omit<Message, 'id'>; // Exclude 'id' from the type if it's already a property
            fetchedMessages.push({ id: doc.id, ...messageData });
          });
          
        setMessages(fetchedMessages);
      });   

      // Detach listener when the component unmounts
      return unsubscribe;
    }
  }, [threadId]);
  // Send a new message
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim() !== '' && threadId && authUser) { // Use authUser here
      const messagesRef = collection(firestore, `threads/${threadId}/messages`);
      await addDoc(messagesRef, {
        senderId: authUser.uid, // Use authUser's uid
        senderUsername: authUser.displayName || 'Anonymous', // Use a fallback if displayName might be null
        content: newMessage,
        timestamp: serverTimestamp()
      });
      setNewMessage(''); // Clear the input after sending
    }
  };

  return (
    <div className="flex flex-col h-full">
  <div className="flex-grow overflow-auto p-5 space-y-2">
    {messages.map((message) => (
      <div key={message.id} className="bg-gray-200 mb-2 p-2 rounded-lg">
        <p className="text-sm font-semibold">{message.senderUsername}</p> {/* Display the sender's username */}
        <p>{message.content}</p> {/* Display the message content */}
      </div>
    ))}
  </div>
  <form onSubmit={sendMessage} className="flex p-2 bg-white">
    <input
      type="text"
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      placeholder="Type your message here..."
      className="flex-grow mr-2 p-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
    />
    <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
      Send
    </button>
  </form>
</div>

  )
}

export default UserRequest;
