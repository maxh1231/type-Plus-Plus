// Imports
import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import DashboardUserInfo from '../components/DashboardUserInfo';
// import Achievements from '../components/DashboardAchievements';
// import Progress from '../components/DashboardProgress'
import EditModal from '../components/EditModal';
import Friends from '../components/Friends';
import Uploader from '../components/Uploader';
import RecentBadge from '../components/RecentBadge';
import Chart from '../components/Chart';
import defaultPhoto from '../assets/images/no-profile-picture.svg';
import { PencilAltIcon } from '@heroicons/react/outline';

// Modal Styles
let customStyles;
if (localStorage.theme === 'dark') {
    customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            alignItems: 'center',
            backgroundColor: 'rgba(17, 24, 39, 1)',
            borderRadius: '0.5rem',
            color: '#e5e7eb',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            opacity: 1,
            padding: '2rem',
            transform: 'translate(-50%, -50%)',
        },
        overlay: { backgroundColor: 'rgba(17, 24, 39, 0.75)', zIndex: 100 },
    };
} else {
    customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            borderRadius: '0.5rem',
            // marginRight: '-50%',
            opacity: 1,
            transform: 'translate(-50%, -50%)',
        },
        overlay: { backgroundColor: 'rgba(243, 244, 246, 0.75)', zIndex: 100 },
    };
}

Modal.setAppElement('#root');

const Dashboard = () => {
    let subtitle;
    const [image, setImage] = useState(defaultPhoto);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalBio, setModalBio] = useState('');
    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }
    function closeModal() {
        setIsOpen(false);
    }
    const { username: userParam } = useParams();
    const { loading, data, refetch } = useQuery(QUERY_ME);

    const user = data?.me || data?.user || {};

    useEffect(() => {
        if (user.profilePic) {
            setImage(user.profilePic);
        }
    }, [user]);

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/dashboard" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!Auth.loggedIn()) {
        return (
            <section className="grow flex justify-center items-center dark:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all">
                <h4 className="">
                    <Link
                        to="/login"
                        className="hover:text-theme-red dark:hover:text-theme-red transition-all duration-300"
                    >
                        Log in
                    </Link>{' '}
                    to see your dashboard!
                </h4>
            </section>
        );
    }

    return (
        <main className="grow flex items-center dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <section className="grow grid grid-cols-4">
                <div className="h-full flex flex-col items-center justify-evenly">
                    <div className="flex flex-col items-center">
                        <DashboardUserInfo
                            data={data}
                            modalBio={modalBio}
                            setModalBio={setModalBio}
                            image={image}
                            setImage={setImage}
                            refetch={refetch}
                        />
                        <span
                            onClick={openModal}
                            className="flex mt-2 text-gray-700 hover:text-theme-red dark:hover:text-theme-red dark:text-gray-300 transition duration-300 cursor-pointer"
                        >
                            Edit Profile
                            <PencilAltIcon className="w-5 h-5 mx-1" />
                        </span>
                    </div>
                    <div className="flex flex-wrap justify-evenly w-full">
                        <Friends friends={data.me.friends} />
                        <RecentBadge />
                    </div>
                </div>
                <div className="col-span-3 flex justify-center items-center">
                    <div className="w-5/6">
                        <Chart />
                    </div>
                </div>
            </section>
            {/* Modal */}
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Modal"
                >
                    <EditModal
                        data={data}
                        modalBio={modalBio}
                        setModalBio={setModalBio}
                        image={image}
                        setImage={setImage}
                    />
                    <button
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className="flex items-center justify-between px-6 py-2.5 text-gray-800 hover:text-gray-300 bg-gray-300 hover:bg-gray-600 font-medium uppercase rounded shadow-sm hover:shadow-md focus:shadow-lg transition duration-300 ease-in-out mt-6"
                        onClick={closeModal}
                    >
                        Save Changes
                    </button>
                </Modal>
            </div>
        </main>
    );
};

export default Dashboard;
