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
export class Bill extends Model<Bill> {
  @Column({
    type: DataType.DECIMAL(10, 3),
    allowNull: false,
  })
  amount: number;
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
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_Id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  receiver: number;
}
