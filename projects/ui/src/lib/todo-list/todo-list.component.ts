import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'shared';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Output() toggle = new EventEmitter<number>();
  @Output() edit = new EventEmitter<{ id: number; text: string }>();
  @Output() delete = new EventEmitter<number>();

  trackById(index: number, todo: Todo): number {
    return todo.id;
  }
}