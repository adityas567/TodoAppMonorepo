import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducer/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state) => state.isLoggedIn
);

export const selectUsername = createSelector(
  selectAuthState,
  (state) => state.username
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);