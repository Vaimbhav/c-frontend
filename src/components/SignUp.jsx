import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { Navigate, Link } from 'react-router-dom';
import { createUserAsync, selectLoggedInUser } from '../features/auth/AuthSlice';
import { useEffect } from 'react';

export default function Signup() {

    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (user?.id) {
            return <Navigate to="/" replace />;
        }
    }, [user]);

    // useEffect(() => {

    //     console.log('user ->', user);
    // }, [user])

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-300 via-purple-400 to-blue-500 p-4">
                <form
                    onSubmit={handleSubmit((data) => {
                        dispatch(createUserAsync({
                            email: data.email,
                            name: data.name,
                            password: data.password
                        }))
                        console.log('data from user signup -> ', data);
                    })}


                    className="bg-white rounded-xl shadow-md w-full max-w-md p-8 space-y-6"
                >
                    <h2 className="text-3xl font-semibold text-gray-800">Sign up</h2>


                    {/* {error && (
                    <div className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4 text-center">
                        {error} <Link to="/login" className="text-blue-500 underline ml-1">Go to Login</Link>
                    </div>
                )} */}


                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            {...register('name', { required: 'Name is required' })}
                            type="text"
                            className="mt-1 block w-full border-b-2 border-gray-300 focus:outline-none focus:border-purple-500 bg-transparent py-2"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email address</label>
                        <input
                            {...register('email', { required: 'Email is required' })}
                            type="email"
                            className="mt-1 block w-full border-b-2 border-gray-300 focus:outline-none focus:border-purple-500 bg-transparent py-2"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>



                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            {...register('password', { required: 'Password is required' })}
                            type="password"
                            className="mt-1 block w-full border-b-2 border-gray-300 focus:outline-none focus:border-purple-500 bg-transparent py-2"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-purple-700"
                    >
                        Sign up
                    </button>

                    <p className="text-sm text-gray-600 text-center">
                        Already an account or{' '}
                        <Link to="/login" className="text-purple-600 font-medium hover:underline">
                            Sign In
                        </Link>
                    </p>
                </form>
            </div >
        </>

    );
}
