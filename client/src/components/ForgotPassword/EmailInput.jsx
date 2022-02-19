import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useLazyQuery } from '@apollo/client';
import { QUERY_USER_EMAIL } from '../../utils/queries';

const EmailInput = ({setCurrentComponent, getUser, data}) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ criteriaMode: 'all' });

    const onSubmit = async (formData) => {
        try {
            await getUser({variables: {"email": formData.email}})
            setCurrentComponent('SecurityQuestion')
        } catch (e) {
            document.getElementById('emailInvalid').classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('emailInvalid').classList.add('hidden');
            }, 3000)
        }
    };

    return (
        <main className="bg-gray-200 flex-grow flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Password Reset</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
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

                        <div className="p-2 font-bold text-red-500 text-center hidden" id="emailInvalid">Email not found</div>

                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none my-1"
                        >
                            Reset Password
                        </button>

                        <div className='flex justify-center m-1'>
                            <a href='/login' className="items-center underline text-blue-600 hover:text-blue-900">Return To Login</a>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default EmailInput;