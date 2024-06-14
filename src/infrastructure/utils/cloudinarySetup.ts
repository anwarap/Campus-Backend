import cloudinary from "../config/cloudinary";
import fs from 'fs'
import { UploadApiOptions, UploadApiResponse } from 'cloudinary';

// class CloudinarySetup{
//     async upload(filePath: string,folder: string, resourceType: string = 'auto'){
//         try {
//              const options = { folder, resource_type: resourceType };
//             const result = await cloudinary.uploader.upload(filePath, { folder, resource_type: resourceType });
//             // const result = await cloudinary.uploader.upload(filePath,  { folder });
//             console.log("Upload result:", result); 
//             fs.unlink(filePath,(err)=>{
//                 if(err){
//                     console.log("Error deleting file:",err);
//                 }
//             });
//             return result;
//         } catch (error) {
//             const err: Error = error as Error;
//             console.log("cloudinay:",err.message)
//             throw err
//         }
//     }
// }


class CloudinarySetup {
    async upload(filePath: string, folder: string, resourceType: 'auto' | 'raw' | 'image' | 'video' = 'auto'): Promise<UploadApiResponse> {
      try {
        const options: UploadApiOptions = { folder, resource_type: resourceType };
        const result = await cloudinary.uploader.upload(filePath, options);
        // console.log("Upload result:", result);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log("Error deleting file:", err);
          }
        });
        return result;
      } catch (error) {
        const err: Error = error as Error;
        console.log("cloudinay:", err.message);
        throw err;
      }
    }
  }


export default CloudinarySetup;