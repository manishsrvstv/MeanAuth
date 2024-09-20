import express from 'express';
import { login, register, registerAdmin} from '../controllers/auth.controller.js';
const router=express.Router();

//register
router.post("/register",register);

export default router;

router.post("/login",login)

//register as 

router.post("/register-admin",registerAdmin)