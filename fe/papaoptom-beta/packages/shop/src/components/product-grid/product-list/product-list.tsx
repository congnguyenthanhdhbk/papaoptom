import { NetworkStatus, useQuery } from "@apollo/client";
import { Button } from "components/button/loadmore-button";
import NoResultFound from "components/no-result/no-result";
import Placeholder from "components/placeholder/placeholder";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import Fade from "react-reveal/Fade";
import { CURRENCY_UAH } from "utils/constant";
import { GET_SHOES } from "../../../graphql/query/shoes.query";
import {
  ButtonWrapper, LoaderItem, LoaderWrapper, ProductCardWrapper, ProductsCol, ProductsRow
} from "./product-list.style";

const ErrorMessage = dynamic(
  () => import("components/error-message/error-message")
);

const GeneralCard = dynamic(
  import("components/product-card/product-card-one/product-card-one")
);

type ProductsProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  fetchLimit?: number;
  loadMore?: boolean;
};
export const Products: React.FC<ProductsProps> = ({
  deviceType,
  fetchLimit = 20,
  loadMore = true,
}) => {
  const router = useRouter();
  const { data, error, loading, fetchMore, networkStatus } = useQuery(
    GET_SHOES,
    {
      variables: {
        pageSize: fetchLimit,
        pageNumber: 1,
      },
      notifyOnNetworkStatusChange: true,
    }
  );
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
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const {
          pageNumber,
          pageSize,
          message,
          code,
          totalDocs,
          totalPages,
          hasPrevPage,
          hasNextPage,
          prevPage,
          nextPage,
          data,
        } = fetchMoreResult?.filterProduct;
        const newData = [...previousResult?.filterProduct?.data, ...data];
        // console.log("Array after::", JSON.stringify(newData));

        return {
          ...previousResult,
          filterProduct: {
            data: newData,
            pageNumber,
            pageSize,
            message,
            code,
            totalDocs,
            totalPages,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
          },
        };
      },
    });
  };

  const renderCard = (props: any) => {
    console.log(props);
    const { name, characteristics, category, brand, vcode } = props;
    const {
      photo1,
      saleCurrency,
      sizeChart,
      sellingPrice,
      oldSellingPrice,
      totalSellingPrice,
      totalOldSellingPrice,
      discountInPercent,
      steamInBox
    } = characteristics;

    return (
      <GeneralCard
        image={photo1}
        title={`${name} ${category?.name ?? ""} ${brand?.name ?? ""} ${vcode}`}
        sizeChart={sizeChart}
        pairsInBox={steamInBox}
        currency={CURRENCY_UAH}
        pricePerPair={oldSellingPrice}
        pricePerBox={totalOldSellingPrice}
        salePricePerBox={totalSellingPrice}
        discountInPercent={discountInPercent}
        data={props}
        deviceType={deviceType}
      />
    );
  };


  return (
    <>
      <ProductsRow>
        {data?.filterProduct?.data.map((item: any, index: number) => (
          <ProductsCol key={index}          >
            <ProductCardWrapper>
              <Fade
                duration={800}
                delay={index * 10}
                style={{ height: "100%" }}
              >
                {renderCard(item)}
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
