// import multer, { FileFilterCallback } from 'multer';
// import path from 'path';
// import fs from 'fs';


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadDirectory = path.join(__dirname, '../public/images')
//         if (!fs.existsSync(uploadDirectory)) {
//             fs.mkdirSync(uploadDirectory, { recursive: true });
//         }
//         cb(null, uploadDirectory);
//     },
//     filename: (req, file, cb) => {
//         cb(
//             null,
//             file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//         );
//     },
// });

// export const ImageUpload = multer({
//     storage: storage,
// });



import multer, { Multer, FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        const uploadDirectory = path.join(__dirname, '../public/images');
        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory, { recursive: true });
        }
        cb(null, uploadDirectory);
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        cb(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );
    },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images and videos are allowed!'));
    }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter }).fields([
    { name: 'cover', maxCount: 1 },
    { name: 'preview', maxCount: 1 }
]);
