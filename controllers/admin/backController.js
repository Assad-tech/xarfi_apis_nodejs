import Bank from "../../models/Bank.js";

export const index = async (req, res) => {
  const bank = await Bank.find();

  res.status(200).json({
    status: 1,
    data: bank,
    message: "Service Category fetched successfully.",
  });
};

export const store = async (req, res) => {
  try {
    // console.log(req.body);

    const { name } = req.body;

    const bank = await Bank.create({
      name,
    });

    res.status(201).json({
      status: 1,
      data: bank,
      message: "Bank created successfully.",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const show = async (req, res) => {
  const bank = await Bank.findById(req.params.id);
  if (!bank) {
    return res.status(404).json({ error: "Bank not found" });
  }

  res.status(200).json({
    status: 1,
    data: bank,
    message: "Bank fetched successfully.",
  });
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;

    const bank = await Bank.findByIdAndUpdate(req.params.id, {
      name,
      new: true,
    });

    res.status(200).json({
      status: 1,
      data: bank,
      message: "Service Category updated successfully.",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const bank = await Bank.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 1,
      data: bank,
      message: "Service Category deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
