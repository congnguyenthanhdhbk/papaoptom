import { Module } from '@nestjs/common';
import { ForsageService } from './services/forsage.service';

@Module({
  providers: [ForsageService],
  exports: [ForsageService],
})
export class ForsageModule {}
