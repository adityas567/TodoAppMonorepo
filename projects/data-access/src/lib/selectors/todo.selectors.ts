import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from '../reducer/todo.reducer';


export const selectTodoState = createFeatureSelector<TodoState>('todos');


export const selectAllTodos = createSelector(
  selectTodoState,
  (state) => state.todos
);


export const selectPendingTodos = createSelector(
  selectAllTodos,
  (todos) => todos.filter(t => !t.completed)
);


export const selectCompletedTodos = createSelector(
  selectAllTodos,
  (todos) => todos.filter(t => t.completed)
);


export const selectTodoStats = createSelector(
  selectAllTodos,
  (todos) => ({
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length
  })
);