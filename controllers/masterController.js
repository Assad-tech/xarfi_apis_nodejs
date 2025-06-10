import bcrypt from "bcryptjs";
import Master from "../models/Master.js";

export const index = async (req, res) => {
  // const master = await ServiceCategory.find().lean();
  const masters = await Master.find()
    .populate("services_id") // populates with related Service documents
    .lean();
  //   console.log(master);

  // const mastersWithImageUrl = masters.map(master => ({
  //   ...master,
  //   image_url: master.image ? `${baseUrl}${master.image.replace(/\\/g, "/")}` : null
  // }));

  res.status(200).json({
    status: 1,
    data: masters,
    message: "Master fetched successfully.",
  });
};

export const store = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      experience,
      sameTimingForAllDays,
      specificDailyTimings,
      services_id,
    } = req.body;

    // console.log("Uploaded File:", req.file);
    const hashed = await bcrypt.hash(password, 10);
    const imagePath = req.file ? req.file.path : null;

    const master = await Master.create({
      owner: req.user._id,
      name,
      email,
      password: hashed,
      access_password: password,
      experience,
      sameTimingForAllDays,
      specificDailyTimings,
      services_id,
      image: imagePath,
    });

    res.status(201).json({
      status: 1,
      data: master,
      message: "Master created successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const master = await Master.findByIdAndDelete(req.params.id);

    if (!master) {
      return res.status(404).json({
        status: 0,
        message: "Master not found.",
      });
    }

    // ✅ Delete the image file if it exists
    // if (master.image) {
    //   const imagePath = path.resolve(master.image);
    //   if (fs.existsSync(imagePath)) {
    //     fs.unlinkSync(imagePath);
    //   }
    // }

    res.status(200).json({
      status: 1,
      data: master,
      message: "Master deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};
