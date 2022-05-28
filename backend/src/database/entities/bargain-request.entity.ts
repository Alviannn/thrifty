import { User } from './user.entity';
import { Product } from './product.entity';
import { DateTime } from 'luxon';
import { Transaction } from './transaction.entity';
import { CustomEntity } from '../base/entity';
import {
    Column, PrimaryGeneratedColumn, JoinColumn,
    Entity,
    ManyToOne, OneToOne,
} from 'typeorm';

export enum BargainStatus {
    PENDING,
    ACCEPTED,
    REJECTED,
    CANCELLED
}

@Entity('bargain_requests')
export class BargainRequest extends CustomEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product!: Product;

    @Column({ name: 'product_id' })
    productId!: number;

    @OneToOne(
        () => Transaction,
        (trans) => trans.bargain,
        { nullable: true }
    )
    transaction?: Transaction;

    @Column('decimal')
    price!: number;

    @Column({
        type: 'enum',
        enum: BargainStatus,
        default: BargainStatus.PENDING
    })
    status!: BargainStatus;

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
        throw Error('Method not implemented.');
    }

    toJSON(): Record<string, unknown> {
        const clone = { ...this } as Record<string, unknown>;

        if ('user' in clone) {
            delete clone.user;
            clone.seller = this.user.toSimple();
        }

        if ('product' in clone) {
            clone.product = this.product.toSimple();
        }

        delete clone.userId;
        delete clone.productId;

        return clone;
    }


}