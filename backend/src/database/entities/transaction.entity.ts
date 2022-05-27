import { BargainRequest } from './bargain-request.entity';
import { DateTime } from 'luxon';
import {
    BaseEntity, Column, Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('transactions')
export class Transaction extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => BargainRequest, (bargain) => bargain.transaction)
    @JoinColumn({ name: 'bargain_id' })
    bargain!: BargainRequest;

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
    updatedAt!: DateTime;

}