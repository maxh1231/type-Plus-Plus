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

// Modal Styles, remove later for custom styles
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    overlay: { zIndex: 100 },
};

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
        return <h4 className="grow">Must be logged in</h4>;
    }

    return (
        <main className="grow flex items-center dark:bg-gray-800">
            <section className="grow grid grid-cols-4">
                <div className="flex flex-col items-center justify-center">
                    <DashboardUserInfo
                        data={data}
                        modalBio={modalBio}
                        setModalBio={setModalBio}
                        image={image}
                        setImage={setImage}
                        refetch={refetch}
                    />
                    <span className="flex mt-2">
                        Edit Profile
                        <PencilAltIcon
                            onClick={openModal}
                            className="w-5 h-5 mx-1 cursor-pointer text-gray-700 hover:text-theme-red dark:hover:text-theme-red dark:text-gray-400 transition duration-300"
                        />
                    </span>
                    <h2 className="mt-2 text-lg text-center">Friends</h2>
                    <Friends friends={data.me.friends} />
                    <RecentBadge />
                    <Link to="/badges">
                        <h2 className="text-lg text-center">View All Badges</h2>
                    </Link>
                </div>
                <div className="col-span-3">
                    <Chart />
                </div>
            </section>
            {/* Modal */}
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                        Edit Profile
                    </h2>

                    <EditModal
                        data={data}
                        modalBio={modalBio}
                        setModalBio={setModalBio}
                        image={image}
                        setImage={setImage}
                    />
                    <button onClick={closeModal}>Done</button>
                </Modal>
            </div>
        </main>
    );
};

export default Dashboard;
