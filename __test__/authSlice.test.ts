import authReducer, {
  login,
  register,
  logout,
  checkAuth,
  updateUser
} from '../src/services/features/authSlice';
import { TUser } from '../src/utils/types';

const mockUser: TUser = {
  email: 'cosmo@stellar.burgers',
  name: 'Космо Бургер'
};

describe('authSlice — полное покрытие async-операций', () => {
  const initialState = {
    user: null,
    isAuth: false,
    isLoading: false,
    error: null
  };

  describe('login', () => {
    it('pending → isLoading = true, error = null', () => {
      const state = authReducer(initialState, { type: login.pending.type });
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('fulfilled → сохраняет пользователя, isAuth = true', () => {
      const state = authReducer(initialState, {
        type: login.fulfilled.type,
        payload: mockUser
      });
      expect(state.user).toEqual(mockUser);
      expect(state.isAuth).toBe(true);
      expect(state.isLoading).toBe(false);
    });

    it('rejected → сохраняет ошибку, isLoading = false', () => {
      const state = authReducer(initialState, {
        type: login.rejected.type,
        error: { message: 'Неверный пароль' }
      });
      expect(state.error).toBe('Неверный пароль');
      expect(state.isLoading).toBe(false);
      expect(state.isAuth).toBe(false);
    });
  });

  describe('register', () => {
    it('fulfilled → регистрирует пользователя, isAuth = true', () => {
      const state = authReducer(initialState, {
        type: register.fulfilled.type,
        payload: mockUser
      });
      expect(state.user).toEqual(mockUser);
      expect(state.isAuth).toBe(true);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('logout', () => {
    const loggedInState = {
      ...initialState,
      user: mockUser,
      isAuth: true
    };

    it('fulfilled → очищает пользователя и isAuth', () => {
      const state = authReducer(loggedInState, { type: logout.fulfilled.type });
      expect(state.user).toBe(null);
      expect(state.isAuth).toBe(false);
    });
  });

  describe('checkAuth', () => {
    it('fulfilled → восстанавливает авторизацию', () => {
      const state = authReducer(initialState, {
        type: checkAuth.fulfilled.type,
        payload: mockUser
      });
      expect(state.user).toEqual(mockUser);
      expect(state.isAuth).toBe(true);
    });

    it('rejected → сбрасывает авторизацию', () => {
      const state = authReducer(
        { ...initialState, isAuth: true, user: mockUser },
        { type: checkAuth.rejected.type }
      );
      expect(state.isAuth).toBe(false);
      expect(state.user).toBe(null);
    });
  });

  describe('updateUser', () => {
    const currentUserState = {
      ...initialState,
      user: mockUser,
      isAuth: true
    };

    const updatedUser = {
      email: 'new@stellar.burgers',
      name: 'Обновлённый Космо'
    };

    it('pending → isLoading = true, error = null', () => {
      const state = authReducer(currentUserState, {
        type: updateUser.pending.type
      });
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('fulfilled → обновляет пользователя', () => {
      const state = authReducer(currentUserState, {
        type: updateUser.fulfilled.type,
        payload: updatedUser
      });
      expect(state.user).toEqual(updatedUser);
      expect(state.isAuth).toBe(true);
      expect(state.isLoading).toBe(false);
    });

    it('rejected → сохраняет ошибку', () => {
      const state = authReducer(currentUserState, {
        type: updateUser.rejected.type,
        error: { message: 'Email уже занят' }
      });
      expect(state.error).toBe('Email уже занят');
      expect(state.isLoading).toBe(false);
    });
  });
});
