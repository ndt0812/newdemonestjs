import { createParamDecorator, ExecutionContext, } from '@nestjs/common';

export const JwtToken = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return getJwtToken(request);
    },
);

export function getJwtToken(request: Request | any) {
    const authHeader = request.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        return token;
    }
    return null;
}

