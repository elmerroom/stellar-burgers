import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import {
  getAllOrdersSelector,
  getAllOrders
} from '../../services/features/orderSlice';
import { useSelector, useDispatch } from '../../services/store';
import { useEffect } from 'react';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getAllOrdersSelector);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getAllOrders());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
