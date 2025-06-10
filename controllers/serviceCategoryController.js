import { ServiceCategory } from "../models/serviceCategory.js";

export const index = async (req, res) => {
  const serviceCategory = await ServiceCategory.find();

  res.status(200).json({
    status: 1,
    data: serviceCategory,
    message: "Service Category fetched successfully.",
  });
};

export const store = async (req, res) => {
  try {
    const { name } = req.body;

    const serviceCategory = await ServiceCategory.create({
      name,
    });

    res.status(201).json({
      status: 1,
      data: serviceCategory,
      message: "Service Category created successfully.",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const show = async (req, res) => {
  const serviceCategory = await ServiceCategory.findById(req.params.id);
  if (!serviceCategory) {
    return res.status(404).json({ error: "Service Category not found" });
  }

  res.status(200).json({
    status: 1,
    data: serviceCategory,
    message: "Service Category fetched successfully.",
  });
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;

    const serviceCategory = await ServiceCategory.findByIdAndUpdate(
      req.params.id,
      {
        name,
        new: true,
      }
    );

    res.status(200).json({
      status: 1,
      data: serviceCategory,
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
    const serviceCategory = await ServiceCategory.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      status: 1,
      data: serviceCategory,
      message: "Service Category deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
