import { Outlet } from "react-router-dom";
import Header from "./home/Header.jsx";
import Footer from "./home/Footer.jsx";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

