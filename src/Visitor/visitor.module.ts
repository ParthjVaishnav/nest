import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visitor } from './visitor.entity';
import { VisitorService } from './visitor.service';
import { VisitorController } from './visitor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Visitor])], // Ensure Visitor entity is loaded
  controllers: [VisitorController],
  providers: [VisitorService], // ✅ Add VisitorService
  exports: [VisitorService], // ✅ Export if used in other modules
})
export class VisitorModule {}
