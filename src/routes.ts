import { Router } from "express";

import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { ComplimentController } from "./controllers/ComplimentController";
import { UserController } from "./controllers/UserController";
import { TagController } from "./controllers/TagController";

const router = Router();

const complimentController = new ComplimentController();
const userController = new UserController();
const tagController = new TagController();

router.post("/tags", ensureAuthenticated, ensureAdmin, tagController.createTag);
router.post("/users", userController.createUser);
router.post("/login", userController.authenticateUser);
router.post("/compliments", ensureAuthenticated, complimentController.createCompliment);

router.get("/users/compliments/send", ensureAuthenticated, userController.listUserSendComplimentsController);
router.get("/users/compliments/receive", ensureAuthenticated, userController.listUserReceiveComplimentsController);
router.get("/tags", ensureAuthenticated, tagController.listTags);

export { router }