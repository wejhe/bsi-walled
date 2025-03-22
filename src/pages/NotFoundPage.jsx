import { Helmet } from "react-helmet";
import BodyLayout from "../layouts/BodyLayout";

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>BSI Walled &ndash; Not Found</title>
      </Helmet>
      <BodyLayout>
        <h1>404 : PAGE NOT FOUND</h1>
      </BodyLayout>
    </>
  );
};

export default NotFoundPage;
