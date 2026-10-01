import { Outlet } from 'react-router-dom'
import TopBar from './TopBar.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import SideTabs from './SideTabs.jsx'
import LeftTabs from './LeftTabs.jsx'
import BackgroundDecor from './BackgroundDecor.jsx'
import ScrollToTop from './ScrollToTop.jsx'

export default function Layout() {
  return (
    <div className="min-h-screen relative">
      <ScrollToTop />
      <BackgroundDecor />
      <TopBar />
      <Navbar />
      <Outlet />
      <Footer />
      <SideTabs />
      <LeftTabs />
    </div>
  )
}