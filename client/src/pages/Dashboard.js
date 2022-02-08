import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

import Uploader from '../components/Uploader';
import UserInfo from '../components/UserInfo'
import Achievements from '../components/Achievements';
import Progress from '../components/Progress'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');


const Dashboard = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }
    function closeModal() {
        setIsOpen(false);
    }
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_ME);
    console.log(data);

    const user = data?.me || data?.user || {};

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/dashboard" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
            <h4>
                Must be logged in
            </h4>
        );
    }
    return (
        <section>
            <div>
                <button onClick={openModal}>Open Modal</button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                    <button onClick={closeModal}>close</button>
                    <div>I am a modal</div>
                    <form>
                        <input />
                        <button>tab navigation</button>
                        <button>stays</button>
                        <button>inside</button>
                        <button>the modal</button>
                    </form>
                </Modal>
            </div>
            {/* <Uploader image={image} setImage={setImage} url={url} setUrl={setUrl} />
            <UserInfo data={data} />
            <Achievements />
            <Progress /> */}

        </section>
    )
}

export default Dashboard;