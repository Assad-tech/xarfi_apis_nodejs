import Style from "../models/Style.js";

export const index = async (req, res) => {
  const styles = await Style.find().populate("master").lean();

  // .populate("services_id")
  //   .lean();
  res.status(200).json({
    status: 1,
    data: styles,
    message: "Style fetched successfully.",
  });
};

export const store = async (req, res) => {
  try {
    const { name, master } = req.body;

    const images = req.files?.map((file) => file.filename) || [];

    const style = await Style.create({
      owner: req.user._id,
      images,
      name,
      master,
    });

    res.status(201).json({
      status: 1,
      data: style,
      message: "Style created successfully.",
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const styles = await Style.findByIdAndDelete(req.params.id);

    // console.log(style);

    if (!styles) {
      return res.status(404).json({
        status: 0,
        message: "Style not found.",
      });
    }

    // if (style.images) {
    //   const imagePath = path.resolve(style.images);
    //   console.log(imagePath);
    //   if (fs.existsSync(imagePath)) {
    //     fs.unlinkSync(imagePath);
    //   }
    // }

    res.status(200).json({
      status: 1,
      data: styles,
      message: "style deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};
