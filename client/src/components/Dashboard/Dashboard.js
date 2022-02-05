import ProfilePic from './ProfilePic';
import UserInfo from './UserInfo'
import Achievements from './Achievements';
import Progess from './Progess'

const Dashboard = ({ image, setImage, url, setUrl }) => {
    return (
        <section>
            <ProfilePic image={image} setImage={setImage} url={url} setUrl={setUrl} />
            <UserInfo />
            <Achievements />
            <Progess />
        </section>
    )
}

export default Dashboard;