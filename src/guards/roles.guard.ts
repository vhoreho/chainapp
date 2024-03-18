import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_ROLE } from 'src/enums/user-role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<USER_ROLE[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // Разрешаем доступ, если роли не указаны
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Предполагается, что информация о пользователе доступна в запросе после применения JwtAuthGuard

    // Проверяем, имеет ли пользователь хотя бы одну из требуемых ролей
    return requiredRoles.some((role) => (user.role = role));
  }
}
