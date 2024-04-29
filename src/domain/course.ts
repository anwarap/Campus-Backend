import { ObjectId } from "mongoose";

export default interface Course {
 _id: string,
 title: string,
 category:string,
 level: string,
 description: string,
 cover:string,
 preview:string,
 instructor:string|ObjectId,
 lessons:Array<string>
 isApproved: boolean;

}