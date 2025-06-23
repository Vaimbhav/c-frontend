// import { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { IoMdSend } from 'react-icons/io';
// import { FaMicrophone, FaPause, FaRegCopy, FaCheck } from 'react-icons/fa';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// import { useDispatch, useSelector } from 'react-redux';
// import { sendChatMessageAsync } from '../features/chat/ChatThunk';
// import { currentMessage } from '../features/chat/ChatSelectors';
// import { clearMessage } from '../features/chat/ChatSlice';
// import { useSpeechSynthesis } from 'react-speech-kit';

// const Chat = () => {
//     const dispatch = useDispatch();
//     const msg = useSelector(currentMessage);

//     const [isRecording, setIsRecording] = useState(false);
//     const [selectedLanguage, setSelectedLanguage] = useState('en');
//     const [messages, setMessages] = useState([]);
//     const [inputMessage, setInputMessage] = useState('');
//     const [copiedIndex, setCopiedIndex] = useState(null);

//     const [lastSpokenMsg, setLastSpokenMsg] = useState(''); // track last spoken
//     const { speak } = useSpeechSynthesis();

//     const messagesEndRef = useRef(null);
//     const websocketRef = useRef(null);
//     const streamRef = useRef(null);
//     const mediaRecorderRef = useRef(null);
//     const finalTranscriptRef = useRef('');

//     const languages = [
//         { code: 'en', name: 'English' },
//         { code: 'hi', name: 'Hindi' },
//         { code: 'es', name: 'Spanish' },
//         { code: 'fr', name: 'French' }
//     ];

//     const DEEPGRAM_API_KEY = import.meta.env.VITE_DEEPGRAM_API_KEY;

//     const stopSpeaking = () => {
//         if (window.speechSynthesis.speaking) {
//             window.speechSynthesis.cancel();
//         }
//     };

//     useEffect(() => {
//         const handleStopSpeaking = () => stopSpeaking();

//         window.addEventListener('click', handleStopSpeaking);
//         window.addEventListener('keydown', handleStopSpeaking); // stop on typing too
//         return () => {
//             window.removeEventListener('click', handleStopSpeaking);
//             window.removeEventListener('keydown', handleStopSpeaking);
//             stopSpeaking();
//         };
//     }, []);

//     useEffect(() => {
//         if (msg && typeof msg === 'string' && msg.trim()) {
//             setMessages((prev) => [...prev, { role: 'assistant', content: msg }]);
//             dispatch(clearMessage());
//             if (msg !== lastSpokenMsg) {
//                 stopSpeaking();
//                 speak({ text: msg });
//                 setLastSpokenMsg(msg);
//             }
//         }
//     }, [msg, dispatch, speak, lastSpokenMsg]);

//     const startRecording = async () => {
//         if (!DEEPGRAM_API_KEY) {
//             alert('VITE_DEEPGRAM_API_KEY is not set.');
//             return;
//         }

//         finalTranscriptRef.current = inputMessage ? inputMessage + ' ' : '';
//         setInputMessage(finalTranscriptRef.current);

//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             streamRef.current = stream;

//             let mimeType = 'audio/webm;codecs=opus';
//             if (!MediaRecorder.isTypeSupported(mimeType)) {
//                 mimeType = 'audio/webm';
//             }

//             const mediaRecorder = new MediaRecorder(stream, { mimeType });
//             mediaRecorderRef.current = mediaRecorder;

//             const languageMap = { en: 'en-US', hi: 'hi', es: 'es', fr: 'fr' };
//             const wsUrl = `wss://api.deepgram.com/v1/listen?language=${languageMap[selectedLanguage]}`;
//             const socket = new WebSocket(wsUrl, ['token', DEEPGRAM_API_KEY]);
//             websocketRef.current = socket;

//             socket.onopen = () => {
//                 setIsRecording(true);
//                 mediaRecorder.start(250);
//             };
//             mediaRecorder.addEventListener('dataavailable', (e) => {
//                 if (e.data.size > 0 && socket.readyState === WebSocket.OPEN) {
//                     socket.send(e.data);
//                 }
//             });
//             socket.onmessage = (message) => {
//                 const received = JSON.parse(message.data);
//                 const transcript = received.channel?.alternatives?.[0]?.transcript;
//                 if (transcript) {
//                     if (received.is_final) {
//                         finalTranscriptRef.current += transcript + ' ';
//                         setInputMessage(finalTranscriptRef.current);
//                     } else {
//                         setInputMessage(finalTranscriptRef.current + transcript);
//                     }
//                 }
//             };
//             socket.onerror = (error) => {
//                 console.error('WebSocket error:', error);
//                 stopRecording();
//             };
//             socket.onclose = stopRecording;
//         } catch (error) {
//             console.error('Error starting recording:', error);
//             alert('Failed to start recording. Check microphone permissions.');
//         }
//     };

