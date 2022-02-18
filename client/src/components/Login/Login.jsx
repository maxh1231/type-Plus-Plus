// Imports
import { React, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADD_BADGE } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { checkStreak } from '../../utils/helpers';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';

const Login = () => {
    const [login, { error }] = useMutation(LOGIN_USER);
    const [addBadge] = useMutation(ADD_BADGE);
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ criteriaMode: 'all' });

    const onSubmit = async (newData) => {
        try {
            const { data } = await login({
                variables: { ...newData },
            });
            Auth.login(data.login.token);
            const streak = checkStreak(data.login.user.streak);
            if (streak) {
                addBadge({ variables: { badgeName: streak } });
            }
            const age = checkStreak(data.login.user.age);
            if (streak) {
                addBadge({ variables: { badgeName: age } });
            }
            document.location.replace('/');
        } catch (e) {
            document.getElementById('loginInvalid').classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('loginInvalid').classList.add('hidden');
            }, 3000);
        }
    };

    return (
        <main className="bg-gray-200 flex-grow flex flex-col dark:bg-gray-800 transition duration-200">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md w-full text-gray-700 dark:text-gray-300 dark:bg-gray-900 transition duration-200">
                    <h1 className="mb-8 text-3xl text-center">Welcome Back!</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register('email', {
                                required: 'Email is required',
                            })}
                            type="text"
                            placeholder="Email"
                            className="block border w-full p-3 rounded mb-4 bg-gray-100 dark:bg-gray-800"
                        />
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ messages }) => {
                                return messages
                                    ? Object.entries(messages).map(
                                          ([type, message]) => (
                                              <p
                                                  key={type}
                                                  className="p-2 font-bold text-theme-red text-center"
                                              >
                                                  {message}
                                              </p>
                                          )
                                      )
                                    : null;
                            }}
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                        />

                        <div className="flex">
                            <input
                                {...register('password', {
                                    required: 'Password is required',
                                })}
                                type={passwordShown ? 'text' : 'password'}
                                placeholder="Password"
                                className="block border border-grey-light w-full p-3 rounded mb-4 bg-gray-100 dark:bg-gray-800"
                            />

                            {passwordShown ? (<i onClick={togglePasswordVisiblity}><EyeIcon className="h-7 m-3 text-blue-500 hover:text-blue-600" /></i>): (<i onClick={togglePasswordVisiblity}><EyeOffIcon className="h-7 m-3 text-blue-500 hover:text-blue-600" /></i>)}
                        </div>
                        <ErrorMessage
                            errors={errors}
                            name="password"
                            render={({ messages }) => {
                                return messages
                                    ? Object.entries(messages).map(
                                          ([type, message]) => (
                                              <p
                                                  key={type}
                                                  className="p-2 font-bold text-theme-red text-center"
                                              >
                                                  {message}
                                              </p>
                                          )
                                      )
                                    : null;
                            }}
                        />

                        <div
                            className="p-2 font-bold text-theme-red text-center hidden"
                            id="loginInvalid"
                        >
                            Invalid credentials
                        </div>

                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-theme-blue text-gray-100 dark:text-gray-300 hover:bg-blue-600 focus:outline-none my-1 transition-all duration-300"
                        >
                            Log In
                        </button>

                        <div className="flex justify-center m-1">
                            <a
                                href="/password-reset"
                                className="items-center underline text-gray-600 dark:text-gray-300 hover:text-theme-red dark:hover:text-theme-red transition-all duration-300"
                            >
                                Forgot Password?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;
