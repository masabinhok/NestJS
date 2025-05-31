import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dtos/create-blog.dto';
import { Request } from 'express';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { create } from 'domain';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  async createBlog(@Body() createBlogDto: CreateBlogDto, @Req() request: Request){
    const user = request['user'];
    return this.blogsService.createBlog(user.sub, createBlogDto);
  }

  @Get()
  async getAllBlogs() {
    return this.blogsService.getAllBlogs();
  }

  @Put(':id')
  async updateBlog(@Param('id') id: string, @Body() updateBlogDto: Partial<CreateBlogDto>){
    return this.blogsService.updateBlog(id, updateBlogDto);
  }

  @Delete(':id')
  async deleteBlog(@Param('id') id: string, @Req() request: Request){
    const user = request['user'];
    return this.blogsService.deleteBlog(id, user.sub);
  }

  @Post(':id/like')
  async likeBlog(@Param('id') id: string, @Req() request: Request){
    const user = request['user'];
    return this.blogsService.likeBlog(id, user.sub);
  }

  @Post(':id/comment')
  async createComment(@Param('id') id: string, @Req() request: Request, @Body() createCommentDto: CreateCommentDto){
      const user = request['user'];
      return this.blogsService.createComment(id, user.sub, createCommentDto);
  }

  @Post('/comment/:commentId/like')
  async likeComment(@Param('commentId') commentId :string, @Req() request: Request){
    const user = request['user'];
    return this.blogsService.likeComment(commentId, user.sub);
  }

}
