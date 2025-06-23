import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost } from 'lucide-react';

const NotFound = () => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 px-6 text-center">
            <Ghost
                size={80}
                className="text-blue-500 mb-6 animate-bounce"
                aria-hidden="true"
            />
            <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
            <p className="text-base text-gray-600 max-w-md mb-6">
                Sorry, the page you're looking for doesn’t exist. It might have been moved or deleted.
            </p>
            <Link
                to="/"
                className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg shadow transition duration-200"
            >
                Return to Homepage
            </Link>
        </main>
    );
};

export default NotFound;
