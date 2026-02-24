import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { AuthActions, selectIsLoggedIn, selectAuthError } from 'data-access';
import { LanguageService, Language } from 'shared';

const TODO_APP_URL = 'http://localhost:4201';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  error$: Observable<string | null>;
  languages: Language[];
  currentLang: Language;

  constructor(
    private store: Store,
    private languageService: LanguageService
  ) {
    this.languages = this.languageService.getSupportedLanguages();
    this.currentLang = this.languageService.getCurrentLanguage();
    this.error$ = this.store.select(selectAuthError);
  }

  ngOnInit() {
    this.languageService.init();
    this.currentLang = this.languageService.getCurrentLanguage();
  }

  onLogin(credentials: { username: string; password: string }) {
  this.store.dispatch(AuthActions.login(credentials));

  this.store.select(selectIsLoggedIn).pipe(
    filter(isLoggedIn => isLoggedIn === true),
    take(1)
  ).subscribe(() => {
    window.location.href = `http://localhost:4201?token=${credentials.username}`;
  });
}

  switchLanguage(lang: Language) {
    this.currentLang = lang;
    this.languageService.switchLanguage(lang);
  }
}