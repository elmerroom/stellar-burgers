import { FC, useMemo, useEffect } from 'react';
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
  getConstructorIngredients,
  clearConstructor
} from '../../services/features/constructorSlice';
import { useNavigate } from 'react-router-dom';
import { getIsAuth } from '../../services/features/authSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bun = useSelector(getConstructorBun);
  const ingredients = useSelector(getConstructorIngredients);
  const orderModalData = useSelector(getOrderSelector);
  const orderRequest = useSelector(getOrderRequestSelector);
  const isAuth = useSelector(getIsAuth);

  const constructorItems = {
    bun,
    ingredients
  };

  const onOrderClick = () => {
    if (!bun) {
      return;
    } else if (!isAuth) {
      navigate('/login');
      return;
    }

    const ingredientsId = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    dispatch(createOrder(ingredientsId));
    dispatch(clearConstructor());
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

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
