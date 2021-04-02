// product card for general
import dynamic from "next/dynamic";
import React from "react";
import Image from "components/image/image";
import { Button } from "components/button/button";
import {
  ProductCardWrapper,
  ProductImageWrapper,
  ProductInfo,
  DiscountPercent,
  ButtonText,
} from "../product-card.style";
import { useCart } from "contexts/cart/use-cart";
import { Counter } from "components/counter/counter";
import { cartAnimation } from "utils/cart-animation";
import { FormattedMessage } from "react-intl";
import { CartIcon } from "assets/icons/CartIcon";
import { useModal } from "contexts/modal/use-modal";
import { useRouter } from "next/router";
const QuickViewMobile = dynamic(() => import("features/quick-view/quick-view-mobile"));

type ProductCardProps = {
  image: any;
  title: string;
  sizeChart: string;
  pairsInBox: number;
  currency: string;
  pricePerPair: number;
  pricePerBox: number;
  salePricePerBox: number;
  discountInPercent?: number;
  data: any;
  onChange?: (e: any) => void;
  increment?: (e: any) => void;
  decrement?: (e: any) => void;
  addToCart?: any;
  updateCart?: any;
  value?: any;
  deviceType?: any;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  sizeChart,
  pairsInBox,
  pricePerPair,
  pricePerBox,
  salePricePerBox,
  discountInPercent,
  addToCart,
  updateCart,
  value,
  currency,
  onChange,
  increment,
  decrement,
  data,
  deviceType,
  ...props
}) => {
  const router = useRouter();
  const [showModal, hideModal] = useModal(
    () => <QuickViewMobile modalProps={data} hideModal={hideModal} deviceType={deviceType} />,
    {
      onClose: () => {
        const { pathname, query, asPath } = router;
        const as = asPath;
        router.push(
          {
            pathname,
            query,
          },
          as,
          {
            shallow: true,
          },
        );
      },
    },
  );
  const { addItem, removeItem, getItem, isInCart } = useCart();
  const handleAddClick = (e) => {
    e.stopPropagation();
    addItem(data);
    if (!isInCart(data.id)) {
      cartAnimation(e);
    }
  };
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(data);
  };
  const handleQuickViewModal = () => {
    const { pathname, query } = router;
    const as = `/product/${data.slug}`;
    if (pathname === "/product/[slug]") {
      router.push(pathname, as);
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
      return;
    }
    showModal();
    router.push(
      {
        pathname,
        query,
      },
      {
        pathname: as,
      },
      {
        shallow: true,
      },
    );
  };

  return (
    <ProductCardWrapper onClick={handleQuickViewModal} className="product-card">
      <ProductImageWrapper>
        <Image url={image} className="product-image" style={{ position: "relative" }} alt={title} />
        {discountInPercent ? <DiscountPercent>{discountInPercent}%</DiscountPercent> : null}
      </ProductImageWrapper>
      <ProductInfo>
        <h3 className="product-title">{title}</h3>
        <div className="product-size">
          p.{sizeChart} / {pairsInBox} шт
        </div>
        <div className="product-meta">
          <div className="productPriceWrapper">
            <span className="product-price">
              <span className="label">
                <FormattedMessage id="priceOfPair" defaultMessage="Price of a pair" />:{" "}
              </span>
              <span className="value">
                {pricePerPair} {currency}
              </span>
            </span>
            <span className="product-price">
              <span className="label">
                <FormattedMessage id="priceOfBox" defaultMessage="Price of a box" />:{" "}
              </span>
              {discountInPercent ? (
                <span className="sale">
                  {pricePerBox}
                  {currency}
                </span>
              ) : null}{" "}
              <span className="value">
                {salePricePerBox ? salePricePerBox : pricePerBox} {currency}
              </span>
            </span>
          </div>
        </div>
        <div className="button-row">
          {!isInCart(data.id) ? (
            <Button className="cart-button" variant="secondary" borderRadius={100} onClick={handleAddClick}>
              <CartIcon mr={2} />
              <ButtonText>
                <FormattedMessage id="addCartButton" defaultMessage="Cart" />
              </ButtonText>
            </Button>
          ) : (
            <Counter
              value={getItem(data.id).quantity}
              onDecrement={handleRemoveClick}
              onIncrement={handleAddClick}
              // className="card-counter"
            />
          )}
        </div>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ProductCard;
