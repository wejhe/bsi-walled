import GreetingsLayout from "../layouts/GreetingsLayout";
import Greet from "../components/Greet";
import Profile from "../components/Profile";
import MainInfoLayout from "../layouts/MainInfoLayout";
import AccountNumber from "../components/AccountNumber";
import AccountInfo from "../components/AccountInfo";
import BodyLayout from "../layouts/BodyLayout";
import { Helmet } from "react-helmet";

const DashboardPage = () => {
  return (
    <>
      <Helmet>
        <title>BSI Walled &ndash; Dashboard</title>
      </Helmet>
      <BodyLayout>
        <GreetingsLayout>
          <Greet />
          <Profile />
        </GreetingsLayout>
        <MainInfoLayout>
          <AccountNumber />
          <AccountInfo />
        </MainInfoLayout>
      </BodyLayout>
    </>
  );
};

export default DashboardPage;
