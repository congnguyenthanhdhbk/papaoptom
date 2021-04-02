import React from 'react';
import { Counter } from 'components/counter/counter';
import { CloseIcon } from 'assets/icons/CloseIcon';
import {CURRENCY, CURRENCY_UAH} from 'utils/constant';
import {
  ItemBox,
  Image,
  Information,
  Name,
  Price,
  Weight,
  Total,
  RemoveButton,
} from './cart-item.style';

interface Props {
  data: any;
  onDecrement: () => void;
  onIncrement: () => void;
  onRemove: () => void;
}

export const CartItem: React.FC<Props> = ({
  data,
  onDecrement,
  onIncrement,
  onRemove,
}) => {
  // const { title, image, price, salePrice, unit, quantity } = data;
  const { name, quantity, characteristics, type, brand, color, vcode } = data;
  console.log("Product cart data::", JSON.stringify(data));
  const { totalOldSellingPrice, totalSellingPrice, steamInBox, photo1 } = characteristics;
  const title = `${name ?? ""} ${type ?? ""} ${brand?.name ?? ""} ${vcode ?? ""} ${color ?? ""}`;
  const image = photo1 ?? null;
  console.log("Photo::", image);
  const price = Number(totalOldSellingPrice) ?? 0;
  const salePrice = Number(totalSellingPrice) ?? 0;
  const unit = Number(steamInBox) ?? 1;
  const displayPrice = salePrice ? salePrice : price;
  return (
    <ItemBox>
      <Counter
        value={quantity}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        variant="lightVertical"
      />
      <Image src={image} />
      <Information>
        <Name>{title}</Name>
        <Price>
          {displayPrice}
            {CURRENCY_UAH}
        </Price>
        <Weight>
          {quantity} X {unit}
        </Weight>
      </Information>
      <Total>
        {CURRENCY}
        {(quantity * displayPrice).toFixed(2)}
      </Total>
      <RemoveButton onClick={onRemove}>
        <CloseIcon />
      </RemoveButton>
    </ItemBox>
  );
};
