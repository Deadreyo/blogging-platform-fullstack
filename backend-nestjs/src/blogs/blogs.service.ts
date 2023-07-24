import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './schemas/blog.schema';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>, @Inject(REQUEST) private request: Request & { user }) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const createdBlog = new this.blogModel({ ...createBlogDto, author: this.request.user.id });
    try {
      await createdBlog.validate();
    } catch(e){
      throw new BadRequestException(e.message);
    }

    return createdBlog.save();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().populate("author", "name").exec();
  } 

  async findOne(id: string) {
    const doc = await this.blogModel.findOne({ _id: id }).populate("author", "name").exec()
    if(!doc) throw new NotFoundException('Blog not found');
    return doc;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const current = await this.findOne(id);
    if(current.author._id.toString() !== this.request.user.id) throw new ForbiddenException('You are not the author of this blog')
    return this.blogModel.findOneAndUpdate({ _id: id }, updateBlogDto).exec();
  }

  async remove(id: string) {
    const current = await this.findOne(id);
    if(current.author._id.toString() !== this.request.user.id) throw new ForbiddenException('You are not the author of this blog')
    return this.blogModel.deleteOne({ _id: id }).exec();
  }
}
