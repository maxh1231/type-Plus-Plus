import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useMutation } from '@apollo/client';
import { UPDATE_PASSWORD } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = ({ data }) => {
    const [updatePassword] = useMutation(UPDATE_PASSWORD);
    let navigate = useNavigate();

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm({ criteriaMode: 'all' });

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const password = useRef(null);
    password.current = watch('password', '');

    const onSubmit = async (answerData) => {
        await updatePassword({
            variables: {
                password: answerData.password,
                _id: data.userByEmail._id,
            },
        });
        navigate('/login');
    };

    return (
        <main className="bg-gray-200 grow flex flex-col dark:bg-gray-800 transition duration-200">
            <div className="container max-w-sm mx-auto my-5 flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md w-full text-gray-700 dark:text-gray-300 dark:bg-gray-900 transition duration-200">
                    <h1 className="mb-8 text-3xl text-center">New Password</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                        <div className="flex items-center bg-gray-100 dark:bg-gray-800 border rounded mb-4">
                            <input
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password',
                                    validate: {
                                        value: (value) =>
                                            value === password.current ||
                                            'Passwords must match',
                                    },
                                })}
                                type={passwordShown ? 'text' : 'password'}
                                placeholder="Confirm password"
                                className="block w-full p-3 rounded-x rounded-l bg-gray-100 dark:bg-gray-800 focus-visible:outline-none"
                            />
                            <div className="h-full bg-gray-100 dark:bg-gray-800 p-2">
                                {passwordShown ? (
                                    <i onClick={togglePasswordVisiblity}>
                                        <EyeIcon className="h-7 w-7 text-blue-500 hover:text-blue-600 bg-transparent transition-all duration-300 hover:cursor-pointer" />
                                    </i>
                                ) : (
                                    <i onClick={togglePasswordVisiblity}>
                                        <EyeOffIcon className="h-7 w-7 text-blue-500 hover:text-blue-600 bg-transparent transition-all duration-300 hover:cursor-pointer" />
                                    </i>
                                )}
                            </div>
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
                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-theme-blue text-gray-100 dark:text-gray-300 hover:bg-blue-600 focus:outline-none my-1 transition-all duration-300"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default UpdatePassword;
