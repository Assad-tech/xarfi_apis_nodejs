// models/Salon.js
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

const salonSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    images: {
      type: [String], // image URLs or filenames
      validate: [arrayLimit, "Maximum 6 images allowed"],
    },

    name: { type: String, required: true },

    businessEmail: { type: String },
    businessPhone: { type: String },

    location: {
      lat: { type: Number },
      lng: { type: Number },
      address: { type: String },
    },

    businessRegNo: { type: String },
    gstVatNo: { type: String },

    teamSize: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TeamSize",
      require: true,
    },

    paymentMode: {
      type: String,
      enum: ["Cash Only", "Card Only", "Both"],
      required: true,
    },

    sameTimingForAllDays: { type: Boolean, default: true },

    generalTiming: {
      timing: timeRangeSchema,
      lunchBreak: timeRangeSchema,
    },

    specificDailyTimings: [dailyTimingSchema],
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length <= 6;
}

salonSchema.plugin(mongoosePaginate);

salonSchema.virtual("services", {
  ref: "Service", // model to use
  localField: "_id", // field in Category
  foreignField: "salon", // field in Product
});

salonSchema.set("toObject", { virtuals: true });
salonSchema.set("toJSON", { virtuals: true });

salonSchema.virtual("masters", {
  ref: "Master", // model to use
  localField: "_id", // field in Category
  foreignField: "salon", // field in Product
});

salonSchema.set("toObject", { virtuals: true });
salonSchema.set("toJSON", { virtuals: true });

salonSchema.virtual("styles", {
  ref: "Style", // model to use
  localField: "_id", // field in Category
  foreignField: "salon", // field in Product
});

salonSchema.set("toObject", { virtuals: true });
salonSchema.set("toJSON", { virtuals: true });

salonSchema.virtual("products", {
  ref: "Product", // model to use
  localField: "_id", // field in Category
  foreignField: "salon", // field in Product
});

salonSchema.set("toObject", { virtuals: true });
salonSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Salon", salonSchema);
