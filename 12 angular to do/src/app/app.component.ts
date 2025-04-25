import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  text: string;
  isEditing: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  newTask = '';
  tasks: Task[] = [];

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ text: this.newTask.trim(), isEditing: false });
      this.newTask = '';
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  editTask(index: number) {
    this.tasks[index].isEditing = true;
  }

  saveTask(index: number) {
    this.tasks[index].isEditing = false;
  }
}
