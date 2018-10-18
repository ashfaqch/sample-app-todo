import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo';

export class Database implements InMemoryDbService {

    createDb() {
        const todos = <Todo[]>[
            {
                id: 1,
                title: 'Task 1',
                complete: false
            },
            {
                id: 2,
                title: 'Task 2',
                complete: true
            },
            {
                id: 3,
                title: 'Task 3',
                complete: false
            }
        ];

        return { todos };
    }
}
