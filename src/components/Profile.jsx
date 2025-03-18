const Profile = ({accountName, accountType, profilePictureURL}) => {
  return (
    <div className="profile">
      <div className="profiledata">
        <p>
          <strong>{accountName}</strong>
        </p>
        <p>{accountType}</p>
      </div>
      <img className="profilepicture" src={profilePictureURL} />
    </div>
  );
};

export default Profile;
