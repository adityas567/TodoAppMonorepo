import { Injectable } from '@angular/core';
import { Todo } from 'shared';

const STORAGE_KEY = 'todos';

@Injectable({
  providedIn: 'root'
})
export class TodoStorageService {

  getTodos(): Todo[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  saveTodos(todos: Todo[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  clearTodos(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}