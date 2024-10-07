import { Router } from "express";
import { addProfileImage, getUserInfo, login, signUp, updateProfile , removeProfileImage, logout} from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const authRoutes = Router();

const upload = multer({
    dest: 'uploads/profiles', // Destination to store the file
    // limits: {
    //     fileSize: 1024 * 1024 * 5 // 5MB
    // },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|webp)$/)) {
            return cb(new Error('Please upload an image file'));
        }
        cb(undefined, true);
    }
});

authRoutes.post("/signup", signUp);
authRoutes.post('/login', login);
authRoutes.get('/user-info',verifyToken, getUserInfo);
authRoutes.post('/update-profile',verifyToken, updateProfile);
authRoutes.put('/add-profile-image', verifyToken,upload.single("profile-image") ,addProfileImage);
authRoutes.delete('/delete-profile-image', verifyToken, removeProfileImage);
authRoutes.get('/logout',logout);

export default authRoutes;