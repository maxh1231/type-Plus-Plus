import defaultPhoto from '../../assets/images/no-profile-picture.svg';

const UserInfo = ({ data }) => {
    return (
        <section>
            <div>
                <img src={defaultPhoto} alt='' width='100' height='100'></img>
            </div>
            <div>
                <h3>Hello {data.me.username}</h3>
            </div>
            {/* Bio */}
            <div>
                <p>
                    {data.me.bio}
                </p>

                {!data.me.bio && <span>Add a bio!</span>}

                {data.me.bio && <span>Update bio</span>}
            </div>
            {/* Test results */}
            <div>
                <p>Highest WPM: 105</p>
                <p>Average WPM: 87</p>
            </div>
            <div>
                <p>Location: United States </p>
            </div>
        </section>
    )
}

export default UserInfo;