//     const stopRecording = () => {
//         if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
//             mediaRecorderRef.current.stop();
//             mediaRecorderRef.current = null;
//         }
//         if (websocketRef.current) {
//             websocketRef.current.close();
//             websocketRef.current = null;
//         }
//         if (streamRef.current) {
//             streamRef.current.getTracks().forEach((track) => track.stop());
//             streamRef.current = null;
//         }
//         setIsRecording(false);
//     };

//     const handleSendMessage = () => {
//         if (inputMessage.trim()) {
//             const userMessage = inputMessage.trim();
//             setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
//             setInputMessage('');
//             dispatch(sendChatMessageAsync({ prompt: userMessage }));
//         }
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault();
//             handleSendMessage();
//         }
//     };

//     const copyToClipboard = (text, index) => {
//         navigator.clipboard.writeText(text);
//         setCopiedIndex(index);
//         setTimeout(() => setCopiedIndex(null), 2000);
//     };

//     const renderMessage = (text) => {
//         const parts = text.split(/```(?:[a-zA-Z]*)?\n?/g);
//         return parts.map((part, i) =>
//             i % 2 === 0 ? (
//                 part.trim() ? <p key={i} className="whitespace-pre-wrap mb-2">{part}</p> : null
//             ) : (
//                 <div key={i} className="relative my-2">
//                     <button
//                         onClick={() => copyToClipboard(parts[i], i)}
//                         className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded"
//                     >
//                         {copiedIndex === i ? <FaCheck /> : <FaRegCopy />}
//                     </button>
//                     <SyntaxHighlighter
//                         language="javascript"
//                         style={oneDark}
//                         customStyle={{ borderRadius: '0.5rem', padding: '1rem' }}
//                     >
//                         {parts[i]}
//                     </SyntaxHighlighter>
//                 </div>
//             )
//         );
//     };

//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);

//     useEffect(() => {
//         return () => stopRecording();
//     }, []);

//     return (
//         <div className="pt-16 fixed inset-0 bg-[#0f172a] text-white flex flex-col">
//             <main className="flex-1 flex flex-col bg-[#1e293b] overflow-hidden">
//                 <div className="text-xl font-semibold text-center py-4 border-b border-gray-700 bg-[#0f1d2a]">
//                     <div className="flex items-center justify-center space-x-2">
//                         <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//                             <span className="text-white font-bold text-sm">AI</span>
//                         </div>
//                         <span>ChatBot</span>
//                     </div>
//                     {isRecording && <div className="text-sm text-red-400 mt-1 animate-pulse">🎤 Recording...</div>}
//                 </div>

//                 <div className="px-6 py-3 border-b border-gray-700 bg-[#0f1d2a] flex items-center justify-between">
//                     <div>
//                         <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-1">Voice Language:</label>
//                         <select
//                             id="language"
//                             value={selectedLanguage}
//                             onChange={(e) => setSelectedLanguage(e.target.value)}
//                             className="bg-[#1e293b] text-white border border-gray-600 rounded-lg px-3 py-1.5 text-sm"
//                             disabled={isRecording}
//                         >
//                             {languages.map((lang) => (
//                                 <option key={lang.code} value={lang.code}>{lang.name}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <Link to="/chat/history">
//                         <button className="bg-gray-600 hover:bg-gray-500 text-white text-sm font-medium py-2 px-4 rounded-lg">History</button>
//                     </Link>
//                 </div>

//                 <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
//                     {messages.length === 0 && (
//                         <div className="text-center text-gray-400 mt-8">
//                             <div className="text-4xl mb-4">🤖</div>
//                             <h3 className="text-lg font-medium mb-2">How can I help you today?</h3>
//                             <p className="text-sm">Ask me anything or use voice input to get started.</p>
//                         </div>
//                     )}

//                     {messages.map((message, index) => (
//                         <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//                             <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-100'}`}>
//                                 {renderMessage(message.content)}
//                             </div>
//                         </div>
//                     ))}

//                     <div ref={messagesEndRef} />
//                 </div>

//                 <div className="border-t border-gray-700 bg-[#0f1d2a] p-4">
//                     <form
//                         onSubmit={(e) => {
//                             e.preventDefault();
//                             handleSendMessage();
//                         }}
//                         className="flex items-center space-x-3 max-w-4xl mx-auto"
//                     >
//                         <div className="flex-1 relative">
//                             <textarea
//                                 value={inputMessage}
//                                 onChange={(e) => setInputMessage(e.target.value)}
//                                 onKeyPress={handleKeyPress}
//                                 placeholder={isRecording ? 'Listening...' : 'Message ChatBot...'}
//                                 className="w-full bg-[#1e293b] text-white placeholder-gray-400 outline-none rounded-2xl px-4 py-3 pr-12 resize-none border border-gray-600 focus:border-blue-500"
//                                 rows="1"
//                                 disabled={isRecording}
//                                 style={{ minHeight: '44px', maxHeight: '120px' }}
//                             />
//                         </div>

