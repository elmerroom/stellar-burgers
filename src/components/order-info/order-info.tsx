import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import {
  getOrderByNumber,
  getModalOrder
} from '../../services/features/orderSlice';
import { getIngredientsSelector } from '../../services/features/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC<{ orderNumber?: string }> = ({ orderNumber }) => {
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();
  const orderData = useSelector(getModalOrder);

  useEffect(() => {
    if (number) {
      dispatch(getOrderByNumber(Number(number)));
    }
  }, [number, dispatch]);

  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return (
    <>
      {orderNumber && (
        <p
          className='undefined text text_type_main-large mt-10'
          style={{ textAlign: 'center' }}
        >
          #{orderNumber}
        </p>
      )}
      <OrderInfoUI orderInfo={orderInfo} />
    </>
  );
};
