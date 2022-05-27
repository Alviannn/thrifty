import fs from 'fs';

import { DateTime } from 'luxon';
import { User } from './user.entity';
import { CustomEntity } from '../base/entity';
import {
    Entity,
    Column, JoinColumn, PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';

export enum ProductType {
    OTHERS,
    ATASAN,
    BAWAHAN,
    LUARAN
}

@Entity('products')
export class Product extends CustomEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'user_id' })
    userId!: number;

    @ManyToOne(() => User, (user) => user.products)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ length: 255 })
    name!: string;

    @Column({ type: 'decimal', scale: 2 })
    price!: number;

    @Column({ length: 1023 })
    description!: string;

    @Column()
    imageFile!: string;

    @Column({
        type: 'enum',
        enum: ProductType
    })
    type!: ProductType;

    @Column({
        name: 'created_at',
        type: 'timestamp'
    })
    createdAt = DateTime.utc();

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        nullable: true
    })
    updatedAt?: DateTime;

    @Column({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true
    })
    deletedAt?: DateTime;

    toSimple(): Record<string, unknown> {
        throw Error('Method not implemented.');
    }

    toJSON(): Record<string, unknown> {
        const clone = { ...this } as Record<string, unknown>;

        if ('user' in clone) {
            delete clone.user;
            clone.seller = this.user.toSimple();
        }

        delete clone.userId;
        delete clone.imageFile;

        const buffer = fs.readFileSync(this.imageFile);
        clone.imageData = buffer.toString('base64');

        return clone;
    }

}