import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo, Language, LanguageService } from 'shared';
import {
  TodoActions,
  selectAllTodos,
  selectPendingTodos,
  selectCompletedTodos,
  selectTodoStats
} from 'data-access';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todos$!: Observable<Todo[]>;
  stats$!: Observable<{ total: number; completed: number; pending: number }>;

  languages: Language[];
  currentLang: Language;
  activeFilter: 'all' | 'pending' | 'done' = 'all';

  constructor(
    private store: Store,
    private languageService: LanguageService
  ) {
    this.languages = this.languageService.getSupportedLanguages();
    this.currentLang = this.languageService.getCurrentLanguage();
  }

  ngOnInit() {
    // check if token came from login-app via URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // save to this app's localStorage
      localStorage.setItem('auth_user', token);
      // clean URL — remove token from address bar
      window.history.replaceState({}, document.title, '/');
    }

    this.languageService.init();
    this.currentLang = this.languageService.getCurrentLanguage();
    this.store.dispatch(TodoActions.loadTodos());
    this.stats$ = this.store.select(selectTodoStats);
    this.setFilter('all');
  }

  setFilter(filter: 'all' | 'pending' | 'done') {
    this.activeFilter = filter;
    if (filter === 'all') this.todos$ = this.store.select(selectAllTodos);
    if (filter === 'pending') this.todos$ = this.store.select(selectPendingTodos);
    if (filter === 'done') this.todos$ = this.store.select(selectCompletedTodos);
  }

  switchLanguage(lang: Language) {
    this.currentLang = lang;
    this.languageService.switchLanguage(lang);
  }

  onAddTodo(text: string) {
    this.store.dispatch(TodoActions.addTodo({ text }));
  }

  onToggle(id: number) {
    this.store.dispatch(TodoActions.toggleTodo({ id }));
  }

  onEdit(event: { id: number; text: string }) {
    this.store.dispatch(TodoActions.editTodo(event));
  }

  onDelete(id: number) {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }

  logout() {
    localStorage.removeItem('auth_user');
    window.location.href = 'http://localhost:4200';
  }

}
