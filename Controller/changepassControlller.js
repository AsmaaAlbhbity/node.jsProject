const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Teacher = require("./../Modal/teacherSchema");
const Child = require("./../Modal/childSchema");
require("dotenv").config();

/**
 * @swagger
 * /api/editPassword:
 *   put:
 *     summary: Edit user password
 *     description: Edit the password of a user (teacher or student).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *             required:
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *       400:
 *         description: Invalid user role or missing newPassword.
 *       403:
 *         description: Not authorized to edit password.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */


exports.editPassword = async (request, response, next) => {
    try {
        if (request.role === "admin" || request.role === "teacher" || request.role === "student") {
            const token = request.headers.authorization.split(" ")[1];
            const decodedToken = jwt.decode(token);
            let id;
            if (decodedToken.role === 'teacher'||decodedToken.role === 'admin') {
                id = decodedToken.id;
            } else if (decodedToken.role === 'student') {
                id = decodedToken.idChild;
            } else {
                const error = new Error('Invalid user role');
                error.status = 400;
                throw error;
            }

            const { newPassword } = request.body;

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            let User;
            if (decodedToken.role === 'teacher'||decodedToken.role === 'admin') {
                User = Teacher;
            } else if (decodedToken.role === 'student') {
                User = Child;
            }

            const filter = { id: id }; // Use the correct field here
            const update = { password: hashedPassword };
            const options = { new: true };

            const user = await User.findOneAndUpdate(filter, update, options);

            if (!user) {
                const error = new Error('User not found');
                error.status = 404;
                throw error;
            }

            response.status(200).json({ message: 'Password updated successfully' });
        } else {
            const error = new Error("Not Authorized");
            error.status = 403;
            throw error;
        }
    } catch (error) {
        next(error);
    }
};
