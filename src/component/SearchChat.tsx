import React, { useState, useEffect } from 'react';
import { KaiStudio } from 'kaistudio-sdk-js';
import styles from './SearchChat.module.scss'; // 引入 CSS 模块

const { VITE_REACT_APP_ORGANIZATION_ID, VITE_REACT_APP_INSTANCE_ID, VITE_REACT_APP_API_KEY, VITE_REACT_APP_HOST, VITE_REACT_APP_MULTI_DOCUMENTS, VITE_REACT_APP_NEED_FOLLOWING_QUESTIONS } = import.meta
    .env;

if (!((VITE_REACT_APP_ORGANIZATION_ID && VITE_REACT_APP_INSTANCE_ID && VITE_REACT_APP_API_KEY) || VITE_REACT_APP_HOST)) {
    throw new Error('Missing required environment variables');
}

const kaiSearch = new KaiStudio({
    organizationId: VITE_REACT_APP_ORGANIZATION_ID,
    instanceId: VITE_REACT_APP_INSTANCE_ID,
    apiKey: VITE_REACT_APP_API_KEY,
});
const needFollowingQuestions = VITE_REACT_APP_NEED_FOLLOWING_QUESTIONS === 'true';
const multiDocuments = VITE_REACT_APP_MULTI_DOCUMENTS === 'true';

const SearchChat: React.FC = () => {
    const [messageHistory, setMessageHistory] = useState<{ from: string; message: string }[]>([]);
    const [currentChat, setCurrentChat] = useState<{ from: string; message: string }[]>([]);
    const [userMessage, setUserMessage] = useState('');

    useEffect(() => {
        setMessageHistory([{ from: 'assistance', message: 'Hello, how can I help you today?' }]);
    }, []);

    const sendMessage = async () => {
        const userMsg = { from: 'user', message: userMessage };
        const updatedChat = [...currentChat, userMsg]; 
    
        setMessageHistory((prevHistory) => [...prevHistory, userMsg]);
        setCurrentChat(updatedChat); 
        setUserMessage('');
    
        const found = await identifySpecificDocument(updatedChat);
    
        if (found.found) {
            const result = await search(found.question);
            setMessageHistory((prevHistory) => prevHistory.slice(0, -1)); // Remove "Searching for answer.." message
            processSearchResult(result);
    
            setCurrentChat([]); 
        }
    };
    
    async function identifySpecificDocument(updatedChat: { from: string; message: string }[]) : Promise<{found: boolean, question: string}>{
        const result = await kaiSearch.search().identifySpecificDocument(updatedChat);
    
        if (!result) {
            return {found: false, question: ''};
        }
    
        if (result.isFinal) {
    
            setMessageHistory((prevHistory) => [
                ...prevHistory,
                { from: 'assistance', message: "Correct question found: " + result.question },
                { from: 'assistance', message: "Searching for answer..." },
            ]);
            return {found: true, question: result.question};
        } else {
            setMessageHistory((prevHistory) => [
                ...prevHistory,
                { from: 'assistance', message: result.question },
            ]);
            return {found: false, question: result.question };
        }
    }
    

    const search = async (question: string) => {
        return await kaiSearch.search().query(question, 'userid', '', multiDocuments, needFollowingQuestions);
    };

    const processSearchResult = (result: any) => {
        if (result.gotAnswer) {
            setMessageHistory((prevHistory) => [...prevHistory, { from: 'assistance', message: 'Answer:' }, { from: 'assistance', message: result.answer }]);

            if (result.documents.length > 0) {
                let documents = '';
                for (const doc of result.documents) {
                    documents += `name: ${doc.name}\nurl: ${doc.url}\n\n`;
                }
                setMessageHistory((prevHistory) => [...prevHistory, { from: 'assistance', message: 'Source:' }, { from: 'assistance', message: documents }]);
            }

            if (needFollowingQuestions) {
                let questions = '';
                for (const question of result.followingQuestions) {
                    questions += ` - ${question}\n`;
                }
                setMessageHistory((prevHistory) => [...prevHistory, { from: 'assistance', message: 'following questions:' }, { from: 'assistance', message: questions }]);
            }
        } else {
            setMessageHistory((prevHistory) => [...prevHistory, { from: 'assistance', message: "Sorry, I couldn't find an answer to your question." }]);
        }
    };

    return (
        <div className={styles.searchChat}>
            <div className={styles.messageHistory}>
                {messageHistory.map((message, index) => (
                    <div
                        key={index}
                        className={styles.message}
                        style={{
                            justifyContent: message.from === 'user' ? 'flex-end' : 'flex-start',
                        }}>
                        {message.from === 'assistance' ? (
                            <div className={styles.assistanceMessage}>
                                <button className="btn-icon text-bold-14">BOT</button>
                                <div className={`${styles.messageText} ${styles.assistanceColor}`}>
                                    <p className="text-regular-14">{message.message}</p>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.userMessage}>
                                <div className={`${styles.messageText} ${styles.userColor}`}>
                                    <p className="text-regular-14">{message.message}</p>
                                </div>
                                <button className="btn-icon text-bold-14">USER</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.inputContainer}>
                <input
                    className="simple-input-h30"
                    type="text"
                    placeholder="Type your message here..."
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button className="btn-outline-rounded-30" onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default SearchChat;
