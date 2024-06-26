import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, @InjectModel("User") private UserModel) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: 'secret'
          }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        
        const user=await this.UserModel.findOne({email:payload.email})
        request['user'] = user
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
    //   const [type, token] = request.headers.authorization?.split(' ') ?? [];
    //   return type === 'Bearer' ? token : undefined;
    return request.headers['jwt'] as string|| undefined
    }
  }