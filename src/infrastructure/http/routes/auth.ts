import { Application, Router } from "express";

import ExpressAdapter from "@presentation/adapters/ExpressAdapter";
import AuthController from "@presentation/controllers/AuthController";

const user = (app: Application): void => {
  const router = Router();

  router.post("/signup", ExpressAdapter.create(AuthController.signUp));

  app.use("/auth", router);
};

export default user;
