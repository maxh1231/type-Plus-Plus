import { Link } from "react-router-dom";

const Friends = ({ friends }) => {
    if (!friends || !friends.length) {
        return null;
    }
    return (
        <section className="text-center">
            {friends.map(friend => (
                <button key={friend._id}>
                    <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
                </button>
            ))}
        </section>
    )
}

export default Friends;