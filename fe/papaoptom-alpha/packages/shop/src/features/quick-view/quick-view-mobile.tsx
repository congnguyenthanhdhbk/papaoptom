import React from 'react';
import Router from 'next/router';
// import { closeModal } from '@redq/reuse-modal';
import { Button } from 'components/button/button';
import {
  QuickViewWrapper,
  ProductDetailsWrapper,
  ProductPreview,
  DiscountPercent,
  ProductInfoWrapper,
  ProductInfo,
  ProductTitlePriceWrapper,
  ProductTitle,
  ProductWeight,
  ProductDescription,
  ButtonText,
  ProductMeta,
  ProductCartWrapper,
  ProductPriceWrapper,
  ProductPrice,
  SalePrice,
  ProductCartBtn,
  MetaSingle,
  MetaItem,
  ModalClose,
} from './quick-view.style';
import { CloseIcon } from 'assets/icons/CloseIcon';
import { CartIcon } from 'assets/icons/CartIcon';
import {CURRENCY, CURRENCY_UAH} from 'utils/constant';

import ReadMore from 'components/truncate/truncate';
import CarouselWithCustomDots from 'components/multi-carousel/multi-carousel';
import { useLocale } from 'contexts/language/language.provider';
import { useCart } from 'contexts/cart/use-cart';
import { Counter } from 'components/counter/counter';
import { FormattedMessage } from 'react-intl';

type QuickViewProps = {
  modalProps: any;
  onModalClose?: any;
  hideModal: () => void;
  deviceType: any;
};

const QuickViewMobile: React.FunctionComponent<QuickViewProps> = ({
  modalProps,
  onModalClose,
  hideModal,
  deviceType,
}) => {
  const { addItem, removeItem, isInCart, getItem } = useCart();
  // const {
  //   id,
  //   type,
  //   title,
  //   unit,
  //   price,
  //   discountInPercent,
  //   salePrice,
  //   description,
  //   gallery,
  //   categories,
  // } = modalProps;

  const {
    name,
    type,
    vcode,
    quantity,
    discountInPercent,
    description,
    categories,
    characteristics,
    brand,
    id,
  } = modalProps;
  const {
    steamInBox,
    sizeChart,
    season,
    outsoleMaterial,
    productMaterial,
    color,
    gallery,
    totalOldSellingPrice,
    totalSellingPrice
  } = characteristics;

  const { isRtl } = useLocale();

  const handleAddClick = (e: any) => {
    e.stopPropagation();
    addItem(modalProps);
  };

  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItem(modalProps);
  };
  function onCategoryClick(slug) {
    Router.push({
      pathname: `/${type.toLowerCase()}`,
      query: { category: slug },
    }).then(() => window.scrollTo(0, 0));
    hideModal();
  }

  return (
    <>
      {/* <ModalClose onClick={onModalClose}>
        <CloseIcon />
      </ModalClose> */}
      <QuickViewWrapper className='quick-view-mobile-wrapper'>
        <ProductDetailsWrapper className='product-card' dir='ltr'>
          {!isRtl && (
            <ProductPreview>
              <CarouselWithCustomDots items={gallery} deviceType={deviceType} />
              {!!discountInPercent && (
                <DiscountPercent>{discountInPercent}%</DiscountPercent>
              )}
            </ProductPreview>
          )}
          <ProductInfoWrapper dir={isRtl ? 'rtl' : 'ltr'}>
            <ProductInfo>
              <ProductTitlePriceWrapper>
                <ProductTitle>{`${name ?? ""} ${type ?? ""} ${brand?.name ?? ""} ${vcode ?? ""} ${color ?? ""}`}</ProductTitle>
              </ProductTitlePriceWrapper>

              <ProductWeight>{sizeChart}</ProductWeight>
              <ProductDescription>
                <ReadMore character={600}>{description}</ReadMore>
              </ProductDescription>

              <ProductMeta>
                <MetaSingle>
                  {categories
                    ? categories.map((item: any) => (
                        <MetaItem
                          onClick={() => onCategoryClick(item.slug)}
                          key={item.id}
                        >
                          {item.title}
                        </MetaItem>
                      ))
                    : ''}
                </MetaSingle>
              </ProductMeta>

              <ProductCartWrapper>
                <ProductPriceWrapper>
                  <ProductPrice>
                    {CURRENCY_UAH}
                    {totalOldSellingPrice ? totalOldSellingPrice : totalSellingPrice}
                  </ProductPrice>

                  {discountInPercent ? (
                    <SalePrice>
                      {CURRENCY_UAH}
                      {totalSellingPrice}
                    </SalePrice>
                  ) : null}
                </ProductPriceWrapper>

                <ProductCartBtn>
                  {!isInCart(id) ? (
                    <Button
                      className='cart-button'
                      variant='secondary'
                      borderRadius={100}
                      onClick={handleAddClick}
                    >
                      <CartIcon mr={2} />
                      <ButtonText>
                        <FormattedMessage
                          id='addCartButton'
                          defaultMessage='Cart'
                        />
                      </ButtonText>
                    </Button>
                  ) : (
                    <Counter
                      value={getItem(id).quantity}
                      onDecrement={handleRemoveClick}
                      onIncrement={handleAddClick}
                    />
                  )}
                </ProductCartBtn>
              </ProductCartWrapper>
            </ProductInfo>
          </ProductInfoWrapper>

          {isRtl && (
            <ProductPreview>
              <CarouselWithCustomDots items={gallery} deviceType={deviceType} />
              {!!discountInPercent && (
                <DiscountPercent>{discountInPercent}%</DiscountPercent>
              )}
            </ProductPreview>
          )}
        </ProductDetailsWrapper>
      </QuickViewWrapper>
    </>
  );
};

export default QuickViewMobile;
