import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
    newTodo = <Todo>{};
    todos: Todo[] = [];
    errorMessage: string;
    showTodoId: boolean;

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
                error => this.errorMessage = error,
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

        let response;
        this.todoService.addTodo(this.newTodo)
            .subscribe(
                data => response = data,
                error => this.errorMessage = error,
                () => {
                    this.todos.push(response);
                    this.initialTodo();
                }
            );
    }

    public updateTodo(todo, index): void {
        let response;
        this.todoService.updateTodo(todo)
            .subscribe(
                data => response = data,
                error => this.errorMessage = error,
                () => {
                    this.todos[index].complete = response.complete;
                }
            );
    }

    public deleteTodo(todo, index): void {
        this.todoService.deleteTodo(todo.id)
            .subscribe(
                data => { },
                error => this.errorMessage = error,
                () => {
                    this.todos.splice(index, 1);
                }
            );
    }

    showIdChanged(value: boolean): void {
        this.showTodoId = value;
    }

}
