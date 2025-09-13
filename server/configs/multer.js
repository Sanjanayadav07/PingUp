import multer from "multer";

// Ensure the uploads folder exists


const storage = multer.memoryStorage();

export const upload = multer({ storage });



