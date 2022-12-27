import { Role } from './../../core/enums/roles.enum';
import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { Merchant } from './model.merchant';
import { Wallet } from './model.wallet';
import { Bill } from './model.bill';
import { Transaction } from './model.transaction';

@Table
export class User extends Model<User> {
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
  email: string;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  isEmailVerified: boolean;
  @Column({
    type: DataType.STRING,
    defaultValue: false,
    allowNull: true,
  })
  resetPasswordToken: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  gender: string;

  @Column({
    type: DataType.ENUM,
    values: ['admin', 'user', 'superuser'],
    defaultValue: Role.User,
  })
  type: Role[];

  @HasMany(() => Wallet)
  wallets: Wallet[];
  @HasMany(() => Merchant)
  merchants: Merchant[];
  @HasMany(() => Bill)
  bills: Bill[];
  @HasMany(() => Transaction)
  transactions: Transaction[];
}
