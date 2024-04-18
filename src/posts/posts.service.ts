import { Injectable, Delete } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel("User") private userModel, @InjectModel("Post") private postModel){}

  async create(post: CreatePostDto,user) {
    try{
    let newPost= new this.postModel({user,...post})
    await newPost.save()
    
    return {message:"post added successfuly",data:await newPost.populate("user")};
    }
    catch(err){console.log(err)}
  }

  async findAll() {
    try{
    return {data:await this.postModel.find().populate("user")}
    }
    catch(err){console.log(err)}
  }

  async findOne(_id: string) {
    try{
    const post = await this.postModel.findOne({_id});
    if(!post){return {message:"post not found!"}}
    return {data:post}
    }
    catch(err){console.log(err)}    
  }

  async findpostsByUser(_id: string){
    try{
    const user = await this.userModel.findOne({_id})
    if(!user){return {message:"user not found!"}}
    return{data: this.postModel.find({user:_id})}  
    }
    catch(err){console.log(err)}
  }

  async update(_id: string, newPost: UpdatePostDto) {
    try{
    const post = await this.postModel.findOne({_id});
    if(!post){return {message:"post not found!"}}
    await this.postModel.updateOne({_id},newPost);
    return {message:"post updated successfuly"};
    }
    catch(err){console.log(err)}
  }

  async remove(_id: string) {
    try{
    const post =await this.postModel.findOne({_id});
    if(!post){return {message:"post not found!"}}
    await this.postModel.deleteOne({_id});
    return {message:"post deleted successfuly"};
    }
    catch(err){console.log(err)}
  }
}
