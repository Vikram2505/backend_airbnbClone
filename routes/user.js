import express from 'express';
import { SignUp, SignIn, GoogleSignIn } from '../controller/user.js';
const router = express.Router();

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

// @desc        Create user
// @route       /user/signup
router.post("/signup", SignUp);

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


// @desc        login user
// @route       /user/signin
router.post("/signin", SignIn);

router.post("/google-sign-in", GoogleSignIn)
export default router;