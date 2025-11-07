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

import {
  AppHeader,
  Modal,
  OrderInfo,
  IngredientDetails,
  ProtectedRoute
} from '@components';
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
          <Route
            path='/login'
            element={
              <ProtectedRoute onlyUnAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute onlyUnAuth>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
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

export default App;
