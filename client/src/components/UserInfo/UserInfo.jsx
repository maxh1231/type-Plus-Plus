import defaultPhoto from '../../assets/images/no-profile-picture.svg';

const UserInfo = ({ data }) => {
    return (
        <section>
            <div>
                <img src={defaultPhoto} alt=''></img>
            </div>
            <div>
                <h3>Hello {data.me.username}</h3>
            </div>
            <div>
                <p>
                    {/* Bio section(?) */}
                </p>
            </div>
        </section>
    )
}

export default UserInfo;