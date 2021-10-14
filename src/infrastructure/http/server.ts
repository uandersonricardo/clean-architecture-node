import "dotenv/config";
import "express-async-errors";

import { readdirSync } from "fs";
import { createServer } from "http";
import { resolve } from "path";

import cors from "cors";
import express, { Errback, NextFunction, Request, Response } from "express";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const handleRoutes = async () => {
  const files = readdirSync(resolve(__dirname, "routes"));

  await Promise.all(
    files.map(async (file) => {
      const { default: routeHandler } = await import(
        resolve(__dirname, "routes", file)
      );

      routeHandler(app);
    })
  );

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "Page Not Found" });
  });

  app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: "Internal Error" });
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: "Internal Error" });
  });
};

handleRoutes();

const server = createServer(app);

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
