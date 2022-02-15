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
import Uploader from '../components/Uploader'
import RecentBadge from '../components/RecentBadge'
import Chart from '../components/Chart'

import defaultPhoto from '../assets/images/no-profile-picture.svg'

import { PencilAltIcon } from '@heroicons/react/outline'


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
};

Modal.setAppElement('#root');

const Dashboard = () => {
    let subtitle;
    const [image, setImage] = useState(defaultPhoto)
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
    const { loading, data } = useQuery(QUERY_ME)

    // console.log(userParam)
    console.log(data);

    const user = data?.me || data?.user || {};
    console.log({ user: user, img: image });

    useEffect(() => {
        if (user.profilePic) {
            setImage(user.profilePic);
        }
    }, [user])

    console.log({ img: image, user: user })

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/dashboard" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!Auth.loggedIn()) {
        return <h4 className="flex-grow">Must be logged in</h4>;
    }

    return (
        <section className="mt-2 ml-2 py-2 px-2 h-1/2 flex border-1 border-black justify-around">
            <div className="bg-gray-100">
                <DashboardUserInfo
                    data={data}
                    modalBio={modalBio}
                    setModalBio={setModalBio}
                    image={image}
                    setImage={setImage}
                />
                <PencilAltIcon onClick={openModal}/>
            </div>


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
            <div className="bg-gray-100 w-[500px]">
                <div>
                    <RecentBadge />
                    <Link to='/badges'><h2 className="text-lg text-center">View All Badges</h2></Link>
                </div>
                <div>
                    <h2 className="text-lg text-center">Friends</h2>
                    <Friends friends={data.me.friends} />
                </div>
                <div className="">
                    <Chart />
                </div>
            </div>

        </section>
    );
};

export default Dashboard;