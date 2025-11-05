import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrderSelector,
  getOrderRequestSelector,
  createOrder,
  clearOrder
} from '../../services/features/orderSlice';
import {
  getConstructorBun,
  getConstructorIngredients
} from '../../services/features/constructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const bun = useSelector(getConstructorBun);
  const ingredients = useSelector(getConstructorIngredients);
  const order = useSelector(getOrderSelector);
  const orderRequest = useSelector(getOrderRequestSelector);

  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };

  const constructorItems = {
    bun,
    ingredients
  };

  // const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    const ingredientsId = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    dispatch(createOrder(ingredientsId));
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