//                         <button
//                             type="button"
//                             onClick={isRecording ? stopRecording : startRecording}
//                             className={`p-3 rounded-full transition-colors ${isRecording ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-600 hover:bg-gray-500 text-white'}`}
//                             title={isRecording ? 'Stop recording' : 'Start recording'}
//                         >
//                             {isRecording ? <FaPause /> : <FaMicrophone />}
//                         </button>

//                         <button
//                             type="submit"
//                             className={`p-3 rounded-full transition-colors ${inputMessage.trim() && !isRecording ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
//                             disabled={isRecording || !inputMessage.trim()}
//                         >
//                             <IoMdSend />
//                         </button>
//                     </form>
//                     <div className="text-xs text-center text-gray-500 mt-2">ChatBot - Powered by AI • Voice input available</div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Chat;





import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoMdSend } from 'react-icons/io';
import { FaMicrophone, FaPause, FaRegCopy, FaCheck } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useDispatch, useSelector } from 'react-redux';
import { sendChatMessageAsync } from '../features/chat/ChatThunk';
import { currentMessage } from '../features/chat/ChatSelectors';
import { clearMessage } from '../features/chat/ChatSlice';
import { useSpeechSynthesis } from 'react-speech-kit';

const Chat = () => {
    const dispatch = useDispatch();
    const msg = useSelector(currentMessage);

    const [isRecording, setIsRecording] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [lastSpokenMsg, setLastSpokenMsg] = useState(''); // track last spoken
    const { speak } = useSpeechSynthesis();

    const messagesEndRef = useRef(null);
    const websocketRef = useRef(null);
    const streamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const finalTranscriptRef = useRef('');

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'Hindi' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' }
    ];

    const DEEPGRAM_API_KEY = process.env.REACT_APP_DEEPGRAM_API_KEY;

    // console.log('Api key is -> ', DEEPGRAM_API_KEY);

    const stopSpeaking = () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
    };

    useEffect(() => {
        const handleStopSpeaking = () => stopSpeaking();
        window.addEventListener('click', handleStopSpeaking);
        window.addEventListener('keydown', handleStopSpeaking); // stop on typing too
        return () => {
            window.removeEventListener('click', handleStopSpeaking);
            window.removeEventListener('keydown', handleStopSpeaking);
            stopSpeaking();
        };
    }, []);

    useEffect(() => {
        if (msg && typeof msg === 'string' && msg.trim()) {
            setMessages((prev) => {
                const updated = [...prev];
                const typingIndex = updated.findLastIndex(
                    (m) => m.role === 'assistant' && m.content === 'Typing ...'
                );
                if (typingIndex !== -1) {
                    updated[typingIndex] = { role: 'assistant', content: msg };
                } else {
                    updated.push({ role: 'assistant', content: msg });
                }
                return updated;
            });

            dispatch(clearMessage());
            if (msg !== lastSpokenMsg) {
                stopSpeaking();
                speak({ text: msg });
                setLastSpokenMsg(msg);
            }
        }
    }, [msg, dispatch, speak, lastSpokenMsg]);

    const startRecording = async () => {
        if (!DEEPGRAM_API_KEY) {
            alert('VITE_DEEPGRAM_API_KEY is not set.');
            return;
        }

        finalTranscriptRef.current = inputMessage ? inputMessage + ' ' : '';
        setInputMessage(finalTranscriptRef.current);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            let mimeType = 'audio/webm;codecs=opus';
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = 'audio/webm';
            }

            const mediaRecorder = new MediaRecorder(stream, { mimeType });
            mediaRecorderRef.current = mediaRecorder;

            const languageMap = { en: 'en-US', hi: 'hi', es: 'es', fr: 'fr' };
            const wsUrl = `wss://api.deepgram.com/v1/listen?language=${languageMap[selectedLanguage]}`;
            const socket = new WebSocket(wsUrl, ['token', DEEPGRAM_API_KEY]);
            websocketRef.current = socket;

            socket.onopen = () => {
                setIsRecording(true);
                mediaRecorder.start(250);
            };
            mediaRecorder.addEventListener('dataavailable', (e) => {
                if (e.data.size > 0 && socket.readyState === WebSocket.OPEN) {
                    socket.send(e.data);
                }
            });
            socket.onmessage = (message) => {
                const received = JSON.parse(message.data);
                const transcript = received.channel?.alternatives?.[0]?.transcript;
                if (transcript) {
                    if (received.is_final) {
                        finalTranscriptRef.current += transcript + ' ';
                        setInputMessage(finalTranscriptRef.current);
                    } else {
                        setInputMessage(finalTranscriptRef.current + transcript);
                    }
                }
            };
            socket.onerror = (error) => {
                console.error('WebSocket error:', error);
                stopRecording();
            };
            socket.onclose = stopRecording;
        } catch (error) {
            console.error('Error starting recording:', error);
            alert('Failed to start recording. Check microphone permissions.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current = null;
        }
        if (websocketRef.current) {
            websocketRef.current.close();
            websocketRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        setIsRecording(false);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            const userMessage = inputMessage.trim();
            setMessages((prev) => [
                ...prev,
                { role: 'user', content: userMessage },
                { role: 'assistant', content: 'Typing ...' } // add placeholder
            ]);
            setInputMessage('');
            dispatch(sendChatMessageAsync({ prompt: userMessage }));
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const renderMessage = (text) => {
        const parts = text.split(/```(?:[a-zA-Z]*)?\n?/g);
        return parts.map((part, i) =>
            i % 2 === 0 ? (
                part.trim() ? <p key={i} className="whitespace-pre-wrap mb-2">{part}</p> : null
            ) : (
                <div key={i} className="relative my-2">
                    <button
                        onClick={() => copyToClipboard(parts[i], i)}
                        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded"
                    >
                        {copiedIndex === i ? <FaCheck /> : <FaRegCopy />}
                    </button>
                    <SyntaxHighlighter
                        language="javascript"
                        style={oneDark}
                        customStyle={{ borderRadius: '0.5rem', padding: '1rem' }}
                    >
                        {parts[i]}
                    </SyntaxHighlighter>
                </div>
            )
        );
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        return () => stopRecording();
    }, []);

    return (
        <div className="pt-16 fixed inset-0 bg-[#0f172a] text-white flex flex-col">
            <main className="flex-1 flex flex-col bg-[#1e293b] overflow-hidden">
                <div className="text-xl font-semibold text-center py-4 border-b border-gray-700 bg-[#0f1d2a]">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">AI</span>
                        </div>
                        <span>ChatBot</span>
                    </div>
                    {isRecording && <div className="text-sm text-red-400 mt-1 animate-pulse">🎤 Recording...</div>}
                </div>

                <div className="px-6 py-3 border-b border-gray-700 bg-[#0f1d2a] flex items-center justify-between">
                    <div>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-1">
                            Voice Language:
                        </label>
                        <select
                            id="language"
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="bg-[#1e293b] text-white border border-gray-600 rounded-lg px-3 py-1.5 text-sm"
                            disabled={isRecording}
                        >
                            {languages.map((lang) => (
                                <option key={lang.code} value={lang.code}>{lang.name}</option>
                            ))}
                        </select>
                    </div>

                    <Link to="/chat/history">
                        <button className="bg-gray-600 hover:bg-gray-500 text-white text-sm font-medium py-2 px-4 rounded-lg">History</button>
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center text-gray-400 mt-8">
                            <div className="text-4xl mb-4">🤖</div>
                            <h3 className="text-lg font-medium mb-2">How can I help you today?</h3>
                            <p className="text-sm">Ask me anything or use voice input to get started.</p>
                        </div>
                    )}

                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-100'}`}>
                                {renderMessage(message.content)}
                            </div>
                        </div>
                    ))}

                    <div ref={messagesEndRef} />
                </div>

                <div className="border-t border-gray-700 bg-[#0f1d2a] p-4">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                        }}
                        className="flex items-center space-x-3 max-w-4xl mx-auto"
                    >
                        <div className="flex-1 relative">
                            <textarea
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder={isRecording ? 'Listening...' : 'Message ChatBot...'}
                                className="w-full bg-[#1e293b] text-white placeholder-gray-400 outline-none rounded-2xl px-4 py-3 pr-12 resize-none border border-gray-600 focus:border-blue-500"
                                rows="1"
                                disabled={isRecording}
                                style={{ minHeight: '44px', maxHeight: '120px' }}
                            />
                        </div>

                        <button
                            type="button"
                            onClick={isRecording ? stopRecording : startRecording}
                            className={`p-3 rounded-full transition-colors ${isRecording ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-600 hover:bg-gray-500 text-white'}`}
                            title={isRecording ? 'Stop recording' : 'Start recording'}
                        >
                            {isRecording ? <FaPause /> : <FaMicrophone />}
                        </button>

                        <button
                            type="submit"
                            className={`p-3 rounded-full transition-colors ${inputMessage.trim() && !isRecording ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                            disabled={isRecording || !inputMessage.trim()}
                        >
                            <IoMdSend />
                        </button>
                    </form>
                    <div className="text-xs text-center text-gray-500 mt-2">ChatBot - Right Reserved • Kedi_Chiz</div>
                </div>
            </main>
        </div>
    );
};

export default Chat;
