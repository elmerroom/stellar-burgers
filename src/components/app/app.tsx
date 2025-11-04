import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { Provider } from 'react-redux';
import '../../index.css';
import styles from './app.module.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  BrowserRouter,
  Routes
} from 'react-router-dom';
import store, { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { getIngredientsApi } from '../../utils/burger-api';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { useEffect } from 'react';
import { getIngredients } from '../../services/features/ingredientsSlice';

function cons() {
  console.log('hi');
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Dispatching getIngredients...');
    dispatch(getIngredients());
  });
  return (
    <div className={styles.app}>
      <AppHeader />
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='feed' element={<Feed />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route path='*' element={<NotFound404 />} />
          <Route
            path='/feed/:number'
            element={
              <Modal title='Ololo' onClose={cons}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Ololo' onClose={cons}>
                {' '}
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Ololo' onClose={cons}>
                {' '}
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// export const router = createBrowserRouter(
//   createRoutesFromElements(

//   )
// )

export default App;
