import { useEffect, useState } from "react";
import api from "../utils/api";

const Greet = () => {
  const [nickName, setNickName] = useState(null);

  useEffect(() => {
    const fetchGreetData = async () => {
      try {
        const response = await api.get("/api/users/me");
        setNickName(response.data.data.user.fullName.split(" ")[0]);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchGreetData();
  }, []);

  return (
    <div>
      <h1 className="greet">Hello, {nickName}!</h1>
      <p className="subgreet">
        Check all your incoming and outgoing transactions here
      </p>
    </div>
  );
};

export default Greet;
