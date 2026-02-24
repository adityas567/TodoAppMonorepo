import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { todoReducer } from './reducer/todo.reducer';
import { TodoEffects } from './effects/todo.effects';
import { DataAccessComponent } from './data-access.component';
import { authReducer } from './auth/reducer/auth.reducer';
import { AuthEffects } from './auth/effects/auth.effects';


@NgModule({
  declarations: [
    DataAccessComponent
  ],
  imports: [
    StoreModule.forFeature('todos', todoReducer),
    EffectsModule.forFeature([TodoEffects]),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: [
    DataAccessComponent
  ]
})
export class DataAccessModule { }
