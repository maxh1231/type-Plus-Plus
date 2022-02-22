// Imports
import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_USER } from '../utils/mutations';
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
import { PencilAltIcon, XIcon } from '@heroicons/react/outline';

// Modal Styles
let customStyles;

if (localStorage.theme === 'dark') {
    customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            alignItems: 'center',
            backgroundColor: 'rgba(17, 24, 39, 1)',
            borderRadius: '0.5rem',
            color: '#e5e7eb',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            opacity: 1,
            padding: '2rem',
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
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '0.5rem',
            color: '#e5e7eb',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            opacity: 1,
            padding: '2rem',
            transform: 'translate(-50%, -50%)',
        },
        overlay: { backgroundColor: 'rgba(243, 244, 246, 0.75)', zIndex: 100 },
    };
}

// Resize modal if user is on mobile
let windowWidth = window.screen.width;
if (windowWidth < 640) {
    customStyles.content.width = '80%';
}

Modal.setAppElement('#root');

const Dashboard = () => {
    const [image, setImage] = useState(defaultPhoto);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalBio, setModalBio] = useState('');
    const [toggleDelete, setToggleDelete] = useState(true);
    const { username: userParam } = useParams();
    const { loading, data, refetch } = useQuery(QUERY_ME);
    const [deleteUser, { error }] = useMutation(REMOVE_USER);

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

    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {}
    function closeModal() {
        setIsOpen(false);
    }

    const toggleDeleteBtn = () => {
        setToggleDelete(false);
    };

    const deleteAccount = async () => {
        try {
            const { data } = await deleteUser();
            console.log(data);
            localStorage.clear();
            document.location.replace('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main className="grow flex items-center dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            {/* <section className="grow grid grid-cols-4"> */}
            <section className="grow py-6 lg:grid lg:grid-cols-4">
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
                    <div className="flex flex-wrap justify-evenly w-full pt-4">
                        <div className="pb-5">
                            <Friends friends={data.me.friends} />
                        </div>
                        <div>
                            <RecentBadge />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center col-span-3 items-center">
                    {/* <div className="w-5/6"> */}
                    <div className="w-5/6 h-80 pt-4 lg:h-2/5 xl:h-3/5 2xl:h-full">
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
                    toggleDelete={toggleDelete}
                >
                    <button
                        onClick={closeModal}
                        className="absolute top-0 left-[13.25rem] text-gray-700 dark:text-gray-300 hover:text-theme-red dark:hover:text-theme-red transition-all duration-300 sm:left-[15.5rem]"
                    >
                        <XIcon className="h-6 w-6 m-2" />
                    </button>
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
                        className="w-full text-center py-3 rounded bg-theme-blue text-gray-100 dark:text-gray-300 hover:bg-blue-600 focus:outline-none my-1 transition-all duration-300"
                        onClick={closeModal}
                    >
                        Save Changes
                    </button>
                    {toggleDelete ? (
                        <button
                            type="button"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            className="w-full text-center py-2 rounded bg-theme-red text-gray-100 dark:text-gray-300 hover:bg-red-600 focus:outline-none my-1 transition-all duration-300"
                            onClick={toggleDeleteBtn}
                        >
                            Delete Account
                        </button>
                    ) : (
                        <button
                            type="button"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            className="w-full text-center py-2 rounded bg-red-600 text-gray-100 dark:text-gray-300 hover:bg-red-800 focus:outline-none my-1 transition-all duration-300"
                            onClick={deleteAccount}
                        >
                            Are you sure?
                        </button>
                    )}
                </Modal>
            </div>
        </main>
    );
};

export default Dashboard;
