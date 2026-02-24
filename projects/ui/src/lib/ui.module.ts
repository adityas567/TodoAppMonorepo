import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { LoginFormComponent } from './login-form/login-form.component';

const MATERIAL_MODULES = [
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatListModule,
  MatFormFieldModule,
  MatCardModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    ...MATERIAL_MODULES
  ],
  declarations: [
    TodoFormComponent,
    TodoListComponent,
    TodoItemComponent,
    LoginFormComponent
  ],
  exports: [
    ...MATERIAL_MODULES,
    TodoFormComponent,
    TodoListComponent,
    TodoItemComponent,
    LoginFormComponent
  ]
})
export class UiModule {}