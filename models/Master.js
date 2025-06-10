import mongoose from "mongoose";

const timeRangeSchema = new mongoose.Schema(
  {
    start: { type: String }, // e.g. "09:00"
    end: { type: String }, // e.g. "18:00"
  },
  { _id: false }
);

const dailyTimingSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    open: { type: Boolean, default: false },
    timing: timeRangeSchema,
  },
  { _id: false }
);

const masterSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    image: {
      type: String, // image URLs or filenames
      required: true,
    },

    name: { type: String, required: true },

    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    access_password: { type: String, select: false },

    experience: { type: Number, required: true },

    sameTimingForAllDays: { type: Boolean, default: true },

    generalTiming: {
      timing: timeRangeSchema,
      lunchBreak: timeRangeSchema,
    },

    specificDailyTimings: [dailyTimingSchema],

    services_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        default: null,
      },
    ],

    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Master", masterSchema);
