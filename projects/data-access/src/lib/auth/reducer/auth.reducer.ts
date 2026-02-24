import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  error: string | null;
}

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  username: null,
  error: null
};

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.loginSuccess, (state, { username }) => ({
    ...state,
    isLoggedIn: true,
    username,
    error: null
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    username: null,
    error
  })),

  on(AuthActions.logout, () => ({
    ...initialAuthState
  }))
);