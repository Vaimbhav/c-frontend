import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { selectChat } from '../features/chat/ChatSelectors';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const ChatHistory = () => {
    const history = useSelector(selectChat);
    const [copiedIndex, setCopiedIndex] = useState(null);

    const handleCopy = (code, index) => {
        navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1500);
    };

    const renderMessage = (text) => {
        const parts = text.split(/```(?:[a-zA-Z]*)?\n?/g);
        const result = [];

        for (let i = 0; i < parts.length; i++) {
            if (i % 2 === 0) {
                if (parts[i].trim()) {
                    result.push(
                        <p key={`text-${i}`} className="whitespace-pre-wrap mb-2">{parts[i]}</p>
                    );
                }
            } else {
                // Code block with copy button
                result.push(
                    <div key={`code-${i}`} className="relative group">
                        <button
                            onClick={() => handleCopy(parts[i], i)}
                            className="absolute top-2 right-2 text-xs bg-gray-800 hover:bg-gray-600 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            {copiedIndex === i ? 'Copied!' : 'Copy'}
                        </button>
                        <SyntaxHighlighter
                            language="cpp"
                            style={oneDark}
                            customStyle={{
                                borderRadius: '0.75rem',
                                padding: '1rem',
                                marginTop: '0.5rem',
                            }}
                        >
                            {parts[i]}
                        </SyntaxHighlighter>
                    </div>
                );
            }
        }

        return result;
    };

    const formatDate = (iso) => {
        const date = new Date(iso);
        return date.toLocaleString();
    };

    return (
        <div className="pt-8 md:pt-12 lg:pt-16 fixed inset-0 bg-[#0f172a] text-white flex flex-col px-4">
            <div className="bg-[#1e293b] rounded-xl shadow-xl flex-1 flex flex-col overflow-hidden">
                <div className="text-xl font-semibold text-center border-b border-gray-700 pb-6 pt-4">
                    Chat History
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scroll-smooth">
                    {history.length === 0 ? (
                        <p className="text-gray-400 text-center">No chat history available.</p>
                    ) : (
                        history.map((item) => (
                            <div key={item.id} className="bg-gray-700 p-4 rounded-lg space-y-4 relative">
                                <div className="whitespace-pre-wrap">
                                    <span className="font-semibold text-blue-400">You :</span> {item.prompt}
                                </div>

                                <div className="whitespace-pre-wrap">
                                    <span className="font-semibold text-green-400">Bot :</span>
                                    <div className="mt-2 space-y-2">
                                        {renderMessage(item.reply)}
                                    </div>
                                </div>

                                <div className="text-xs text-gray-400 text-right mt-2">
                                    {formatDate(item.createdAt)}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="mt-4 mb-4">
                <Link
                    to="/chat"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
                >
                    Back to Chat
                </Link>
            </div>
        </div>
    );
};

export default ChatHistory;
