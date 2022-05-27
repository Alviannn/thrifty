import { DateTime } from 'luxon';
import { dateTransformer } from '.';
import { User } from './user.entity';
import {
    BaseEntity, Entity,
    Column, PrimaryGeneratedColumn, JoinColumn,
    ManyToOne
} from 'typeorm';

@Entity('todos')
export class Todo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'user_id' })
    userId!: number;

    @ManyToOne(() => User, (user) => user.todoList)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ length: 512 })
    content!: string;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        transformer: dateTransformer
    })
    createdAt = DateTime.utc();

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        transformer: dateTransformer,
        nullable: true
    })
    updatedAt?: DateTime;

    @Column({ name: 'is_done', default: false })
    isDone!: boolean;

    toJSON() {
        const cloned = { ...this } as Record<string, unknown>;
        delete cloned.user;

        return cloned;
    }

}