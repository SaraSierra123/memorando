import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <>
          {/* <Links /> */}
          <AppRoutes />
        </>
      </BrowserRouter>
    </>
  );
};

export default App;
