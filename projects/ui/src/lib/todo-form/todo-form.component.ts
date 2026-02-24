import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  @Output() addTodo = new EventEmitter<string>();

  taskControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1)
  ]);

  submit() {
    if (this.taskControl.invalid) return;
    this.addTodo.emit(this.taskControl.value!.trim());
    this.taskControl.reset();
  }
}