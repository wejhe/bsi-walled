import { Helmet } from "react-helmet";
import BodyLayout from "../layouts/BodyLayout";
import InfaqInputLayout from "../layouts/InfaqInputLayout";
import PageTitle from "../components/PageTitle";
import InfaqForm from "../components/InfaqForm";

const InfaqPage = () => {
  return (
    <>
      <Helmet>
        <title>BSI Walled &ndash; Infaq</title>
      </Helmet>
      <BodyLayout>
        <InfaqInputLayout>
          <InfaqForm />
        </InfaqInputLayout>
      </BodyLayout>
    </>
  );
};

export default InfaqPage;
