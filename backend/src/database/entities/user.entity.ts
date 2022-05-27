import { dateTransformer } from '.';
import { DateTime } from 'luxon';
import {
    BaseEntity, Entity,
    Column, PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { Product } from './product.entity';

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @OneToMany(() => Product, (product) => product.id)
    products!: Product[];

    @Column({ name: 'full_name', length: 64 })
    fullName!: string;

    @Column({ length: 64 })
    email!: string;

    @Column({ length: 32 })
    phone!: string;

    @Column({ length: 64 })
    password!: string;

    @Column({ length: 64 })
    address!: string;

    @Column('decimal')
    balance!: number;

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

    toJSON() {
        const cloned = { ...this } as Record<string, unknown>;
        delete cloned.password;

        return cloned;
    }

}