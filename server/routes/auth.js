require("dotenv").config();
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

router.post(
    "/register",
    [
        check("username", "Username is require").not().isEmail(),
        check("email", "Please include a valid email").isEmail(),
        check(
            "password",
            "Please enter a password with 6 or more characters"
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        try {
            // Check if user exists
            let user = await User.findOne({ where: { email } });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }

            //Check if username exists
            user = await User.findOne({ where: { username } });
            if (user) {
                return res
                    .status(400)
                    .json({ message: "Username is already taken" });
            }

            //Create new user
            user = await User.create({
                username,
                email,
                password: await bcrypt.hash(password, 20),
            });
            // creating JWT payload
            const payload = {
                user: {
                    id: user.id,
                },
            };

            // sign token
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: "1h" },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (error) {
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
