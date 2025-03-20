import { Controller, Post, Body } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { Visitor } from './visitor.entity';

@Controller('visitor')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  @Post('save')
  async saveVisitorDetails(@Body() body: Visitor) {
    return this.visitorService.saveVisitorDetails(body);
  }
}
