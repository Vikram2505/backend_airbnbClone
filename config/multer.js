import multer from "multer";

const storage = multer.diskStorage({
    destination: ("uploads"),
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now()+'_' + file.originalname);
    },
  });
  // const fileFilter = (req, res, cb) => {
  //   if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
  //       cb(null, true)
  //   }else{
  //       cb({message: 'Unsupported file format'}, false)
  //   }
  // }
  const upload = multer({
    storage: storage, 
    // fileFilter: fileFilter,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
  });

  export default upload;