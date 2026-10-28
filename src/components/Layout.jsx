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
      {/* Keyboard / screen-reader users can jump past the header and menu. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]
                   focus:px-4 focus:py-2 focus:rounded-full focus:bg-navy-800 focus:text-white focus:text-sm"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <BackgroundDecor />
      <TopBar />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      {/* Phones: the Events / Enquire Now pills and the chat bubble float over
          the bottom edge, so leave room for them under the footer. */}
      <div className="h-20 sm:hidden" aria-hidden="true" />
      <SideTabs />
      <LeftTabs />
    </div>
  )
}