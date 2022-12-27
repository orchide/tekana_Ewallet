import { Card } from './Models/model.card';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from './constants';
import { databaseConfig } from './database.config';
import { Merchant } from './Models/model.merchant';
import { Bill } from './Models/model.bill';
import { Wallet } from './Models/model.wallet';
import { User } from './Models/model.user';
import { Transaction } from './Models/model.transaction';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([Card, User, Merchant, Bill, Wallet, Transaction]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
