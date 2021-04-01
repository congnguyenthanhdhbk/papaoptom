import React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { SEO } from 'components/seo';
import { Modal } from '@redq/reuse-modal';
import ProductSingleWrapper, {
  ProductSingleContainer,
} from 'assets/styles/product-single.style';
import {GET_PRODUCT_DETAILS, GET_PRODUCT_DETAILS_SHOES} from 'graphql/query/product.query';
import { initializeApollo } from 'utils/apollo';

const ProductDetails = dynamic(() =>
  import('components/product-details/product-details-one/product-details-one')
);

const CartPopUp = dynamic(() => import('features/carts/cart-popup'), {
  ssr: false,
});

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data: any;
  [key: string]: any;
};

const ProductPage: NextPage<Props> = ({ data, deviceType }) => {
  let content = (
    // <ProductDetails product={data.product} deviceType={deviceType} />
    <ProductDetails product={data.getProduct.data} deviceType={deviceType} />
  );
  return (
    <>
      <SEO
        title={`${data.getProduct.data.name} - Papaoptom`}
        // title={`${data.product.title} - Papaoptom`}
        // description={`${data.product.title} Details`}
        description={`${data.getProduct.data.description} Details`}
      />

      <Modal>
        <ProductSingleWrapper>
          <ProductSingleContainer>
            {content}
            <CartPopUp deviceType={deviceType} />
          </ProductSingleContainer>
        </ProductSingleWrapper>
      </Modal>
    </>
  );
};
export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();

  /*const { data } = await apolloClient.query({
    query: GET_PRODUCT_DETAILS,
    variables: {
      slug: params.slug,
    },
  });*/
  const { data } = await apolloClient.query({
    query: GET_PRODUCT_DETAILS_SHOES,
    variables: {
      slug: params.slug,
    },
  });

  console.log("Query data::", JSON.stringify(data));
  return {
    props: {
      data,
    },
  };
}
export default ProductPage;
