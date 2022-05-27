import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { DateTime } from 'luxon';
import { dateTransformer } from '.';

@Entity('refresh_tokens')
export class RefreshToken extends BaseEntity {

    @PrimaryColumn()
    token!: string;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        transformer: dateTransformer
    })
    createdAt = DateTime.utc();

}