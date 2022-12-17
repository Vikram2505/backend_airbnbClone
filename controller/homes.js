import mongoose from "mongoose";
import HomeSchema from "../models/AddHomeModel.js";

// @desc        Create new home
// @route       POST /home/create-home
export const Create_Home = async (req, res) => {
  const HomeData = req.body;
  const NewHome = new HomeSchema({
    ...HomeData,
    creator: req.userId,
    deleted: false,
    created_at: new Date().toISOString(),
  });
  try {
    await NewHome.save();
    res.status(201).json({
      status: "success",
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
    minPrice,
    maxPrice,
    typeOfPlace,
    bedrooms,
    beds,
    bathroom,
    propertyType,
    amenities,
  } = req.body;
  //   console.log(req.body);
  try {
    const limit = dataLimit;
    const startIndex = (Number(pageNo) - 1) * limit;
    const total = await HomeSchema.countDocuments({});
    if (
      dataLimit &&
      pageNo &&
      minPrice === "" &&
      maxPrice === "" &&
      typeOfPlace === "" &&
      bedrooms === "" &&
      beds === "" &&
      bathroom == "" &&
      propertyType === "" &&
      amenities === ""
    ) {
      console.log("first condition");
      const AllHomes = await HomeSchema.find({ deleted: false })
        .limit(limit)
        .skip(startIndex)
        .sort({ _id: -1 })
        .select(
          "home_name location total_guest total_beds total_bedroom total_bathroom price thumbnail_image rating this_place_offers"
        )
        .exec();
      res.status(200).json({
        currentPage: Number(pageNo),
        //   count: total,
        numberOfPages: Math.ceil(total / limit),
        count: AllHomes.length,
        AllHomes,
        status: "success",
      });
    } else {
      console.log("second condition");
      // if(bedrooms &&){
      let AllHomes = await HomeSchema.find({
        $or: [
          { total_bedroom: { $in: bedrooms } },
          { total_beds: { $in: beds } },
          { total_bathroom: { $in: bathroom } },
          { total_beds: { $in: beds } },
          { total_beds: { $in: beds } },

        ],
      })
        .limit(limit)
        .skip(startIndex)
        .sort({ _id: -1 });
      if (AllHomes.length > 0) {
        res.status(200).json({
          currentPage: Number(pageNo),
          numberOfPages: Math.ceil(total / limit),
          count: AllHomes.length,
          AllHomes,
          status: "success",
        });
      } else {
        res.status(404).json({
          status: "failed",
          message: "Try to modify query to get results",
        });
      }
      // }
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
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
 * @desc    search home by query
 * @route   GET /home/search-home?keyword=
 */
export const Search_Homes = async (req, res) => {
  const { keyword } = req.query;
  try {
    const title = new RegExp(keyword, "i");
    const search = await HomeSchema.find({ home_name: title })
      .select(
        "home_name location total_guest total_beds total_bedroom total_bathroom price thumbnail_image rating this_place_offers"
      )
      .exec();
    res.status(200).json({
      count: search.length,
      search,
      status: "success",
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: req.message,
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
