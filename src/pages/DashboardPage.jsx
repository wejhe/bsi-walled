import GreetingsLayout from "../layouts/GreetingsLayout";
import Greet from "../components/Greet";
import Profile from "../components/Profile";
import MainInfoLayout from "../layouts/MainInfoLayout";
import AccountNumber from "../components/AccountNumber";
import AccountInfo from "../components/AccountInfo";

const DashboardPage = () => {
  return (
    <>
      <GreetingsLayout>
        <Greet
          nickName="Muhammad"
        />
        <Profile
          accountName="Muhammad Kautsar Wijaya"
          accountType="Personal Account"
          profilePictureURL="https://cdn.discordapp.com/attachments/1351453135067156503/1351453591701032962/FOTO_ID_CARD_-_Copy.jpg?ex=67da6ebd&is=67d91d3d&hm=6ecddd15aa9a60c954129ced295fe871ac854500bc43541d7e718379c3204737&"
        />
      </GreetingsLayout>
      <MainInfoLayout>
        <AccountNumber
          accountNumber="7285467364"
        />
        <AccountInfo />
      </MainInfoLayout>
    </>
  );
};

export default DashboardPage;
