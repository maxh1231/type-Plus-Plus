import { Link } from 'react-router-dom';

const Friends = ({ friends }) => {
    if (!friends || !friends.length) {
        return null;
    }
    return (
        <div className="block rounded-lg shadow-sm border w-44 text-center transition-all duration-200 dark:border-gray-400">
            <div className="py-3 px-6 text-lg border-b dark:border-gray-400 rounded-t-lg">
                Friends
            </div>
            <div className="p-1">
                {friends.map((friend) => (
                    <button key={friend._id}>
                        <Link to={`/profile/${friend.username}`}>
                            {friend.username}
                        </Link>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Friends;
