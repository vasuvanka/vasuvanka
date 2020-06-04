import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmailPopupComponent } from '../email-popup/email-popup.component';
import { Todo } from '../../models/todo';
import { GithubService } from '../../core/services/github.service';

const TODO = 'TODO';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {
  todoForm: FormGroup = new FormGroup({
    todo: new FormControl('', [Validators.required])
  })
  disableEmail = true
  get todo(): AbstractControl {
    return this.todoForm.get('todo')
  }
  todos: Todo[] = []
  progress: number = 0
  bufferValue: number = 0

  constructor(
    private storageService: StorageService,
    private dialog: MatDialog,
    private githubService: GithubService) { }

  async ngOnInit(): Promise<void> {
    const todos = await this.storageService.getItem(TODO)
    this.todos = JSON.parse(todos) || []
    this.caliculateProgress()
  }

  async addTodo(task: string): Promise<void> {
    this.todos.unshift({ task, done: false, created: new Date(), completed: new Date() })
    this.todoForm.reset({})
    this.todoForm.markAsUntouched()
    this.caliculateProgress()
    await this.storageService.setItem(TODO, JSON.stringify(this.todos))
  }

  async markTodo(index: number, done: boolean): Promise<void> {
    this.todos[index].done = done;
    this.todos[index].completed = new Date()
    this.caliculateProgress()
    await this.storageService.setItem(TODO, JSON.stringify(this.todos))
  }

  async ngOnDestroy(): Promise<void> {
    await this.storageService.setItem(TODO, JSON.stringify(this.todos))
  }

  async removeTodo(index: number): Promise<void> {
    this.todos.splice(index, 1)
    this.caliculateProgress()
    await this.storageService.setItem(TODO, JSON.stringify(this.todos))
  }

  caliculateProgress() {
    const taskNo = this.todos.length
    const doneTaskNo = this.todos.filter(t => t.done).length
    const progressUnit = Math.round(100 / taskNo)
    this.progress = Math.round(progressUnit * doneTaskNo)
    this.bufferValue = this.progress / 2
  }
  async sendMail() {
    const dialogRef = this.dialog.open(EmailPopupComponent, {
      width: '500px',
      data: this.todos
    });
    const result = await dialogRef.afterClosed().toPromise();
    if (!result || !result.err) {
      console.log('email not sent')
    }
    try {
      const response = await this.githubService.sendMail({
        email: result.email,
        token: result.token,
        todos: this.todos
      })
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

}
