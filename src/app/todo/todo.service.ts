import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Todo } from './todo';

@Injectable()
export class TodoService {
    private todosUrl = 'api/todos';

    constructor(private http: HttpClient) { }

    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.todosUrl)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    addTodo(todo: Todo): Observable<Todo> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<Todo>(this.todosUrl, todo, { headers: headers })
            .pipe(
                tap(data => console.log('addTodo: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    updateTodo(todo: Todo): Observable<Todo> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.todosUrl}/${todo.id}`;
        return this.http.put<Todo>(url, todo, { headers: headers })
            .pipe(
                tap(() => console.log('updateTodo: ' + todo.id)),
                map(() => todo),
                catchError(this.handleError)
            );
    }

    deleteTodo(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.todosUrl}/${id}`;
        return this.http.delete<Todo>(url, { headers: headers })
            .pipe(
                tap(() => console.log('deleteTodo: ' + id)),
                catchError(this.handleError)
            );
    }

    private handleError(err) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }
}
