import { Outlet } from "react-router-dom";

import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatBot from "./ChatBot";
import EnquireNow from "./EnquireNow";


export default function Layout() {
  return (
    <>
      <TopBar />
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
      <ChatBot />
      <EnquireNow />
      
    </>
  );
}