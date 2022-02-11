import defaultPhoto from '../../assets/images/no-profile-picture.svg'

const ProfileUserInfo = ({ data }) => {
    console.log(data);
    return (
        <section>
            <div>
                <img src={defaultPhoto} alt='' width='100' height='100'></img>
            </div>
            <div>
                <h3>{data.user.username}</h3>
            </div>
            <div>
                <p>
                    {data.user.bio}
                </p>
            </div>
        </section>
    )
}

export default ProfileUserInfo;