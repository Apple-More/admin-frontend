"use client";
import ContentAnimation from "@/components/layouts/content-animation";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import MainContainer from "@/components/layouts/main-container";
import Overlay from "@/components/layouts/overlay";
import ScrollToTop from "@/components/layouts/scroll-to-top";
import Setting from "@/components/layouts/setting";
import Sidebar from "@/components/layouts/sidebar";
import { protectRoute } from "../protectRoute";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* BEGIN MAIN CONTAINER */}
      <div className="relative">
        <Overlay />
        <ScrollToTop />

        {/* BEGIN APP SETTING LAUNCHER */}
        {/* <Setting /> */}
        {/* END APP SETTING LAUNCHER */}

        <MainContainer>
          {/* BEGIN SIDEBAR */}
          <Sidebar />
          {/* END SIDEBAR */}
          <div className="main-content flex min-h-screen flex-col">
            {/* BEGIN TOP NAVBAR */}
            <Header />
            {/* END TOP NAVBAR */}

            {/* BEGIN CONTENT AREA */}
            <ContentAnimation>{children}</ContentAnimation>
            {/* END CONTENT AREA */}

            {/* BEGIN FOOTER */}
            <Footer />
            {/* END FOOTER */}
          </div>
        </MainContainer>
      </div>
    </>
  );
}

// Wrap with `protectRoute` to protect all pages using this layout
export default protectRoute(DefaultLayout);
