import { Role } from './../../core/enums/roles.enum';
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
import { Wallet } from './model.wallet';
import { Bill } from './model.bill';
import { Transaction } from './model.transaction';

@Table
export class Merchant extends Model<Merchant> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  address: string;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  isEmailVerified: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @HasMany(() => Bill)
  bill: Bill[];
  @HasMany(() => Transaction)
  transactions: Transaction[];

  @BelongsTo(() => User)
  user: User;
}
