import multer from "multer";

// Ensure the uploads folder exists


const storage = multer.diskStorage({})

export const upload = multer({ storage });
