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
import { Merchant } from './model.merchant';
import { Wallet } from './model.wallet';

@Table
export class Card extends Model<Card> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name_on_card: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cvc: string;

  @Column({
    type: DataType.STRING,
    defaultValue: false,
    allowNull: false,
  })
  cardNumber: string;

  @ForeignKey(() => Wallet)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  walletId: number;

  @BelongsTo(() => Wallet)
  wallet: Wallet;
}
