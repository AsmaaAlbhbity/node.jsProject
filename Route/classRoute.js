const express=require("express");
const controller=require("./../Controller/classController");
const router = express.Router();
const {body,query,param}=require("express-validator");
const isAuth = require("./../Middleware/authMW");


/**
 * @swagger
 * /api/class/list:
 *   get:
 *     summary: Get all classes
 *     description: Retrieve all classes from the system.
 *     responses:
 *       200:
 *         description: An array of class objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 *       403:
 *         description: Not authorized to get all classes.
 */

router.get("/Class/list",isAuth,controller.getAllClasses);


/**
 * @swagger
 * /api/class/add:
 *   post:
 *     summary: Add a new class
 *     description: Add a new class to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       201:
 *         description: Successfully added the class.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       403:
 *         description: Not authorized to add a class.
 *       422:
 *         description: Validation error. Invalid input data.
 */


router.post("/Class/add", isAuth,[
    body("name").isAlpha().withMessage("class name must be sting").isLength({max:10}).withMessage(" name max 10"),
   
   
],controller.addClass);
/**
 * @swagger
 * /api/class/update/{id}:
 *   put:
 *     summary: Update class by ID
 *     description: Update a class's information by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the class to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Successfully updated the class.
 *       403:
 *         description: Not authorized to update a class.
 *       404:
 *         description: Class not found.
 *       422:
 *         description: Validation error. Invalid input data.
 */

router.put("/Class/update",isAuth,controller.UpdateClass);

/**
 * @swagger
 * /api/class/delete/{id}:
 *   delete:
 *     summary: Delete class by ID
 *     description: Delete a class from the system by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the class to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted the class.
 *       403:
 *         description: Not authorized to delete a class.
 *       404:
 *         description: Class not found.
 */



router.delete("/Class/delete",isAuth,controller.DeleteClass);



/**
 * @swagger
 * /api/class/list/{id}:
 *   get:
 *     summary: Get class by ID
 *     description: Retrieve a class by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the class to retrieve.
 *     responses:
 *       200:
 *         description: A single class object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: Class not found.
 */

router.get("/Class/list/:id",isAuth,controller.getClassById);

module.exports=router;