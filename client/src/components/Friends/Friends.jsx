import { Link } from 'react-router-dom';
import defaultPhoto from '../../assets/images/no-profile-picture.svg';

const Friends = ({ friends }) => {
    let theDecider = true;
    if (!friends || !friends.length) {
        theDecider = false;
    }

    return (
        <div className="block rounded-lg shadow-sm border w-44 text-center transition-all duration-200 dark:border-gray-400 h-60">
            <div className="py-3 px-6 text-lg border-b bg-gray-100 dark:bg-gray-900 dark:border-gray-400 rounded-t-lg">
                Friends
            </div>
            <div className="p-1 h-44">
                {theDecider ? (
                    <div className="flex flex-col flex-1 overflow-y-auto h-44">
                        {friends.map((friend) => (
                            <span key={friend._id}>
                                <div className="flex flex-row flex-wrap justify-center break-all my-1">
                                    {friend.profilePic ? (
                                        <img
                                            className="w-[32px] h-[32px] object-cover rounded-full"
                                            src={friend.profilePic}
                                            alt="friend avatar"
                                        ></img>
                                    ) : (
                                        <img
                                            className="w-[32px] h-[32px] object-cover rounded-full"
                                            src={defaultPhoto}
                                            alt="friend avatar"
                                        ></img>
                                    )}
                                    <Link
                                        to={`/profile/${friend.username}`}
                                        className="hover:text-theme-red dark:hover:text-theme-red transition-all duration-300 my-1 mx-2"
                                    >
                                        {friend.username}
                                    </Link>
                                </div>
                            </span>
                        ))}
                    </div>
                ) : (
                    <div className="p-1 mb-1">
                        You haven't added any friends yet. Visit another profile
                        and click "Add Friend" to get started!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Friends;
