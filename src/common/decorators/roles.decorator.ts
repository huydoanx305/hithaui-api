import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../constants/auth.constant';
import { RoleType } from '../enums/role-type.enum';

export const Roles = (...roles: RoleType[]) => SetMetadata(ROLES_KEY, roles);
