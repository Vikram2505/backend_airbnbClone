import jwt from "jsonwebtoken";
// import UserModel from "../models/UserModel.js";

const secret = "test";

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token || token === undefined) {
    return res.status(401).json({
      timestramp: new Date(),
      status: 401,
      error: "Unauthorized access",
      message: "Full authentication is required to access this resource",
    });
  }

  try {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: "token is expired",
        });
      }
    });
    const isCustomAuth = token?.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      console.log(decodedData);
      req.userId = decodedData?.id;
      req.role = decodedData?.role;
      
      if (decodedData.userBlocked) {
        return res
          .status(404)
          .json({ error: "Failed", message: "user blocked" });
      }
    } else {
      // decodedData = jwt.decode(token, secret);
      // const googleId = decodedData?.sub.toString();
      // const user = await UserModal.findOne({ googleId });
      // req.userId = user?._id;
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;
