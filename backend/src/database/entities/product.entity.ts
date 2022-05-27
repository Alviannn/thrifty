import { DateTime } from 'luxon';
import {
    BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { dateTransformer } from '.';
import { User } from './user.entity';

export enum ProductType {
    OTHERS,
    ATASAN,
    BAWAHAN,
    LUARAN
}

@Entity('products')
export class Product extends BaseEntity {

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

    @Column({
        type: 'enum',
        enum: ProductType
    })
    type!: ProductType;

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

    @Column({
        name: 'deleted_at',
        type: 'timestamp',
        transformer: dateTransformer,
        nullable: true
    })
    deletedAt?: DateTime;

}