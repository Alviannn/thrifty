import { DateTime } from 'luxon';
import { CustomEntity } from '../base/entity';
import { Product } from './product.entity';
import {
    Entity,
    Column, PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';

@Entity('users')
export class User extends CustomEntity {

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

    @Column('decimal', { default: 0 })
    balance!: number;

    @Column({
        name: 'created_at',
        type: 'timestamp',
    })
    createdAt = DateTime.utc();

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        nullable: true
    })
    updatedAt?: DateTime;

    toSimple(): Record<string, unknown> {
        return {
            id: this.id,
            fullName: this.fullName,
            email: this.email,
            phone: this.phone,
            address: this.address
        };
    }

    toJSON(): CustomEntity {
        this.hideProperty('password');
        return this;
    }

}