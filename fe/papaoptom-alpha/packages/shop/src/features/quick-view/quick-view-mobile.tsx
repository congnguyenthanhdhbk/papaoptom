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
import {ProductsRow} from "../../assets/styles/pages.style";

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
    description,
    categories,
    characteristics,
    brand,
    id,
  } = modalProps;
  console.log("model props::", JSON.stringify(modalProps));
  const {
    steamInBox,
    sizeChart,
    season,
    outsoleMaterial,
    productMaterial,
    color,
    totalOldSellingPrice,
    totalSellingPrice,
    photo1,
    discountInPercent
  } = characteristics;

  const gallery = [{ url: photo1 } , { url: photo1 }, { url: photo1 }, { url: photo1 }];
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

  // @ts-ignore
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

              {/*<ProductWeight>{sizeChart ?? '36 - 40'}</ProductWeight>*/}
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
              <ProductsRow>
                <b>Пар в ящике</b>: {steamInBox ?? 'обновление'}
              </ProductsRow>
              <ProductsRow>
                Размерная сетка: {sizeChart ?? 'обновление'}
              </ProductsRow>
              <ProductsRow>
                Сезон: {season ?? 'обновление'}
              </ProductsRow>
              <ProductsRow>
                Бренд: {brand?.name ?? "обновление"}
              </ProductsRow>
              <ProductsRow>
                Материал подошвы: {outsoleMaterial ?? "обновление"}
              </ProductsRow>
              <ProductsRow>
                Материал изделия: {productMaterial ?? "обновление"}
              </ProductsRow>
              <hr/>
              <ProductCartWrapper>
                <ProductsRow>
                  <ProductTitlePriceWrapper>
                    <ProductTitle>{"Цена за пару"}</ProductTitle>
                  </ProductTitlePriceWrapper>:
                  <ProductPriceWrapper>
                    {discountInPercent ? (
                        <SalePrice>
                          {CURRENCY_UAH}
                          {totalOldSellingPrice}
                        </SalePrice>
                    ) : null}
                  </ProductPriceWrapper>
                </ProductsRow>

                <ProductsRow>
                  <ProductTitlePriceWrapper>
                    <ProductTitle>{"Цена за ящ. / Цена за пару"}</ProductTitle>
                  </ProductTitlePriceWrapper>:
                  <ProductPriceWrapper>
                    <ProductPrice>
                      {totalSellingPrice ?? totalOldSellingPrice} {CURRENCY_UAH}
                    </ProductPrice>
                  </ProductPriceWrapper>
                </ProductsRow>
                {/*<ProductPriceWrapper>*/}
                {/*  <ProductPrice>*/}
                {/*    {totalSellingPrice ?? totalOldSellingPrice} {CURRENCY_UAH}*/}
                {/*  </ProductPrice>*/}

                {/*  {discountInPercent ? (*/}
                {/*    <SalePrice>*/}
                {/*      {CURRENCY_UAH}*/}
                {/*      {totalOldSellingPrice}*/}
                {/*    </SalePrice>*/}
                {/*  ) : null}*/}
                {/*</ProductPriceWrapper>*/}

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
