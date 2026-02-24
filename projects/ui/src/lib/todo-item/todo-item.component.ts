import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from 'shared';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<number>();
  @Output() edit = new EventEmitter<{ id: number; text: string }>();
  @Output() delete = new EventEmitter<number>();

  isEditing = false;
  editControl = new FormControl('', Validators.required);

  ngOnInit() {
    this.editControl.setValue(this.todo.text);
  }

  startEdit() {
    this.editControl.setValue(this.todo.text);
    this.isEditing = true;
  }

  saveEdit() {
    if (this.editControl.invalid) return;
    this.edit.emit({
      id: this.todo.id,
      text: this.editControl.value!.trim()
    });
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
    this.editControl.setValue(this.todo.text);
  }
}