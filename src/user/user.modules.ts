import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [AuthModule, HomeModule],
})
export class UserModule {}
