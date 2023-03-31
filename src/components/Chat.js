import React, { useState, useEffect, useRef } from 'react';
import fetchOpenAIResponse from '../utils/openai';
import styles from './Chat.module.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const chatContainerRef = useRef(null);

    useEffect(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [messages]);

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    async function handleSendMessage(event) {
        event.preventDefault();

        if (inputValue.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: inputValue, sender: 'user' },
            ]);

            setInputValue('');

            // Send the user's message to the OpenAI API
            const prompt = `Welcome to Edgio's support chat! As a software developer looking for help with Layer0 and EdgeCast products, our team is ready to assist you. Please ask your technical question, and we'll do our best to provide you with an accurate and helpful answer based on our extensive help documentation. Because Layer0 and EdgeCast are now rebranded as Edgio, I will refer to them as Edgio in my responses: ${inputValue}`;
            console.log('Sending prompt to OpenAI API:', prompt);
            const openAIResponse = await fetchOpenAIResponse(prompt);
            console.log('Received response from OpenAI API:', openAIResponse);

            // Append the OpenAI API response to the messages array
            if (openAIResponse) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: openAIResponse, sender: 'support' },
                ]);
            }
        }
    }

    // The return statement should be inside the Chat function
    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>Edgio AI Assist</div>
            <div className={styles.chatMessages} ref={chatContainerRef}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`${styles.chatMessage} ${message.sender === 'user' ? styles.userMessage : styles.supportMessage}`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <form className={styles.chatInputForm} onSubmit={handleSendMessage}>
                <input
                    type="text"
                    className={styles.chatInput}
                    placeholder="Type your message here"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button type="submit" className={styles.chatSendBtn}>
                    Send
                </button>
            </form>
        </div>
    );
}

export default Chat;
