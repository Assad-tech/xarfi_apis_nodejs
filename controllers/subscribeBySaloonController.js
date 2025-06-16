import SubscribeBySaloon from "../models/SubscribeBySaloon.js";
import Subscription from "../models/Subscription.js";

export const createSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.body;

    // if (!["monthly", "yearly"].includes(planType)) {
    //   return res.status(400).json({ message: "Invalid plan type" });
    // }

    const subcriptionPlan = await Subscription.findById(subscriptionId);

    if (!subcriptionPlan) {
      res.status(404).json({
        message: "subcription is not valid",
      });
    }

    // console.log(subcriptionPlan.planType);
    const planType = subcriptionPlan.planType;
    const startDate = new Date();
    const nextBillingDate = new Date();

    // Set billing date 2 or 3 months later
    planType === "monthly"
      ? nextBillingDate.setMonth(startDate.getMonth() + 2)
      : nextBillingDate.setMonth(startDate.getMonth() + 3);

    const subscribeBySaloon = await SubscribeBySaloon.create({
      owner: req.user._id,
      subscriptionId,
      startDate,
      nextBillingDate,
      active: true,
    });

    res.status(201).json({
      status: "success",
      data: subscribeBySaloon,
      message: "Subscription created by successfully.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPlanOptions = async (req, res) => {
  const PlanOptions = await Subscription.find();

  res.status(200).json({
    status: 1,
    data: PlanOptions,
    message: "Plan Options fetched successfully.",
  });
};
