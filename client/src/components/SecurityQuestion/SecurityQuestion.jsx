import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const SecurityQuestion = ({data, setCurrentComponent}) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ criteriaMode: 'all' });

    const onSubmit = async (answerData) => {
        if (answerData.answer === data.userByEmail.answer) {
            setCurrentComponent('UpdatePassword');
        } else {
            
        }
    };

    let question;
    switch (data.userByEmail.question) {
        case "1": question = "What city were you born in?"
            break;
        case "2": question = "What is your mother's maiden name?"
            break;
        case "3": question = "What is your dream vacation spot?"
            break;
        case "4": question = "What is your favorite pizza topping?"
            break;
        case "5": question = "Who is your favorite band/artist?"
            break;
    };

    return (
        <main className="bg-gray-200 flex-grow flex flex-col">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='answer'>{question}</label>
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
                    name='answer'
                    className="w-fit flex flex-col"
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
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                />

                <button
                    type="submit"
                    className="w-full text-center py-3 rounded bg-theme-blue text-gray-100 dark:text-gray-300 hover:bg-blue-600 focus:outline-none my-1 transition-all duration-300"
                >
                    Submit Answer
                </button>
            </form>
        </main>
    );
};

export default SecurityQuestion;