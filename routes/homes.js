import express from "express";

// import upload from "../config/multer.js";
import {
  Add_to_Favourite,
  Create_Home,
  Delete_Single_Home,
  Get_All_Homes,
  Get_Each_User_Homes,
  Get_Single_Home,
  Update_Single_Home,
} from "../controller/homes.js";
import auth from "../middleware/auth.js";
import verifyRole from "../middleware/verifyRole.js";
import { Role } from "../_helpers/role.js";

const router = express.Router();

// @desc        Create new home
// @route       POST /home/create-home
router.post("/create-home", auth, verifyRole(Role.User, Role.Admin), Create_Home);

// @desc        Get all home
// @route       POST /home/get-all-homes
router.post("/get-all-homes", Get_All_Homes);

// @desc        Get all home registered by user
// @route       POST /home/get-user-registered-homes
router.post("/get-user-registered-homes", auth, verifyRole(Role.User), Get_Each_User_Homes);

// @desc        Get single home by params ID
// @route       POST /home/get-single-home
router.post("/get-single-home/:id", Get_Single_Home);

// @desc        update single home by ID
// @route       POST /home/update-single-home/:id
router.post("/update-single-home/:id", auth, verifyRole(Role.User, Role.Admin), Update_Single_Home);

// @desc        Delete single home by ID
// @route       POST /home/delete-single-home/:id
router.post("/delete-single-home/:id", auth, verifyRole(Role.User, Role.Admin), Delete_Single_Home);

// @desc        Add home to Favourites
// @route       POST /home/add-to-favourite/:id
router.post("/add-to-favourite/:id", auth, verifyRole(Role.User, Role.Admin), Add_to_Favourite);

export default router;



// Swagger group name
/**
 * @swagger
 *  tags:
 *    name: Homes
 *    description: All routes related home API
 */

// swagger schema for create homes
/**
 * @swagger
 * components:
 *  schemas:
 *    Create_homes:
 *      type: object
 *      example:
 *             home_name: House of Albetroz
 *             owner_name: Name of home owner
 *             owner_email: Owner email address
 *             owner_phoneNo: Owner email address
 *             home_desc: description of your house
 *             home_image: [upload home image]
 *             owner_image: upload owner image
 *             price: price of the house
 *             location: location of the house
 *             home_city: Enter the City where home is
 *             home_state: Enter the State of home
 *             home_zipCode: enter the Zipcode of home
 *             latitude: latitude of location
 *             longitude: longitude value
 *             total_guests: total number of guests
 *             total_beds: total number of beds
 *             total_bedroom: total number of bedroom
 *             total_bathroom: totla number of bathroom
 *             rating: rating for house in number
 *             this_place_offers: [service offers by this house in array]
 *             property_type: property type i.e entire place, private room, shared room
 *             type_of_place: type of place i.e house, flat, hotel, guest house
 *
 */

/**
 * @swagger
 * /home/create-home:
 *      post:
 *         summary: Create a new homes
 *         tags: [Homes]
 *         security:
 *             - bearerAuth: []
 *         requestBody:
 *             required: true
 *             content:
 *                multipart/form-data:                   
 *                    schema:
 *                      type: object
 *                      required:
 *                           - home_name
 *                           - owner_name
 *                           - owner_email
 *                           - owner_phoneNo
 *                           - home_desc
 *                           - home_image
 *                           - owner_image
 *                           - price
 *                           - location
 *                      properties:
 *                        home_name:
 *                           type: string
 *                        owner_name:
 *                           type: string
 *                        owner_email:
 *                           type: string
 *                        owner_phoneNo:
 *                           type: string
 *                        home_desc:
 *                           type: string
 *                        home_image:
 *                           type: array
 *                           items:
 *                             type: string
 *                             format: binary
 *                        owner_image:
 *                           type: string
 *                           format: binary
 *                        price:
 *                           type: number
 *                        location:
 *                           type: string
 *                        home_city:
 *                           type: string
 *                        home_state:
 *                           type: string
 *                        home_zipCode:
 *                           type: number
 *                        latitude:
 *                           type: number
 *                        longitude:
 *                           type: number
 *                        total_guests:
 *                           type: number
 *                        total_beds:
 *                           type: number
 *                        total_bedroom:
 *                           type: number
 *                        total_bathroom:
 *                           type: number
 *                        rating:
 *                           type: number
 *                        this_place_offers:
 *                           type: array
 *                        property_type:
 *                           type: string
 *                        type_of_place:
 *                           type: string
 *         responses:
 *              201:
 *                 description: the list of homes
 *                 content:
 *                      application/json:
 *                          schema:
 *                            items:
 *                              $ref: '#/components/schemas/Create_homes'
 *              401:
 *                 description: Unauthorized access
 *              404:
 *                 description: Data not found
 *
 */

// swagger schema get all homes
/**
 * @swagger
 * components:
 *  schemas:
 *    Get_all_homes:
 *      example:
 *             dataLimit: 10
 *             pageNo: 1
 *             keyword: ""
 *             minPrice: ""
 *             maxPrice: ""
 *             typeOfPlace: [""]
 *             bedrooms: ""
 *             beds: ""
 *             bathroom: ""
 *             guests: ""
 *             propertyType: ""
 *             amenities: [""]
 */

