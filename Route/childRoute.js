const express=require("express");
const controller=require("./../Controller/childController");
const router = express.Router();
const {body,query,param}=require("express-validator");
const isAuth = require("./../Middleware/authMW");
/*
**
 * @swagger
 * /api/Child/list:
 *   get:
 *     summary: Get all children
 *     description: Retrieve all children from the system.
 *     responses:
 *       200:
 *         description: An array of child objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Child'
 *       403:
 *         description: Not authorized to get all children.
 */

router.get("/Child/list",isAuth,controller.getAllChild);

/**
 * @swagger
 * /api/Child/add:
 *   post:
 *     summary: Add a new child
 *     description: Add a new child to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               age:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: The newly added child object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 *       403:
 *         description: Not authorized to add a child.
 *       422:
 *         description: Validation error.
 */
router.post("/Child/add", isAuth,[
    body("username").isAlpha().withMessage("child name must be sting").isLength({max:10}).withMessage("user name max 10"),
    body("age").isNumeric().withMessage("Age must be a number"),
],controller.addChild);

/**
 * @swagger
 * /api/child/update:
 *   put:
 *     summary: Update a child
 *     description: Update an existing child in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               idChild:
 *                 type: string
 *               username:
 *                 type: string
 *               age:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Child updated successfully.
 *       403:
 *         description: Not authorized to update the child.
 *       404:
 *         description: Child not found.
 */
router.put("/Child/update",isAuth,controller.UpdateChild);
/**
 * @swagger
 * /api/Child/delete:
 *   delete:
 *     summary: Delete a child
 *     description: Delete an existing child from the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idChild:
 *                 type: string
 *     responses:
 *       200:
 *         description: Child deleted successfully.
 *       403:
 *         description: Not authorized to delete the child.
 *       404:
 *         description: Child not found.
 */

router.delete("/Child/delete",isAuth,controller.DeleteChild);


/**
 * @swagger
 * /api/Child/list/{id}:
 *   get:
 *     summary: Get a child by ID
 *     description: Retrieve a child by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the child to retrieve
 *     responses:
 *       200:
 *         description: The child object with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 *       403:
 *         description: Not authorized to get the child.
 *       404:
 *         description: Child not found.
 */


router.get("/Child/list/:id",isAuth,controller.getChildById);

module.exports=router;