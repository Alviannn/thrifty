import { dateTransformer } from '.';
import { User } from './user.entity';
import { Product } from './product.entity';
import { DateTime } from 'luxon';
import {
    Column, PrimaryGeneratedColumn, JoinColumn,
    BaseEntity, Entity,
    ManyToOne,
} from 'typeorm';

export enum BargainStatus {
    PENDING,
    ACCEPTED,
    REJECTED,
    CANCELLED
}

@Entity('bargain_requests')
export class BargainRequest extends BaseEntity {

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

    @Column('decimal')
    price!: number;

    @Column({
        type: 'enum',
        enum: BargainStatus,
        default: BargainStatus.PENDING
    })
    status!: BargainStatus;

    @Column()
    quantity!: number;

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

}