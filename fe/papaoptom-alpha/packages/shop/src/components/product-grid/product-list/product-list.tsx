import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  ProductsRow,
  ProductsCol,
  ButtonWrapper,
  LoaderWrapper,
  LoaderItem,
  ProductCardWrapper,
} from './product-list.style';
import { CURRENCY, CURRENCY_UAH } from 'utils/constant';
import { useQuery, NetworkStatus } from '@apollo/client';
import Placeholder from 'components/placeholder/placeholder';
import Fade from 'react-reveal/Fade';
import NoResultFound from 'components/no-result/no-result';
import { FormattedMessage } from 'react-intl';
import { Button } from 'components/button/loadmore-button';
import { GET_PRODUCTS } from 'graphql/query/products.query';
import { GET_SHOES } from 'graphql/query/shoes.query';

const ErrorMessage = dynamic(() =>
  import('components/error-message/error-message')
);

const GeneralCard = dynamic(
  import('components/product-card/product-card-one/product-card-one')
);

type ProductsProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  fetchLimit?: number;
  loadMore?: boolean;
  type?: string;
};
export const Products: React.FC<ProductsProps> = ({
  deviceType,
  fetchLimit = 20,
  loadMore = true,
  type,
}) => {
  const router = useRouter();
  // const queryResult = useQuery(
  //   GET_PRODUCTS,
  //   {
  //     variables: {
  //       type: type,
  //       text: router.query.text,
  //       category: router.query.category,
  //       offset: 0,
  //       limit: fetchLimit,
  //     },
  //     notifyOnNetworkStatusChange: true,
  //   }
  // );
  // console.log(queryResult);
  // const { data, error, loading, fetchMore, networkStatus } = queryResult;
  // const loadingMore = networkStatus === NetworkStatus.fetchMore;

  const queryResult = useQuery(
    GET_SHOES,
    {
      variables: {
        supplier: "Raffelli",
        pageSize: 25,
        pageNumber: 1,
      }
    }
  );
  // console.log(queryResult);
  const { data, error, loading, fetchMore, networkStatus } = queryResult;
  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  if (error) return <ErrorMessage message={error.message} />;
  if (loading && !loadingMore) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <Placeholder uniqueKey="1" />
        </LoaderItem>
        <LoaderItem>
          <Placeholder uniqueKey="2" />
        </LoaderItem>
        <LoaderItem>
          <Placeholder uniqueKey="3" />
        </LoaderItem>
      </LoaderWrapper>
    );
  }

  if (!data || !data.filterProduct || data.filterProduct.data.length === 0) {
    return <NoResultFound />;
  }
  const handleLoadMore = () => {
    const fetchLimit = data.filterProduct.pageSize;
    fetchMore({
      variables: {
        pageNumber: Number(data.filterProduct.nextPage),
        pageSize: fetchLimit,
      },
    });
  };

  const renderCard = (productType, props) => {
    console.log(props);
    const {name, characteristics, category, brand} = props;
    const {
      description,
      photo1,
      saleCurrency,
      sizeChart,
      sellingPrice,
      oldSellingPrice,
      totalSellingPrice,
      totalOldSellingPrice,
      discountInPercent,
    } = characteristics;

    return (
      // <GeneralCard
      //   title={props.title}
      //   description={props.description}
      //   image={props.image}
      //   weight={props.unit}
      //   currency={CURRENCY}
      //   price={props.price}
      //   salePrice={props.salePrice}
      //   discountInPercent={props.discountInPercent}
      //   data={props}
      //   deviceType={deviceType}
      // />
      <GeneralCard
        title={`${name} ${category?.name ?? ""} ${brand?.name ?? ""}`}
        description={description}
        image={photo1}
        weight={sizeChart}
        currency={CURRENCY_UAH}
        price={totalOldSellingPrice}
        salePrice={totalSellingPrice}
        discountInPercent={discountInPercent}
        data={props}
        deviceType={deviceType}
      />
    );
  };
  return (
    <>
      <ProductsRow>
        {data.filterProduct.data.map((item: any, index: number) => (
          <ProductsCol
            key={index}
          >
            <ProductCardWrapper>
              <Fade
                duration={800}
                delay={index * 10}
                style={{ height: '100%' }}
              >
                {renderCard(type, item)}
              </Fade>
            </ProductCardWrapper>
          </ProductsCol>
        ))}
      </ProductsRow>
      {loadMore && (
        <ButtonWrapper>
          <Button
            onClick={handleLoadMore}
            loading={loadingMore}
            variant="secondary"
            style={{
              fontSize: 14,
            }}
            border="1px solid #f1f1f1"
          >
            <FormattedMessage id="loadMoreButton" defaultMessage="Load More" />
          </Button>
        </ButtonWrapper>
      )}
    </>
  );
};
export default Products;
