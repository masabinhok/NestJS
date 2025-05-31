import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { CreateBlogDto } from './dtos/create-blog.dto';
import slugify from 'slugify';
import { UsersService } from 'src/users/users.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CommentDocument } from './schemas/comment.schema';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel('Blog') private blogModel: Model<BlogDocument>,
    @InjectModel('Comment') private commentModel: Model<CommentDocument>,
     private usersService: UsersService){}

  async generateUniqueSlug(baseSlug: string): Promise<string> {
    return `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  async createBlog(author: string, createBlogDto: CreateBlogDto): Promise<BlogDocument> {
    const { title } = createBlogDto;
    const slug = slugify(title, {lower: true, strict: true, trim: true});
    const uniqueSlug = await this.generateUniqueSlug(slug);

    const newBlog = new this.blogModel({
      ...createBlogDto,
      author, 
      slug: uniqueSlug
    })

    await this.usersService.addBlogToUser(author, newBlog._id as string);

    return newBlog.save();
  }

  async getAllBlogs(): Promise<BlogDocument[]> {
    return this.blogModel.find().populate('author').populate('comments').populate('likes').exec();
  }

  async updateBlog(blogId: string, updateBlogDto: Partial<CreateBlogDto> ): Promise<Blog | null> {
       const updateData: Partial<BlogDocument> = {
      ...updateBlogDto,
      slug: updateBlogDto.title ? await this.generateUniqueSlug(slugify(updateBlogDto.title, {lower: true, strict: true, trim: true})) : undefined
    };
    const updatedBlog = await this.blogModel.findByIdAndUpdate(blogId, 
      updateData
      , {
      new: true,
      runValidators: true,
    });
    return updatedBlog;
  }

  async deleteBlog(blogId: string, authorId: string): Promise<BlogDocument | null> {
    const blog = await this.blogModel.findByIdAndDelete(blogId).exec();
    if(!blog){
      throw new Error(`Blog with id ${blogId} not found`);
    }
    await this.usersService.deleteBlogFromUser(authorId, blogId);
    return blog;
  }

  async likeBlog(blogId: string, userId: string): Promise<BlogDocument | null> {
    const blog = await this.blogModel.findByIdAndUpdate(blogId, {
      $push: {likes: userId}
    }, {
      new: true,
      runValidators: true,
    });
    if(!blog){
      throw new Error(`Blog with id ${blogId} not found`);
    }

    await this.usersService.addLikedBlogToUser(userId, blogId);
    return blog;
  }

  async createComment(blogId: string, userId: string, createCommentDto: CreateCommentDto ): Promise<CommentDocument | null> {
    const newComment = {
      author: userId, 
      content: createCommentDto.content,
      blog: blogId
    }
    const comment = new this.commentModel(newComment);
    await this.addCommentToBlog(blogId, comment._id as string);
    await this.usersService.addCommentToUser(userId, comment._id as string );
    return comment.save();
  } 

  async likeComment(commentId: string, userId: string): Promise<CommentDocument | null> {
    const comment = await this.commentModel.findByIdAndUpdate(commentId, {
      $push: {likes: userId}
    }, {
      new: true,
      runValidators: true,
    });
    if(!comment){
      throw new Error(`Comment with id ${commentId} not found`);
    }
    await this.usersService.addLikedCommentToUser(userId, commentId);
    return comment;
  }

  async addCommentToBlog(blogId: string, commentId: string): Promise<BlogDocument | null> {
    const updatedBlog = await this.blogModel.findByIdAndUpdate(blogId, {
      $push: {comments: commentId}
    }, {
      new: true,
      runValidators: true,
    });

    if(!updatedBlog){
      throw new Error(`Blog with id ${blogId} not found`);
    }

    return updatedBlog;
  }
}
