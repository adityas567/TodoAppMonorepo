import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthActions } from '../actions/auth.actions';

const AUTH_KEY = 'auth_user';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ username, password }) =>
        this.http.get<{ username: string; password: string }[]>('assets/users.json').pipe(
          map(users => {
            const found = users.find(
              u => u.username === username && u.password === password
            );
            if (found) {
              return AuthActions.loginSuccess({ username: found.username });
            }
            return AuthActions.loginFailure({ error: 'User not found' });
          }),
          catchError(() =>
            of(AuthActions.loginFailure({ error: 'Could not load users' }))
          )
        )
      )
    )
  );

  // save username to localStorage on success
  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ username }) => {
        localStorage.setItem(AUTH_KEY, username);
      })
    ),
    { dispatch: false }
  );

  // clear localStorage on logout
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem(AUTH_KEY);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}
}