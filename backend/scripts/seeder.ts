// * max-len isn't needed here
// * This script is very dependant on the project files

/* eslint-disable max-len */

import logger from '../src/utils/logger.util';

import { appDataSource } from '../src/database/datasource';
import { authService } from '../src/services/auth.service';
import { User } from '../src/database/entities/user.entity';
import { Todo } from '../src/database/entities/todo.entity';
import { DateTime } from 'luxon';

// -------------------------------------------------------------------- //

const DEFAULT_PHONE = '628174991828';

function randomRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function insertData() {
    const users: User[] = [
        User.create({
            fullName: 'John Doe',
            email: 'john_doe@example.com',
            phone: DEFAULT_PHONE,
            password: await authService.hashPassword('JohnDoe123?')
        }),
        User.create({
            fullName: 'Alvian',
            email: 'alvian@example.com',
            phone: DEFAULT_PHONE,
            password: await authService.hashPassword('Alvian123?')
        })
    ];
    await User.save(users);

    const todos: Todo[] = [
        Todo.create({
            user: users[randomRange(0, users.length - 1)],
            content: 'Play VALORANT tonight'
        }),
        Todo.create({
            user: users[randomRange(0, users.length - 1)],
            content: 'Do android mobile homework',
            updatedAt: DateTime.utc().minus({ days: 2, hours: 6 }),
            createdAt: DateTime.utc().minus({ days: 3 })
        })
    ];
    await Todo.save(todos);

    return { users, todos };
}

// -------------------------------------------------------------------- //

appDataSource.initialize()
    .then(async () => {
        await insertData();

        logger.debug('Data seeding has finished!');
        process.exit();
    })
    .catch((err: Error) => logger.error(`${err} ${err.stack}`));