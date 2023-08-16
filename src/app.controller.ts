import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

import { ConvertVideoBody, VideoFormat } from './converter.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/convert-video')
  async convertVideoToDesiredFormat(@Body() convertVideoBody: any) {
    return this.appService.convertVideoToDesiredFormat(
      convertVideoBody.url,
      convertVideoBody.format,
    );
  }
}
