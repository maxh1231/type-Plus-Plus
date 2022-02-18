import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Modal from 'react-modal';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_USER_EMAIL } from '../../utils/queries';

const SecurityQuestion = () => {
    document.onload(openModal());
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {

    }

    function closeModal() {
        setIsOpen(false);
    }

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ criteriaMode: 'all' });

    const onSubmit = async (data) => {
        try {
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <main className="bg-gray-200 flex-grow flex flex-col">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    style={{
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                        },
                    }}
                    >
                    <input
                        {...register('answer', {
                            required: 'You must answer the security question',
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
                        className="w-fit flex flex-col"
                    >
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
                        <button onClick={closeModal} className="text-right">
                            ❌
                        </button>
                        <div id="modal-info" className="p-10">
                            <p>Email: </p>

                        </div>
                    </input>
                </Modal>
            </form>
        </main>
    );
};

export default SecurityQuestion;