import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(env.MONGO_URL), BlogsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
