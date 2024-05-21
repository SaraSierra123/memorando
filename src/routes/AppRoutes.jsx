import { useRoutes } from "react-router-dom";

import Login from "../Login";
import { FlashCards } from "../componetns/FlashCards/FlashCards";
import { Layout } from "../componetns/Layout/Layout";

const AppRoutes = () => {
  if (localStorage.getItem("login") == "logueado") {
    return useRoutes([
      {
        path: "/",
        element: (
          <Layout>
            <FlashCards />
          </Layout>
        ),
      },
    ]);
  } else {
    return useRoutes([{ path: "/", element: <Login /> }]);
  }
};

export default AppRoutes;
