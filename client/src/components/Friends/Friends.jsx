import { Link } from 'react-router-dom';
import defaultPhoto from '../../assets/images/no-profile-picture.svg'

const Friends = ({ friends }) => {
    if (!friends || !friends.length) {
        return null;
    }

    console.log(friends)
    return (
        <div className="block rounded-lg shadow-sm border w-44 text-center transition-all duration-200 dark:border-gray-400 h-60">
            <div className="py-3 px-6 text-lg border-b bg-gray-100 dark:bg-gray-900 dark:border-gray-400 rounded-t-lg">
                Friends
            </div>
            <div className="p-1 h-44">
                <div className="flex flex-col flex-1 overflow-y-auto h-44">
                    {friends.map((friend) => (
                        <span key={friend._id}>
                            <div className="flex flex-row justify-center">
                                {friend.profilePic ? <img className="w-[32px] h-[32px] object-cover rounded-full mr-1" src={friend.profilePic}></img> : <img className="w-[32px] h-[32px] object-cover rounded-full mr-1" src={defaultPhoto}></img>}
                                <Link
                                    to={`/profile/${friend.username}`}
                                    className="hover:text-theme-red dark:hover:text-theme-red transition-all duration-300 ml-1"
                                >
                                    {friend.username}
                                </Link>
                            </div>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Friends;
