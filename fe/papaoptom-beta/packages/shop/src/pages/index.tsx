import React from "react";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Modal } from "@redq/reuse-modal";
import Carousel from "components/carousel/carousel";

import {
  ContentSection,
  MainContentArea,
  MobileCarouselDropdown,
  OfferSection,
  SidebarSection,
} from "assets/styles/pages.style";
// Static Data Import Here
import { siteOffers } from "site-settings/site-offers";
import { sitePages } from "site-settings/site-pages";
import { SEO } from "components/seo";
import { useRefScroll } from "utils/use-ref-scroll";
import { initializeApollo } from "utils/apollo";
import { ModalProvider } from "contexts/modal/modal.provider";

const Sidebar = dynamic(() => import("layouts/sidebar/sidebar"));
const Products = dynamic(
  () => import("components/product-grid/product-list/product-list")
);
const CartPopUp = dynamic(() => import("features/carts/cart-popup"), {
  ssr: false,
});

const HomePage: React.FC<any> = ({ deviceType }) => {
  const { query } = useRouter();
  const { elRef: targetRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -110,
  });
  React.useEffect(() => {
    if (query.text || query.category) {
      scroll();
    }
  }, [query.text, query.category]);

  const page = sitePages.home;

  return (
    <>
      <SEO title={page?.page_title} description={page?.page_description} />
      <ModalProvider>
        <Modal>
          <OfferSection>
            <div style={{ margin: "5rem -10px" }}>
              <Carousel deviceType={deviceType} data={siteOffers} />
            </div>
          </OfferSection>
          <MobileCarouselDropdown>
            <Sidebar deviceType={deviceType} />
          </MobileCarouselDropdown>
          <MainContentArea>
            <SidebarSection>
              <Sidebar deviceType={deviceType} />
            </SidebarSection>
            <ContentSection>
              <div ref={targetRef}>
                <Products
                  type={PAGE_TYPE}
                  deviceType={deviceType}
                  fetchLimit={20}
                />
              </div>
            </ContentSection>
          </MainContentArea>
          <CartPopUp deviceType={deviceType} />
        </Modal>
      </ModalProvider>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_SHOES,
    variables: {
      pageSize: 20,
      pageNumber: 1,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
};

export default HomePage;
