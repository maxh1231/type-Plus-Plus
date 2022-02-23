import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const SecurityQuestion = ({ data, setCurrentComponent }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ criteriaMode: 'all' });

    const onSubmit = async (answerData) => {
        if (answerData.answer === data.userByEmail.answer) {
            setCurrentComponent('UpdatePassword');
        } else {
            document.getElementById('answerInvalid').classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('answerInvalid').classList.add('hidden');
            }, 3000); 
        }
    };

    let question;
    switch (data.userByEmail.question) {
        case '1':
            question = 'In which city were you born?';
            break;
        case '2':
            question = "What is your mother's maiden name?";
            break;
        case '3':
            question = 'What is your dream vacation spot?';
            break;
        case '4':
            question = 'What is your favorite pizza topping?';
            break;
        case '5':
            question = 'Who is your favorite band/artist?';
            break;
    }

    return (
        <main className="bg-gray-200 grow flex flex-col dark:bg-gray-800 transition duration-200">
            <div className="container max-w-sm mx-auto my-5 flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md w-full text-gray-700 dark:text-gray-300 dark:bg-gray-900 transition duration-200">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="mb-8 text-3xl text-center">
                            Password Reset
                        </h1>
                        <label htmlFor="answer" className="text-center">
                            {question}
                        </label>
                        <input
                            {...register('answer', {
                                required:
                                    'You must answer the security question',
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
                            name="answer"
                            placeholder="Answer"
                            className="block border w-full p-3 rounded mt-2 mb-4 bg-gray-100 dark:bg-gray-800"
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

                        <div
                            className="p-2 font-bold text-theme-red text-center hidden"
                            id="answerInvalid"
                        >
                            Answer invalid. Try again.
                        </div>  

                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-theme-blue text-gray-100 dark:text-gray-300 hover:bg-blue-600 focus:outline-none my-1 transition-all duration-300"
                        >
                            Submit Answer
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default SecurityQuestion;
