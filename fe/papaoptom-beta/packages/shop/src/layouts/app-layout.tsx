import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Sticky from "react-stickynode";
import { useAppState } from "contexts/app/app.provider";
import Header from "./header/header";
import { LayoutWrapper } from "./layout.style";
import { isCategoryPage } from "./is-home-page";
import Footer from "./footer";
const MobileHeader = dynamic(() => import("./header/mobile-header"), {
  ssr: false,
});

type LayoutProps = {
  className?: string;
  token?: string;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  className,
  children,
  // deviceType: { mobile, tablet, desktop },
  token,
}) => {
  const { query } = useRouter();
  const isSticky = useAppState("isSticky");

  const isHomePage = isCategoryPage(query.type);
  return (
    <LayoutWrapper className={`layoutWrapper ${className}`}>
      <Sticky enabled={isSticky} innerZ={1001}>
        <MobileHeader
          className={`${isSticky ? "sticky" : "sticky"} ${isHomePage ? "home" : ""} desktop`}
        />

        <Header
          className={`${isSticky ? "sticky" : "sticky"} ${isHomePage ? "home" : ""}`}
        />
      </Sticky>
      {children}
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
