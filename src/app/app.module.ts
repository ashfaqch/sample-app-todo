import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodoService } from './todo/todo.service';
import { Database } from './todo/database';

@NgModule({
    declarations: [
        AppComponent,
        TodoComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        InMemoryWebApiModule.forRoot(Database),
    ],
    providers: [TodoService],
    bootstrap: [AppComponent]
})
export class AppModule { }
