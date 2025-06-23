import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { loginUserAsync, selectLoggedInUser } from '../features/auth/AuthSlice';


export default function Login() {

    const dispatch = useDispatch();
    const userInfo = useSelector(selectLoggedInUser);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log(data);
            dispatch(
                loginUserAsync({
                    email: data.email,
                    password: data.password,
                })
            );
        } catch (error) {
            console.error('Login failed:', error);
        }
    };


    if (userInfo) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-300 via-purple-400 to-blue-500 p-4">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white rounded-xl shadow-md w-full max-w-md p-8 space-y-6"
                >
                    <h2 className="text-3xl font-semibold text-gray-800">Log In</h2>





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
                        Log In
                    </button>

                    <p className="text-sm text-gray-600 text-center">
                        Create an account or{' '}
                        <Link to="/signup" className="text-purple-600 font-medium hover:underline">
                            Sign Up
                        </Link>
                    </p>


                </form>
            </div>


            {/* <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
                    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Email</label>
                            <input
                                type="email"
                                {...register('email', { required: 'Email is required' })}
                                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                {...register('password', { required: 'Password is required' })}
                                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-sm text-gray-600 text-center mt-4 mb-2">
                        If not a user go to <Link to="/signup" className="text-blue-500 underline">SignUp</Link> instead.
                    </p>
                </div>
            </div> */}
        </>
    );
}
