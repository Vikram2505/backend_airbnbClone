// define require
import {ErrorHandler} from "../_helpers/errorHandler.js";
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

import cloudinary from "cloudinary";

cloudinary.config({
    secure: true,
    cloud_name: "dhqhupgw2",
    api_key: "872844264563622",
    api_secret: "wah5x4YBIB8JhJCQE63gShhAv5k",
  });

  const uploadToCloudinary = async(fileString, format)=> {
    try{
        const {uploader} = cloudinary.v2;
        const res = await uploader.upload(fileString);
        return res;
    }catch(err){
        throw new ErrorHandler(500, err)
    }
  }
  export default uploadToCloudinary;