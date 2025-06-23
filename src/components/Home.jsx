import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/chat');
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-4">
            {/* Date and category */}
            <p className="text-white/90 text-lg mb-2">
                19 June, 2022 <span className="text-gray-500">Product</span>
            </p>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-10">
                Introducing Chat App
            </h1>

            {/* Button */}
            <button
                onClick={handleClick}
                className="flex items-center gap-2 bg-white text-black font-medium text-lg px-6 py-3 rounded-full hover:opacity-90 transition"
            >
                Try ChatBot
                <ArrowUpRight className="w-5 h-5" />
            </button>
        </div>
    );
};

export default Home;
