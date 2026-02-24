import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from 'shared';

export const TodoActions = createActionGroup({
  source: 'Todo',
  events: {
    'Load Todos': emptyProps(),
    'Load Todos Success': props<{ todos: Todo[] }>(),
    'Add Todo': props<{ text: string }>(),
    'Edit Todo': props<{ id: number; text: string }>(),
    'Delete Todo': props<{ id: number }>(),
    'Toggle Todo': props<{ id: number }>(),
  }
});