import { Link } from 'react-router-dom';

const Friends = ({ friends }) => {
    if (!friends || !friends.length) {
        return null;
    }
    return (
        <div className="container text-center border w-fit rounded-md ">
            <h2 className="text-lg text-center border-b">Friends:</h2>
            {friends.map((friend) => (
                <button key={friend._id}>
                    <Link to={`/profile/${friend.username}`}>
                        {friend.username}
                    </Link>
                </button>
            ))}
        </div>
    );
};

export default Friends;
