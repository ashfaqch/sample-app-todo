import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
    todos: Todo[] = [];
    newTodo = <Todo>{};

    constructor(private todoService: TodoService) {
        this.initialTodo();
    }

    initialTodo(): void {
        Object.assign(this.newTodo, { id: null, title: '', complete: false});
    }

    ngOnInit() {
        this.loadTodoList();
    }

    loadTodoList(): void {
        this.todoService.getTodos()
            .subscribe(
                data => this.todos = data,
                error => { console.log(error); },
                () => { }
            );
    }

    public addTodo(): void {
        if (this.newTodo.title.trim().length === 0) {
            return;
        }

        if (this.todos.length === 0) {
            this.newTodo.id = 1;
        }

        this.todoService.addTodo(this.newTodo)
            .subscribe(
                data => { },
                error => { console.log(error); },
                () => {
                    this.loadTodoList();
                    this.initialTodo();
                }
            );
    }

    public updateTodo(todo): void {
        this.todoService.updateTodo(todo)
            .subscribe(
                data => { },
                error => { console.log(error); },
                () => {
                    this.loadTodoList();
                }
            );
    }

    public removeTodo(todo): void {
        this.todoService.deleteTodo(todo.id)
            .subscribe(
                data => { },
                error => { console.log(error); },
                () => {
                    this.loadTodoList();
                }
            );
    }

}
