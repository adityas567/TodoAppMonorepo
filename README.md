An Angular 14 monorepo todo application with NgRx state management and multi-language support.

## Setup Steps
Prerequisites

Node.js v16+
Angular CLI 14

npm install

# Run

# Terminal 1 — Login App
ng serve login-app --port 4200

# Terminal 2 — Todo App
ng serve todo-app --port 4201

Login credentials: admin / admin123 or user / user123


## NgRx Flow
Component dispatches Action
        ↓

Reducer updates state immutably
        ↓

Effect handles side effects (localStorage read/write)
        ↓

Selector emits new state to component
        ↓

Template re-renders via async pipe

On app boot, loadTodos action is dispatched. The Effect reads from localStorage via TodoStorageService and dispatches loadTodosSuccess to populate the store. After every add, edit, delete or toggle, the Effect saves the updated list back to localStorage.
Auth follows the same pattern — login action triggers an Effect that reads assets/users.json, dispatches loginSuccess or loginFailure, and persists the session to localStorage.

## Translation Configuration

Uses @ngx-translate/core for runtime language switching (English, French, German).
Translation keys live in assets/i18n/en.json, fr.json, de.json:
json{ "ADD_BTN": "Add Task" }   // en.json
{ "ADD_BTN": "Ajouter" }    // fr.json
Templates use the translate pipe:
html{{ 'ADD_BTN' | translate }}
LanguageService in the shared library handles switching and persistence:
typescriptthis.languageService.init();
this.languageService.switchLanguage(lang)