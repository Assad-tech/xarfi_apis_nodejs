import TeamSize from "../models/TeamSize.js";

// import teamSizeValidationSchema from "../validators/teamSizeValidators.js";

export const createTeamSize = async (req, res) => {
  // Validate request body
  // const { error } = teamSizeValidationSchema.validate(req.body);
  // if (error) {
  //   return res.status(400).json({ validationError: error.details[0].message });
  // }

  // console.log(name);
  try {
    const { name } = req.body;
    const teamSize = await TeamSize.create({
      name,
    });
    res.status(201).json({
      status: 1,
      data: teamSize,
      message: "Team size created successfully.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTeamSize = async (req, res) => {
  try {
    const teamSizes = await TeamSize.find().sort({ _id: 1 });
    res.status(200).json({
      status: 1,
      data: teamSizes,
      message: "Team size fetched successfully.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
