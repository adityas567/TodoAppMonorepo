import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language, LANGUAGES, DEFAULT_LANGUAGE } from '../constants/language';

const LANG_STORAGE_KEY = 'preferred_lang';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate: TranslateService) {}

  init(): void {
    const saved = this.getSavedLanguage();
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
    this.translate.use(saved);
  }

  switchLanguage(lang: Language): void {
    this.translate.use(lang);
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  }

  getCurrentLanguage(): Language {
    return this.translate.currentLang as Language || DEFAULT_LANGUAGE;
  }

  getSupportedLanguages(): Language[] {
    return LANGUAGES;
  }

  private getSavedLanguage(): Language {
    const saved = localStorage.getItem(LANG_STORAGE_KEY) as Language;
    return LANGUAGES.includes(saved) ? saved : DEFAULT_LANGUAGE;
  }
}