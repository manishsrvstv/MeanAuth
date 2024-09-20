import express from "express";
import Role from "../models/Role.js";
const router=express.Router();
import { createRole,updateRole ,getAllRoles,deleteRole} from "../controllers/role.controllers.js";

//create a new rOLE IN DB
router.post('/create',createRole);

//update role in db
router.put('/update/:id',updateRole);

//get all the roles from db
router.get('/getAllRoles',getAllRoles);

router.delete('/deleteRole/:id',deleteRole);

export default router;

