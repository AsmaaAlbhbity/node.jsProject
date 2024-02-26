const express = require("express");
const controller = require("./../Controller/teacherController");
const router = express.Router();
const { body } = require("express-validator");
const isAuth = require("./../Middleware/authMW");


/**
 * @swagger
 * api/Teacher/list:
 *   get:
 *     summary: Get all teachers
 *     description: Retrieve all teachers from the system.
 *     responses:
 *       200:
 *         description: An array of teacher objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Teacher'
 *       403:
 *         description: Not authorized to get all teachers.
 */
router.get("/Teacher/list", isAuth, controller.getAllTeacher);


/**
 * @swagger
 * /api/Teacher/add:
 *   post:
 *     summary: Add a new teacher
 *     description: Add a new teacher to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       201:
 *         description: Successfully added the teacher.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       403:
 *         description: Not authorized to add a teacher.
 *       422:
 *         description: Validation error. Invalid input data.
 */

router.post("/Teacher/add", isAuth, [ 
    
    body("username").isAlpha().withMessage("Teacher name must be string").isLength({ max: 10 }).withMessage("Username max 10 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], controller.addTeacher); 


/**
 * @swagger
 * /api/Teacher/update/{id}:
 *   put:
 *     summary: Update teacher by ID
 *     description: Update a teacher's information by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the teacher to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       200:
 *         description: Successfully updated the teacher.
 *       403:
 *         description: Not authorized to update a teacher.
 *       404:
 *         description: Teacher not found.
 *       422:
 *         description: Validation error. Invalid input data.
 */

router.put("/Teacher/update", isAuth, controller.UpdateTeacher);


/**
 * @swagger
 * /api/Teacher/delete{id}:
 *   delete:
 *     summary: Delete teacher by ID
 *     description: Delete a teacher from the system by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the teacher to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted the teacher.
 *       403:
 *         description: Not authorized to delete a teacher.
 *       404:
 *         description: Teacher not found.
 */

router.delete("/Teacher/delete", isAuth, controller.DeleteTeacher);

/**
 * @swagger
 * /api/Teacher/list/{id}:
 *   get:
 *     summary: Get teacher by ID
 *     description: Retrieve a teacher by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the teacher to retrieve.
 *     responses:
 *       200:
 *         description: A single teacher object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       404:
 *         description: Teacher not found.
 */

router.get("/Teacher/list/:id", isAuth, controller.getTeacherById);



module.exports = router;

