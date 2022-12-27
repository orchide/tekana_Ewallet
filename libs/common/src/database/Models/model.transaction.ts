import { Bill_Status } from './../../core/enums/bill_status.enum';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './model.user';
import { Merchant } from './model.merchant';

@Table
export class Transaction extends Model<Transaction> {
  @Column({
    type: DataType.DECIMAL(10, 3),
    allowNull: false,
  })
  due_amount: number;
  @Column({
    type: DataType.DECIMAL(10, 3),
    allowNull: false,
  })
  paid_amount: number;
  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: ['REJECTED', 'PAID', 'PENDING'],
    defaultValue: Bill_Status.PENDING,
  })
  status: string;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Merchant)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  merchant_Id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_Id: number;
}
