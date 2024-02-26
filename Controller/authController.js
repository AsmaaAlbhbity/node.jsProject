const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Teacher = require("./../Modal/teacherSchema");
const Child = require("./../Modal/childSchema");
require("dotenv").config();

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user (teacher or student) and generate a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Login successful. Returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     role:
 *                       type: string
 *                     id:
 *                       type: string
 *       400:
 *         description: Username or password incorrect.
 *       500:
 *         description: Internal server error.
 */


exports.login = (request, response, next) => {
    const { username, password } = request.body;

    Teacher.findOne({ username })
        .then(teacher => {
            if (teacher) {
                bcrypt.compare(password, teacher.password, (err, result) => {
                    if (err || !result) {
                        return next(new Error("Username or password incorrect"));
                    }

                    const token = jwt.sign({
                        username: teacher.username,
                        role: teacher.role,
                        _id:teacher._id
                    }, process.env.SECRET_KEY, { expiresIn: "1h" });

                    response.status(200).json({ token, user: teacher });
                });
            } else {
               next(new Error("not found !"));
            }
        })
        .catch(error => {
            next(error);
        });
};

