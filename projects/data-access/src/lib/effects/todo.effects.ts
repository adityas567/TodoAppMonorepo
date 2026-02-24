import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { TodoActions } from '../actions/todo.actions';
import { selectAllTodos } from '../selectors/todo.selectors';
import { TodoState } from '../reducer/todo.reducer';
import { TodoStorageService } from '../services/todo-storage.service'

@Injectable()
export class TodoEffects {

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      map(() => {
        const todos = this.storageService.getTodos();
        return TodoActions.loadTodosSuccess({ todos });
      })
    )
  );

  persistTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        TodoActions.addTodo,
        TodoActions.editTodo,
        TodoActions.deleteTodo,
        TodoActions.toggleTodo
      ),
      withLatestFrom(this.store.select(selectAllTodos)),
      tap(([, todos]) => {
        this.storageService.saveTodos(todos);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<TodoState>,
    private storageService: TodoStorageService
  ) {}
}