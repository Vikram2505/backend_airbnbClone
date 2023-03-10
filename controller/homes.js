import mongoose from "mongoose";
import HomeSchema from "../models/AddHomeModel.js";
// import renameKeys from "../_helpers/renameKeys.js";
// import uploads from "../config/cloudinary.js"
// import fs from "fs";

// define require
import { createRequire } from "module";
import { ErrorHandler } from "../_helpers/errorHandler.js";
import uploadToCloudinary from "../config/cloudinaryConfig.js";
const require = createRequire(import.meta.url);

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  secure: true,
  cloud_name: "dhqhupgw2",
  api_key: "872844264563622",
  api_secret: "wah5x4YBIB8JhJCQE63gShhAv5k",
});

// @desc        Create new home
// @route       POST /home/create-home
export const Create_Home = async (req, res) => {
  const HomeData = req.body;
  let homeImage = [];
  try {
    const { home_image, owner_image } = req.body;
    if (home_image === "") throw new ErrorHandler(400, "Home image is required");
    if (owner_image === "") throw new ErrorHandler(400, "Owner image is required");

    if(home_image.length > 1){
      let image = home_image.map(async (img) => {
       let imageUrl = await uploadToCloudinary(img);
       homeImage.push(imageUrl.secure_url)
      })
      await Promise.all(image)
    }else{
      let image = await uploadToCloudinary(home_image[0]);
      homeImage = image.secure_url;
    }

    let ownerImage = await uploadToCloudinary(owner_image[0]);
    
    //receive uploaded home images
    // const homeImages = req?.files;
    // const ownerImage = req?.files?.owner_image;
    // if (homeImages === null) {
    //   throw new Error("Please upload image");
    // }

    // const renamedObj = renameKeys(homeImages, { "home_image[]": "home_image" });
    // const newHomeData = renameKeys(req.body, {
    //   "this_place_offers[]": "this_place_offers",
    // });

    // if (renamedObj?.size > 1000000 || ownerImage?.size > 1000000) {
    //   throw new Error("Image size must less than 1Mb");
    // }

    // check if image size is less than 2
    // if (
    //   renamedObj?.home_image.length === undefined ||
    //   renamedObj?.home_image.length < 2
    // ) {
    //   throw new Error("Atleast 2 images need to upload");
    // }

    // multiple homes image upload
    // let multipleHomeImages = await renamedObj.home_image.map((image) =>
    //   cloudinary.uploader.upload(image.tempFilePath)
    // );
    // let imageResponses = await Promise.all(multipleHomeImages);
    // imageResponses.map((url) => {
    //   homeImage.push(url.secure_url);
    // });

    // Delete temp folder created at uploading file
    // fs.rm("tmp", { recursive: true, force: true }, (err) => {
    //   if (err) {
    //     console.log(err, "attempt to delete temp folder");
    //   }
    //   console.log("tmp folder is deleted!");
    // });

    // upload single owner image
    // let ownerImageUpload =
    //   ownerImage === undefined
    //     ? ""
    //     : await cloudinary.uploader.upload(ownerImage.tempFilePath);

    const NewHome = new HomeSchema({
      ...HomeData,
      creator: req.userId,
      home_image: homeImage,
      owner_image: ownerImage.secure_url,
      deleted: false,
      created_at: new Date().toISOString(),
    });

    await NewHome.save();
    res.status(201).json({
      status: "success",
      NewHome,
      message: "New home is created successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

// @desc        Show All home
// @route       POST /home/get-all-homes
export const Get_All_Homes = async (req, res) => {
  const {
    dataLimit,
    pageNo,
    keyword,
    minPrice,
    maxPrice,
    typeOfPlace,
    bedrooms,
    beds,
    bathroom,
    propertyType,
    amenities,
  } = req.body;
  let AllHomes = [];
  let total = null;
  try {
    const limit = dataLimit;
    const startIndex = (Number(pageNo) - 1) * limit;
    total = await HomeSchema.countDocuments({});

    if (minPrice !== "" || maxPrice !== "" || keyword !== "") {
      console.log("entered");
      const title = new RegExp(keyword, "i");
      let result = await HomeSchema.find(
        {
          deleted: false,
          location: title,
          price: { $gt: minPrice, $lt: maxPrice },
        },
        {
          location: { $eq: title },
        }
      )
        .limit(limit)
        .skip(startIndex)
        .select(
          "home_name location favourite total_beds type_of_place home_city total_bedroom total_bathroom price home_image rating this_place_offers"
        )
        .exec();
      // console.log(result);
      total = await HomeSchema.find({
        deleted: false,
        // location: title,
        price: { $gt: minPrice, $lt: maxPrice },
      })
        .count()
        .exec();

      result.map((item) => {
        AllHomes.push(item);
      });
    }

    if (keyword !== "") {
      const title = new RegExp(keyword, "i");
      let result = await HomeSchema.find({
        deleted: false,
        location: title,
      })
        .limit(limit)
        .skip(startIndex)
        .select(
          "home_name location favourite total_beds type_of_place home_city total_bedroom total_bathroom price home_image rating this_place_offers"
        )
        .exec();
      total = await HomeSchema.find({ deleted: false, location: title })
        .count()
        .exec();
      result.map((item) => {
        AllHomes.push(item);
      });
    }

    if (bedrooms !== "") {
      let result = await HomeSchema.find({
        deleted: false,
        total_bedroom: bedrooms,
      })
        .limit(limit)
        .skip(startIndex)
        .select(
          "home_name location favourite total_beds type_of_place home_city total_bedroom total_bathroom price home_image rating this_place_offers"
        )
        .exec();
      total = await HomeSchema.find({ deleted: false, total_bedroom: bedrooms })
        .count()
        .exec();
      result.map((item) => {
        AllHomes.push(item);
      });
    }

    if (bathroom !== "") {
      let result = await HomeSchema.find({
        deleted: false,
        total_bathroom: bathroom,
      })
        .limit(limit)
        .skip(startIndex)
        .select(
          "home_name location favourite total_beds type_of_place home_city total_bedroom total_bathroom price home_image rating this_place_offers"
        )
        .exec();
      total = await HomeSchema.find({
        deleted: false,
        total_bathroom: bathroom,
      })
        .count()
        .exec();
      result.map((item) => {
        AllHomes.push(item);
      });
    }

    if (beds !== "") {
      let result = await HomeSchema.find({
        deleted: false,
        total_beds: beds,
      })
        .limit(limit)
        .skip(startIndex)
        .select(
          "home_name location favourite total_beds type_of_place home_city total_bedroom total_bathroom price home_image rating this_place_offers"
        )
        .exec();
      total = await HomeSchema.find({ deleted: false, total_beds: beds })
        .count()
        .exec();
      result.map((item) => {
        AllHomes.push(item);
      });
    }

    if (typeOfPlace !== "") {
      let result = await HomeSchema.find({
        deleted: false,
        type_of_place: { $in: typeOfPlace },
      })
        .limit(limit)
        .skip(startIndex)
        .select(
          "home_name location favourite total_beds type_of_place home_city total_bedroom total_bathroom price home_image rating this_place_offers"
        )
        .exec();
      total = await HomeSchema.find({
        deleted: false,
        type_of_place: { $in: typeOfPlace },
      })
        .count()
        .exec();
      result.map((item) => {
        AllHomes.push(item);
      });
    }

    if (propertyType !== "") {
      let result = await HomeSchema.find({
        deleted: false,
        property_type: { $in: propertyType },
      })
        .limit(limit)
        .skip(startIndex)
        .select(
          "home_name location favourite total_beds type_of_place home_city total_bedroom total_bathroom price home_image rating this_place_offers"
        )
        .exec();
      total = await HomeSchema.find({
        deleted: false,
        property_type: { $in: propertyType },
      })
        .count()
        .exec();
      result.map((item) => {
        AllHomes.push(item);
      });
    }

    if (amenities !== "") {
      let result = await HomeSchema.find({
        deleted: false,
        this_place_offers: { $in: amenities },
      })
        .limit(limit)
        .skip(startIndex)
        .select(
          "home_name location total_beds favourite type_of_place home_city total_bedroom total_bathroom price home_image rating this_place_offers"
        )
        .exec();
      total = await HomeSchema.find({
        deleted: false,
        this_place_offers: { $in: amenities },
      })
        .count()
        .exec();

      result.map((item) => {
        AllHomes.push(item);
      });
    }

    if (
      bedrooms === "" &&
      bathroom === "" &&
      beds === "" &&
      keyword === "" &&
      minPrice === "" &&
      maxPrice === "" &&
      typeOfPlace.length === 0 &&
      propertyType.length === 0 &&
      amenities.length === 0
    ) {
      console.log("request body empty");
      let result = await HomeSchema.find({
        deleted: false,
      })
        .limit(limit)
        .skip(startIndex)
        .select(
          "home_name location favourite total_beds type_of_place home_city total_bedroom total_bathroom price home_image rating this_place_offers"
        )
        .exec();
      total = await HomeSchema.find({
        deleted: false,
      })
        .count()
        .exec();
      AllHomes = result;
    }
    res.status(200).json({
      currentPage: Number(pageNo),
      count: total,
      numberOfPages: Math.ceil(total / limit),
      AllHomes,
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// @desc        Get all home registered by user
// @route       POST /home/get-user-registered-homes
export const Get_Each_User_Homes = async (req, res) => {
  const Id = req.userId;
  const { dataLimit, pageNo, keyword } = req.body;
  try {
    let total = null;
    let homeData = [];
    const limit = dataLimit;
    const startIndex = (Number(pageNo) - 1) * limit;
    if (keyword !== "") {
      const title = new RegExp(keyword, "i");
      let userHomes = await HomeSchema.find({
        deleted: false,
        creator: Id,
        home_city: title,
      })
        .limit(limit)
        .skip(startIndex)
        .select(
          "home_name location total_beds type_of_place home_city total_bedroom total_bathroom price home_image rating this_place_offers"
        )
        .exec();
      total = await HomeSchema.find({
        deleted: false,
        creator: Id,
        home_city: title,
      })
        .count()
        .exec();
      userHomes.map((item) => {
        homeData.push(item);
      });
    } else {
      const userHomes = await HomeSchema.find({ deleted: false, creator: Id })
        .limit(limit)
        .skip(startIndex)
        .select(
          "home_name location total_beds type_of_place home_city total_bedroom total_bathroom price home_image rating this_place_offers"
        )
        .exec();
      total = await HomeSchema.find({ deleted: false, creator: Id })
        .count()
        .exec();
      homeData = userHomes;
    }

    res.status(200).json({
      count: total,
      currentPage: Number(pageNo),
      numberOfPages: Math.ceil(total / limit),
      homeData,
      status: "success",
    });
  } catch (error) {
    res.status(404).json({
      message: "Something went wrong.",
      status: error.message,
    });
  }
};

/**
 * @desc        Show Single home detail by ID
 * @route       POST /home/get-single-home/:id
 */
export const Get_Single_Home = async (req, res) => {
  const { id } = req.params;
  try {
    const SingleHome = await HomeSchema.findById(id);
    res.status(200).json({
      SingleHome,
      status: "success",
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

/**
 * @desc    Update single home by id
 * @route   POST /home/update-single-home/:id
 */
export const Update_Single_Home = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "failed",
        message: `No tour exists with id: ${id}`,
      });
    }
    await HomeSchema.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json({
      status: "success",
      message: "Tour updated successfully",
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

/**
 * @desc    Delete single home by id
 * @route   POST /home/delete-single-home/:id
 */
export const Delete_Single_Home = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "failed",
        message: `No tour exists with id: ${id}`,
      });
    }
    const DeletedHome = await HomeSchema.findByIdAndUpdate(
      id,
      { deleted: true },
      {
        new: true,
      }
    );

    res.status(201).json({
      DeletedHome,
      status: "success",
      message: "Home deleted Successfully",
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

/**
 * @desc    Add your home to favourite
 * @route   POST /home/add-to-favourite/:id
 */
export const Add_to_Favourite = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.userId) {
      return res.status(404).json({
        status: "failed",
        message: "User is not authenticated",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No home exists with id: ${id}` });
    }
    const FavouriteHome = await HomeSchema.findById(id);
    const index = FavouriteHome.favourite.findIndex(
      (id) => id === String(req.userId)
    );
    if (index === -1) {
      FavouriteHome.favourite.push(req.userId);
    } else {
      FavouriteHome.favourite = FavouriteHome.favourite.filter(
        (id) => id !== String(req.userId)
      );
    }
    await HomeSchema.findByIdAndUpdate(id, FavouriteHome, { new: true });
    res.status(201).json({
      status: "success",
      message: "Added to Favourite",
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const UploadImage = async (req, res, next) => {
  try {
    let homeImage = [];
    const { home_image } = req.body;
    if (home_image === "") throw new ErrorHandler(400, "Image is required");
    if(home_image.length > 1){
      let image = home_image.map(async (img) => {
       let imageUrl = await uploadToCloudinary(img);
       homeImage.push(imageUrl.secure_url)
      })
      await Promise.all(image)
    }else{
      let image = await uploadToCloudinary(home_image[0]);
      homeImage = image.secure_url;
    }
    res
      .status(200)
      .json({
        message: "Upload successfully",
        homeImage: homeImage,
      });
  } catch (err) {
    next(new ErrorHandler(err.statusCode || 500, err.message));
  }
};
