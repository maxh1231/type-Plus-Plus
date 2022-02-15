import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const Signup = () => {
    const [addUser, { error }] = useMutation(ADD_USER);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ criteriaMode: 'all' });

    const onSubmit = async (newData) => {
        try {
            const { data } = await addUser({
                variables: { ...newData },
            });
            console.log(data);
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main className="bg-gray-200 flex-grow flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
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
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                        />
                        <ErrorMessage
                            errors={errors}
                            name="username"
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
                            Create Account
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Signup;
