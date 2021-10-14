import { Application, Router } from "express";

import ExpressAdapter from "@presentation/adapters/ExpressAdapter";
import UserController from "@presentation/controllers/UserController";

const user = (app: Application): void => {
  const router = Router();

  router.get("/create", ExpressAdapter.create(UserController.createUser));
  router.post("/create", ExpressAdapter.create(UserController.createUser));
  router.get("/:id", ExpressAdapter.create(UserController.findUser));

  app.use("/user", router);
};

export default user;
