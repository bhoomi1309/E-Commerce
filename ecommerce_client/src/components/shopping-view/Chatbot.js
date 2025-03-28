import React, { useState, useEffect, useRef } from 'react';
import useUserDetails from "../../pages/useUserDetails";
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD

const Chatbot = ({ setIsChatbotOpen }) => {
=======
import { motion, AnimatePresence } from 'framer-motion';


const Chatbot = ({ setIsChatbotOpen }) => {
  const [inputMessage, setInputMessage] = useState(''); // Add state for user input
>>>>>>> b397825 (Commit)
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([]);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const { userData, isUserDataReady } = useUserDetails();
  const chatBoxRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isUserDataReady) {
      sendMessage('Hi');
    }
  }, [isUserDataReady, userData]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (message) => {
    if (message.trim() === '') return;

    const newMessages = [...messages, { text: message, sender: 'user' }];
    setMessages(newMessages);
    setWaitingForInput(true);

    if (isUserDataReady) {
      try {
<<<<<<< HEAD
        const response = await fetch('http://localhost:3001/chat/message', {
=======
        const response = await fetch('https://adaa-web-backend.onrender.com/chat/message', {
>>>>>>> b397825 (Commit)
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userMessage: message,
            userEmail: userData.Email,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTimeout(() => {
          setMessages([
            ...newMessages,
            { text: data.botReply, sender: 'bot' },
          ]);
          if (data.botReply === 'Sure, let me take you to the Products page. 📃') {
            setTimeout(() => {
              navigate('/shopping/listing');
              setIsChatbotOpen(false);
            }, 1000);
          }
          if (data.botReply === "Alright, let's take a look at your cart! 🛒") {
            setTimeout(() => {
              navigate('/shopping/cart');
              setIsChatbotOpen(false);
            }, 1000);
          }
          if (data.botReply === "Here's your account! 📦") {
            setTimeout(() => {
              navigate('/shopping/account');
              setIsChatbotOpen(false);
            }, 1000);
          }
          if (data.botReply === "Okay, let me know if you need my help. Bye 🤗") {
            setTimeout(() => {
              setIsChatbotOpen(false);
            }, 1000);
          }
          setOptions(data.options);
          setWaitingForInput(false);
        }, 1000);
      }
      catch (error) {
        console.error('Error sending message:', error);
        setMessages([
          ...newMessages,
          { text: 'Something went wrong. Please try again.', sender: 'bot' },
        ]);
        setWaitingForInput(false);
      }
    }
  };

  const handleOptionClick = (option) => {
    sendMessage(option);
  };

<<<<<<< HEAD
  return (
    <div className="chatbot">
      <div className="chat-window">
        <div className="chat-box" ref={chatBoxRef} style={{ overflowY: 'auto', maxHeight: '400px' }}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <small
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  color: msg.sender === 'user' ? '#007bff' : '#28a745',
                  marginBottom: '2px',
                }}
              >
                {msg.sender === 'user' ? 'You' : 'Bot'}
              </small>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-box">
          {waitingForInput ? (
            <div className='px-3'>Bot is analyzing...</div>
          ) : (
            <div className="options-box">
              {options.length > 0 &&
                options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="option-button"
                  >
                    {option}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
=======
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };


  return (
    <motion.div
      className="chatbot"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.97, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '350px',
        maxWidth: '90%',
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        border: '1px solid white',
      }}
    >
      <div className="chat-window" style={{backgroundColor : "black"}}>
        <div className="chat-box" ref={chatBoxRef} style={{ overflowY: 'auto', maxHeight: '400px', padding: '15px'}}>
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                className={`message ${msg.sender}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{
                  marginBottom: '10px',
                  padding: '10px',
                  borderRadius: '10px',
                  backgroundColor: msg.sender === 'user' ? '#333' : '#444',
                  color: '#fff',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                }}
              >
                <small
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    color: msg.sender === 'user' ? '#007bff' : '#28a745',
                    marginBottom: '2px',
                  }}
                >
                  {msg.sender === 'user' ? 'You' : 'Bot'}
                </small>
                {msg.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="input-box" style={{ padding: '15px', borderTop: '1px solid #444' }}>
          {waitingForInput ? (
            <div className='px-3' style={{ color: '#fff' }}>Bot is analyzing...</div>
          ) : (
            <div className="options-box" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {options.length > 0 &&
                options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="option-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      backgroundColor: '#555',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      flex: '1 1 45%',
                      textAlign: 'center',
                    }}
                  >
                    {option}
                  </motion.button>
                ))}
            </div>
          )}

<form onSubmit={handleSubmit} style={{ display: 'flex', marginTop: '10px' }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: '1',
                padding: '10px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#333',
                color: '#fff',
                marginRight: '10px',
              }}
            />
            <button
              type="submit"
              disabled={waitingForInput}
              style={{
                padding: '10px',
                borderRadius: '5px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Send
            </button>
          </form>

        </div>
      </div>
    </motion.div>
>>>>>>> b397825 (Commit)
  );
};

export default Chatbot;