import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import * as fs from 'fs';
import { tmpdir } from 'os';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { VideoFormat } from './converter.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async convertVideoToDesiredFormat(videoUrl: string, format: VideoFormat) {
    const uuid = uuidv4();
    const filename = `${uuid}.${format}`;
    this.convertAndMoveVideoToOutputFolder(videoUrl, filename);

    return `localhost:3000/public/${filename}`;
  }

  private async convertAndMoveVideoToOutputFolder(
    videoUrl: string,
    filename: string,
  ) {
    try {
      await this.execPromise(`ffmpeg -i ${videoUrl} ${filename}`);
      fs.renameSync(filename, `./public/${filename}`);
    } catch (error) {
      console.error(error);
    }
  }

  execPromise(cmd: string) {
    return new Promise(function (resolve, reject) {
      exec(cmd, function (err, stdout) {
        if (err) return reject(err);
        resolve(stdout);
      });
    });
  }
}
