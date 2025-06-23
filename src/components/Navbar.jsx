import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedInUser, } from '../features/auth/AuthSlice';



const Navbar = () => {
    const userInfo = useSelector(selectLoggedInUser);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);


    // useEffect(() => {
    //     console.log('User:',);
    // }, [])


    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);





    return (
        <>
            {userInfo && (
                <>
                    {/* Navbar */}
                    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="text-2xl font-bold text-blue-600">Chat App</div>

                                {/* Desktop Menu */}
                                <div className="hidden md:flex space-x-6 items-center">
                                    <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                                    <Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
                                    <Link
                                        to="/premium"
                                        className="bg-gray-700 text-white px-3 py-2 rounded hover:bg-amber-700"
                                    >
                                        Get Plus
                                    </Link>

                                    <Link
                                        to='/logout'
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Logout
                                    </Link>


                                </div>

                                {/* Mobile Menu Toggle */}
                                <div className="md:hidden">
                                    <button onClick={toggleMenu}>
                                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav >

                    {/* Mobile Menu Overlay */}
                    {
                        isOpen && (
                            <>
                                {/* Dark Overlay */}
                                <div className="fixed inset-0 bg-black opacity-60 z-40"></div>

                                {/* Slide-in Menu */}
                                <div className="fixed top-16 left-0 w-full bg-white h-full z-50 px-4 pt-4 pb-10 space-y-4">
                                    <div>
                                        <Link
                                            to="/"
                                            onClick={toggleMenu}
                                            className="block px-3 font-medium text-xl py-2 text-gray-700 hover:text-blue-600"
                                        >
                                            Home
                                        </Link>
                                    </div>

                                    <div>
                                        <Link
                                            to="/profile"
                                            onClick={toggleMenu}
                                            className="block font-medium text-xl px-3 py-2 text-gray-700 hover:text-blue-600"
                                        >
                                            Profile
                                        </Link>
                                    </div>

                                    <div>
                                        <Link to="/premium" onClick={toggleMenu}>
                                            <button className="block font-medium text-xl px-3 py-2 text-gray-700 hover:text-blue-600">
                                                Get Plus
                                            </button>
                                        </Link>
                                    </div>



                                    <div>
                                        <Link
                                            to='/logout'
                                            onClick={() => {
                                                toggleMenu();
                                            }}
                                            className='block font-medium text-xl px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600'
                                        >
                                            Logout
                                        </Link>
                                    </div>



                                </div>
                            </>
                        )
                    }
                </>
            )}
        </>
    );
};

export default Navbar;
