import React from 'react';
import { Counter } from 'components/counter/counter';
import { CloseIcon } from 'assets/icons/CloseIcon';
import { CURRENCY } from 'utils/constant';
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
  const { name, photo1, quantity, characteristics, type, brand, color, vcode } = data;
  const { totalOldSellingPrice, totalSellingPrice, steamInBox } = characteristics;
  const title = `${name ?? ""} ${type ?? ""} ${brand?.name ?? ""} ${vcode ?? ""} ${color ?? ""}`;
  const image = photo1;
  const price = Number(totalSellingPrice) ?? 0;
  const salePrice = Number(totalOldSellingPrice) ?? 0;
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
          {CURRENCY}
          {displayPrice}
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
