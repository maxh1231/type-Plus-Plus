import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useMutation } from '@apollo/client';
import { UPDATE_PASSWORD } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = ({data}) => {
    const [updatePassword] = useMutation(UPDATE_PASSWORD);
    let navigate = useNavigate()

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
        await updatePassword({variables: {"password": answerData.password, "_id": data.userByEmail._id}})
        navigate('/login')
    };

    return (
        <main className="bg-gray-200 flex-grow flex flex-col">
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

                <button
                    type="submit"
                    className="w-full text-center py-3 rounded bg-theme-blue text-gray-100 dark:text-gray-300 hover:bg-blue-600 focus:outline-none my-1 transition-all duration-300"
                >
                    Reset Password
                </button>
            </form>
        </main>
    );
};

export default UpdatePassword;