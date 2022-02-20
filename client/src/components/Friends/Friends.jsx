import { Link } from 'react-router-dom';

const Friends = ({ friends }) => {
    if (!friends || !friends.length) {
        return null;
    }
    return (
        <div className="block rounded-lg shadow-sm border w-44 text-center transition-all duration-200 dark:border-gray-400 h-60">
            <div className="py-3 px-6 text-lg border-b dark:border-gray-400 rounded-t-lg">
                Friends
            </div>
            <div className="p-1 h-44">
                <div className="flex flex-col flex-1 overflow-y-auto h-44">
                    {friends.map((friend) => (
                        <span key={friend._id}>
                            <Link
                                to={`/profile/${friend.username}`}
                                className="hover:text-theme-red dark:hover:text-theme-red transition-all duration-300"
                            >
                                {friend.username}
                            </Link>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Friends;
