import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TwoFactorAuthModule } from './two-factor-auth/two-factor-auth.module';

@Module({
  imports: [TwoFactorAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
