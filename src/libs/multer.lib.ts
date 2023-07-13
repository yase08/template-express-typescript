import fs from "fs";
import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { ExpressError } from "../helpers/error.helper";
import { extensionSupport } from "../helpers/extension.helper";

export const upload = multer({
  storage: multer.diskStorage({
    destination(_: Request, file: Express.Multer.File, done: any) {
      let disk: string = "/tmp";

      if (!file) {
        done(new ExpressError("Uploading file failder"), null);
      } else {
        if (fs.existsSync(disk)) {
          done(null, disk);
        } else {
          done(new ExpressError("No such file directory").message, null);
        }
      }
    },
    filename(_req: Request, file: Express.Multer.File, done: any) {
      if (!file) done(new ExpressError("Get file upload failed"), null);
      done(null, `${Date.now()}_${file.originalname}`);
    },
  }),
  fileFilter(
    _req: Request,
    file: Express.Multer.File,
    done: FileFilterCallback
  ) {
    if (!extensionSupport(file.mimetype) || !file) {
      throw Promise.reject(new ExpressError("File format not supported"));
    }
    done(null, true);
  },
  limits: { fileSize: 2000000 },
}) as multer.Multer;
