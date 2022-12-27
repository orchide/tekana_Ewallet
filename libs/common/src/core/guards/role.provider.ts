import { ROLE_GUARDS } from './../constants';
import { RolesGuard } from './roles.guards';

export const roleProvider = [
  {
    provide: ROLE_GUARDS,
    useClass: RolesGuard,
  },
];
