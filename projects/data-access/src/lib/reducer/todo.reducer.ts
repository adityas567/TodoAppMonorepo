import { createReducer, on } from '@ngrx/store';
import { Todo } from 'shared';
import { TodoActions } from '../actions/todo.actions';

export interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
  todos: []
};

export const todoReducer = createReducer(
  initialState,

  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos
  })),

  on(TodoActions.addTodo, (state, { text }) => ({
    ...state,
    todos: [
      { id: Date.now(), text, completed: false },
      ...state.todos
    ]
  })),

  on(TodoActions.editTodo, (state, { id, text }) => ({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, text } : todo
    )
  })),

  on(TodoActions.deleteTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id)
  })),

  on(TodoActions.toggleTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  }))
);