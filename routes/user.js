import express from "express";
import { SignUp, SignIn, GoogleSignIn, BlockUser, AllUsers } from "../controller/user.js";
import verifyRole from "../middleware/verifyRole.js";
import { Role } from "../_helpers/role.js";
import auth from "../middleware/auth.js";


const router = express.Router();

// @desc        Create user
// @route       /user/signup
router.post("/signup", SignUp);

// @desc        login user
// @route       /user/signin
router.post("/signin", SignIn);

// @desc        google signin user
// @route       /user/google-sign-in
router.post("/google-sign-in", GoogleSignIn);

// @desc        block user
// @route       /user/block-user/:id
router.post("/block-user/:id", auth, verifyRole(Role.Admin), BlockUser);

// @desc        Get all user
// @route       /user/all-user
router.get("/all-user", auth, verifyRole(Role.Admin), AllUsers);

export default router;

/**
 * @swagger
 *  tags:
 *    name: User
 *    description: All routes related to user API
 */

// swagger schema for signin
/**
 * @swagger
 * components:
 *  schemas:
 *    Sign_in:
 *      type: object
 *      required:
 *          - email
 *          - password
 *      properties:
 *          email:
 *              type: string
 *          password:
 *              type: string
 *      example:
 *             email: Users email address
 *             password: Users password
 */

// swagger schema for signup
/**
 * @swagger
 * components:
 *  schemas:
 *    Sign_up:
 *      type: object
 *      required:
 *          - name
 *          - email
 *          - password
 *      properties:
 *          name:
 *              type: string
 *          email:
 *              type: string
 *          password:
 *              type: string
 *      example:
 *             name: user name
 *             email: Users email address
 *             password: Users password
 */

/**
 * @swagger
 * /user/signup:
 *      post:
 *         summary: Sign up create an account
 *         tags: [User]
 *         requestBody:
 *             required: true
 *             content:
 *                multipart/form-data:
 *                      schema:
 *                         $ref: '#/components/schemas/Sign_up'
 *         responses:
 *              201:
 *                 description: the list of homes
 *                 content:
 *                      application/json:
 *                          schema:
 *                            type: array
 *                            items:
 *                              $ref: '#/components/schemas/Sign_up'
 *              401:
 *                 description: Unauthorized access
 *              404:
 *                 description: Data not found
 *
 */

/**
 * @swagger
 * /user/signin:
 *      post:
 *         summary: Login with credentials
 *         tags: [User]
 *         requestBody:
 *             required: true
 *             content:
 *                multipart/form-data:
 *                      schema:
 *                         $ref: '#/components/schemas/Sign_in'
 *         responses:
 *              200:
 *                 description: the list of homes
 *                 content:
 *                      multipart/form-data:
 *                          schema:
 *                            type: array
 *                            items:
 *                              $ref: '#/components/schemas/Sign_in'
 *              401:
 *                 description: Unauthorized access
 *              404:
 *                 description: Data not found
 *
 */

// Swagger schema for Get all users
/**
 * @swagger
 * /user/all-user:
 *      get:
 *         summary: Get all users data
 *         tags: [User]
 *         security:
 *             - bearerAuth: []
 *         responses:
 *              200:
 *                 description: the list of homes
 *                 content:
 *                      application/json:
 *                          schema:
 *                            type: array
 *                            
 *              401:
 *                 description: Unauthorized access
 *              404:
 *                 description: Data not found
 *              500:
 *                 description: Internal server error
 *
 */

// Swagger schema for block user users
/**
 * @swagger
 * /user/block-user/{id}:
 *      post:
 *         summary: Block users ADMIN only
 *         tags: [User]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: User ID
 *         responses:
 *              200:
 *                 description: the list of homes
 *                 content:
 *                      application/json:
 *                          schema:
 *                            type: array
 *                            
 *              401:
 *                 description: Unauthorized access
 *              404:
 *                 description: Data not found
 *              
 *
 */
