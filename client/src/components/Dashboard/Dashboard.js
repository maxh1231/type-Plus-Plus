import ProfilePic from './ProfilePic';
import UserInfo from './UserInfo'
import Achievements from './Achievements';
import Progess from './Progess'

const Dashboard = () => {
    return (
        <sction>
            <ProfilePic image={image} setImage={setImage} url={url} setUrl={setUrl} />
            <UserInfo />
            <Achievements />
            <Progess />
        </sction>
    )
}

export default Dashboard;