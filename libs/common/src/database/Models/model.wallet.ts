import { Wallet_Status } from './../../core/enums/wallet_status.enum';
import { Merchant } from './model.merchant';

import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './model.user';
import { Card } from './model.card';

@Table
export class Wallet extends Model<Wallet> {
  @Column({
    type: DataType.DECIMAL(10, 3),
    allowNull: false,
  })
  balance: number;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: ['PENDING', 'ACTIVE', 'SUSPENDED'],
    defaultValue: Wallet_Status.PENDING,
  })
  status: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Card)
  cards: Card[];
}
