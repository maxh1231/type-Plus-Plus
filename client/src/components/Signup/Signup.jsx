// Imports
import { React, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

const Signup = () => {

    const [addUser, { error }] = useMutation(ADD_USER);

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm({ criteriaMode: 'all' });
    
    const password = useRef(null);
    password.current = watch('password', '');

    const onSubmit = async (newData) => {
        try {
            const { data } = await addUser({
                variables: { ...newData },
            });
            Auth.login(data.addUser.token);
            document.location.replace('/');
            console.log(data);
        } catch (e) {
            document.getElementById('signupInvalid').classList.remove('hidden');
            setTimeout(() => {
                document
                    .getElementById('signupInvalid')
                    .classList.add('hidden');
            }, 3000);
        }
    };

    return (
        <main className="bg-gray-200 flex-grow flex flex-col dark:bg-gray-800 transition duration-200">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full text-gray-700 dark:text-gray-300 dark:bg-gray-900 transition duration-200">
                    <h1 className="mb-8 text-3xl text-center">Sign Up</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register('username', {
                                required: 'Username is required',
                                minLength: {
                                    value: 3,
                                    message:
                                        'Username must be at least 3 characters',
                                },
                                maxLength: {
                                    value: 30,
                                    message:
                                        'Username cannot exceed 30 characters',
                                },
                            })}
                            type="text"
                            placeholder="Username"
                            className="block border border-grey-light w-full p-3 rounded mb-4 bg-gray-100 dark:bg-gray-800"
                        />
                        <ErrorMessage
                            errors={errors}
                            name="username"
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

                        <input
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i,
                                    message: 'Email format is invalid',
                                },
                                maxLength: {
                                    value: 35,
                                    message:
                                        'Email cannot exceed 35 characters',
                                },
                            })}
                            type="email"
                            placeholder="Email"
                            className="block border border-grey-light w-full p-3 rounded mb-4 bg-gray-100 dark:bg-gray-800"
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

                        <input
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message:
                                        'Password must be at least 8 characters',
                                },
                                maxLength: {
                                    value: 20,
                                    message:
                                        'Password cannot exceed 20 characters',
                                },
                            })}
                            id="signupPassword"
                            type={passwordShown ? 'text' : 'password'}
                            placeholder="Password"
                            className="block border border-grey-light w-full p-3 rounded mb-4 bg-gray-100 dark:bg-gray-800"
                        />
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

                        <div className="flex">
                            <input
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password',
                                    validate: {
                                        value: (value) =>
                                            value === password.current ||
                                            'Passwords must match',
                                    },
                                })}
                                id="confirmPassword"
                                type={passwordShown ? 'text' : 'password'}
                                placeholder="Confirm password"
                                className="block border border-grey-light w-5/6 p-3 rounded mb-4 bg-gray-100 dark:bg-gray-800"
                            />
                            {passwordShown ? (<i onClick={togglePasswordVisiblity}><EyeIcon className="h-7 m-3 text-blue-500 hover:text-blue-600" /></i>): (<i onClick={togglePasswordVisiblity}><EyeOffIcon className="h-7 m-3 text-blue-500 hover:text-blue-600" /></i>)}
                        </div>
                        <ErrorMessage
                            errors={errors}
                            name="confirmPassword"
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

                        <select
                            {...register('question', {
                                required: 'You must pick a security question'
                            })}>
                            <option value="">Select a security question</option>
                            <option value="1">What city were you born in?</option>
                            <option value="2">What is your mother's maiden name?</option>
                            <option value="3">What is your dream vacation spot?</option>
                            <option value="4">What is your favorite pizza topping?</option>
                            <option value="5">Who is your favorite band/artist?</option>
                        </select>
                        <input
                            {...register('answer', {
                                required: 'You must answer the security question',
                                minLength: {
                                    value: 3,
                                    message:
                                        'Answer must be at least 3 characters',
                                },
                                maxLength: {
                                    value: 20,
                                    message:
                                        'Answer cannot exceed 20 characters',
                                },
                            })}
                            placeholder="Answer"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                        />
                        <ErrorMessage
                            errors={errors}
                            name="answer"
                            render={({ messages }) => {
                                return messages
                                    ? Object.entries(messages).map(
                                          ([type, message]) => (
                                            <p
                                                key={type}
                                                className="p-2 font-bold text-red-500 text-center"
                                            >
                                                {message}
                                            </p>
                                        )
                                    )
                                    : null;
                            }}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="question"
                            render={({ messages }) => {
                                return messages
                                    ? Object.entries(messages).map(
                                          ([type, message]) => (
                                            <p
                                                key={type}
                                                className="p-2 font-bold text-red-500 text-center"
                                            >
                                                {message}
                                            </p>
                                        )
                                    )
                                    : null;
                            }}
                        />                        

                        <div className="p-2 font-bold text-red-500 text-center hidden" id="signupInvalid">Username or email already in use</div>

                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-theme-blue text-gray-100 dark:text-gray-300 hover:bg-blue-600 focus:outline-none my-1 transition-all duration-300"
                        >
                            Create Account
                        </button>

                        <div className="flex justify-center m-1">
                            <p className="items-center underline text-gray-600 dark:text-gray-300 hover:text-theme-red dark:hover:text-theme-red transition-all duration-300">
                                <Link to="/login">
                                    Already Have An Account?
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Signup;
