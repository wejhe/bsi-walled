import { useEffect, useState } from "react";
import api from "../utils/api";

const Profile = () => {
  const [fullName, setFullName] = useState(null);
  const [accountType, setAccountType] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/api/users/me");
        setFullName(response.data.data.user.fullName);
        const accountType = response.data.data.wallet.type;
        setAccountType(accountType.charAt(0).toUpperCase() + accountType.slice(1).toLowerCase() + " account");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="profile">
      <div className="profiledata">
        <p>
          <strong>{fullName}</strong>
        </p>
        <p className="account-type">{accountType}</p>
      </div>
      <img
        className="profilepicture"
        src="https://media.istockphoto.com/id/588348500/id/vektor/gambar-profil-avatar-pria-vektor.jpg?s=612x612&w=0&k=20&c=qFWeuD8Hv1VfvFI1ihgKc5cdtrr-486tyxAzHkcFxhY="
      />
    </div>
  );
};

export default Profile;