/**
 * @swagger
 * /home/get-all-homes:
 *      post:
 *         summary: Show the list of all homes
 *         tags: [Homes]
 *         security:
 *            - bearerAuth: []
 *         requestBody:
 *             required: true
 *             content:
 *                multipart/form-data: 
 *                      schema:
 *                         type: object
 *                         required:
 *                              - dataLimit
 *                              - pageNo
 *                         properties:
 *                              dataLimit:
 *                                 type: integer
 *                              pageNo:
 *                                 type: integer
 *                              keyword:
 *                                 type: string
 *                              minPrice:
 *                                 type: number
 *                              maxPrice:
 *                                 type: number
 *                              typeOfPlace:
 *                                 type: string
 *                              bedrooms:
 *                                 type: number
 *                              beds: 
 *                                 type: number
 *                              bathroom:
 *                                 type: number
 *                              propertyType:
 *                                 type: string
 *                              amenities:
 *                                 type: array
 *         responses:
 *              200:
 *                 description: the list of homes
 *                 content:
 *                      application/json:
 *                          schema:
 *                            type: array
 *                            items:
 *                              $ref: '#/components/schemas/Get_all_homes'
 *              404:
 *                 description: Data not found
 *
 */


// swagger schema get indivisual user registered homes
/**
 * @swagger
 * components:
 *  schemas:
 *    Get_User_Registered_homes:
 *      example:
 *             dataLimit: 10
 *             pageNo: 1
 *             keyword: ""
 */

/**
 * @swagger
 * /home/get-user-registered-homes:
 *      post:
 *         summary: Show homes created by each user
 *         tags: [Homes]
 *         security:
 *            - bearerAuth: []
 *         requestBody:
 *             required: true
 *             content:
 *                multipart/form-data: 
 *                      schema:
 *                         type: object
 *                         required:
 *                              - dataLimit
 *                              - pageNo
 *                         properties:
 *                              dataLimit:
 *                                 type: integer
 *                              pageNo:
 *                                 type: integer
 *                              keyword:
 *                                 type: string
 *                        
 *         responses:
 *              200:
 *                 description: the list of homes
 *                 content:
 *                      application/json:
 *                          schema:
 *                            type: array
 *                            items:
 *                              $ref: '#/components/schemas/Get_all_homes'
 *              404:
 *                 description: Data not found
 *
 */


// swagger schema get single homes
/**
 * @swagger
 * components:
 *  schemas:
 *    Get_single_homes:
 *      type: object
 *      required:
 *          - id
 *      properties:
 *          id:
 *              type: string
 *      example:
 *             id: ID of a registered home
 */

/**
 * @swagger
 * /home/get-single-home/{id}:
 *   post:
 *    summary: Get single home by id
 *    tags: [Homes]
 *    security:
 *          - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The home id
 *    responses:
 *       200:
 *        description: the list of homes
 *        content:
 *             application/json:
 *                schema:
 *                   $ref: '#/components/schemas/Get_single_homes'
 *       404:
 *          description: Data not found
 *
 */

// swagger schema for update single homes
/**
 * @swagger
 * /home/update-single-home/{id}:
 *   post:
 *    summary: Update single home by id
 *    tags: [Homes]
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *         required: true
 *         content:
 *              multipart/form-data:
 *                  schema:
 *                      schema:
 *                      type: object
 *                      required:
 *                           - home_name
 *                           - owner_name
 *                           - owner_email
 *                           - owner_phoneNo
 *                           - home_desc
 *                           - home_image
 *                           - owner_image
 *                           - price
 *                           - location
 *                      properties:
 *                        home_name:
 *                           type: string
 *                        owner_name:
 *                           type: string
 *                        owner_email:
 *                           type: string
 *                        owner_phoneNo:
 *                           type: string
 *                        home_desc:
 *                           type: string
 *                        home_image:
 *                           type: array
 *                           items:
 *                             type: string
 *                             format: binary
 *                        owner_image:
 *                           type: string
 *                           format: binary
 *                        price:
 *                           type: number
 *                        location:
 *                           type: string
 *                        home_city:
 *                           type: string
 *                        home_state:
 *                           type: string
 *                        home_zipCode:
 *                           type: number
 *                        latitude:
 *                           type: number
 *                        longitude:
 *                           type: number
 *                        total_guests:
 *                           type: number
 *                        total_beds:
 *                           type: number
 *                        total_bedroom:
 *                           type: number
 *                        total_bathroom:
 *                           type: number
 *                        rating:
 *                           type: number
 *                        this_place_offers:
 *                           type: array
 *                        property_type:
 *                           type: string
 *                        type_of_place:
 *                           type: string
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The home id
 *    responses:
 *       200:
 *        description: the list of homes
 *        content:
 *             application/json:
 *                schema:
 *                   $ref: '#/components/schemas/Create_homes'
 *       404:
 *          description: Data not found
 */

// swagger schema for delete single homes
/**
 * @swagger
 * /home/delete-single-home/{id}:
 *   delete:
 *    summary: Delete single home by id
 *    tags: [Homes]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The home id
 *    responses:
 *       200:
 *        description: the list of homes
 *        content:
 *             application/json:
 *                schema:
 *                   $ref: '#/components/schemas/Get_single_homes'
 *       404:
 *          description: Data not found
 *
 */

// swagger schema favourite homes
/**
 * @swagger
 * /home/add-to-favourite/{id}:
 *   post:
 *    summary: Get single home by id
 *    tags: [Homes]
 *    security:
 *          - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The home id
 *    responses:
 *       200:
 *        description: the list of homes
 *        content:
 *             application/json:
 *                schema:
 *                   $ref: '#/components/schemas/Get_single_homes'
 *       404:
 *          description: Data not found
 *
 */




