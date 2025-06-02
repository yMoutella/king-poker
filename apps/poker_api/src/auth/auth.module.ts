import { Inject, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          // secret: configService.get<string>('JWT_SECRET'),
          privateKey: configService.get<string>('PRIVATE_KEY'),
          publicKey: configService.get<string>('PUBLIC_KEY'),
          signOptions: {
            expiresIn: '2h',
            algorithm: 'RS256'
          },
          global: true,
        }
      }
    })],
  exports: [AuthService],
})
export class AuthModule { }
