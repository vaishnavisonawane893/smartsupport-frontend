import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isStaffRoute = location.pathname.startsWith("/staff");

  const hideLayout = isAdminRoute || isStaffRoute;

  return (
    <>
      {!hideLayout && <Navbar />}

      <div className={hideLayout ? "" : "pt-20"}>
        <AppRoutes />
      </div>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
