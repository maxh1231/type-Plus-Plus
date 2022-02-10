import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const Login = () => {
    const [login, { error }] = useMutation(LOGIN_USER);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ criteriaMode: 'all' });

    const onSubmit = async (newData) => {
        console.log(newData);
        try {
            const { data } = await login({
                variables: { ...newData },
            });
            console.log(data);
            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main className="bg-gray-200 flex-grow flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Welcome back!</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register('email', {
                                required: 'Email is required',
                            })}
                            type="text"
                            placeholder="Email"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                        />
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ messages }) => {
                                console.log('messages', messages);
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
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                        />

                        <input
                            {...register('password', {
                                required: 'Password is required',
                            })}
                            type="password"
                            placeholder="Password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                        />
                        <ErrorMessage
                            errors={errors}
                            name="password"
                            render={({ messages }) => {
                                console.log('messages', messages);
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

                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none my-1"
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;
