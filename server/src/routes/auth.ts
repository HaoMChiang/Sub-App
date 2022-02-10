import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post(
  "/signup",
  body("email").isEmail().withMessage("The email is invalid."),
  body("password").isLength({ min: 5 }).withMessage("The password is invalid."),
  async (req, res) => {
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
      const errors = validationError.array().map((error) => {
        return {
          msg: error.msg,
        };
      });
      return res.json({ errors, data: null });
    }

    const { email, password } = req.body;

    // await User.create({
    //   email,
    //   password,
    // });
    const user = await User.findOne({ email });

    if (user) {
      res.json({
        errors: [
          {
            msg: "Email already in use",
          },
        ],
        data: null,
      });
    }

    // res.json("created");
    res.json(user);
  }
);

export default router;
