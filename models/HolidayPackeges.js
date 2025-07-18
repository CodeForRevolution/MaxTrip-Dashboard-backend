const mongoose = require("mongoose")

const ItineraryDaySchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  activities: [
    {
      type: String,
    },
  ],
  meals: [
    {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner"],
    },
  ],
  accommodation: {
    type: String,
  },
})

const HolidayPackageSchema = new mongoose.Schema(
  {
    headline: {
      type: String,
      required: true,
      trim: true,
    },
    days: {
      type: String,
      required: true,
    },
    bestPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    maxPrice: {
      type: Number,
      min: 0,
    },
    starting: {
      type: String,
      trim: true,
    },
    rating : {
      type: String,
      
    },
    cityRoute: {
      type: String,
      required: true,
      trim: true,
    },
    featureImage: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      trim: true,
    },
    featured: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    showInSlider: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    packageCategory: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      trim: true,
    },
    
    // Rich text content fields
    highlights: {
      type: String,
      default: "",
    },
    meals: {
      type: String,
      default: "",
    },
    transfer: {
      type: String,
      default: "",
    },
    hotel: {
      type: String,
      default: "",
    },
    sightseeing: {
      type: String,
      default: "",
    },
    shortDescription: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      unique: true,
    },
    longDescription: {
      type: String,
      default: "",
    },
    cancellationPolicies: {
      type: String,
      default: "",
    },
    
    // Additional fields from the form
    extraTitle: {
      type: String,
      trim: true,
    },
    extraFile: {
      type: String,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
    metaKeywords: {
      type: String,
      trim: true,
    },
    
    // Legacy fields (keeping for backward compatibility)
    address: {
      type: String,
      trim: true,
    },
    overview: {
      type: String,
    },
    
   
    itinerary: [ItineraryDaySchema],
    inclusions: [
      {
        type: String,
      },
    ],
    exclusions: [
      {
        type: String,
      },
    ],
    termsAndConditions: 
      {
        type: String,
      },
    
    highlights_array: [
      {
        type: String,
      },
    ],
  
  
    isActive: {
      type: Boolean,
      default: true,
    },
    
    tags: [
      {
        type: String,
      },
    ],
 
  },
  {
    timestamps: true,
  },
)

// Index for better search performance
HolidayPackageSchema.index({ packageCategory: 1, isActive: 1 })
HolidayPackageSchema.index({ bestPrice: 1 })
HolidayPackageSchema.index({ "rating.average": -1 })
HolidayPackageSchema.index({ featured: 1 })
HolidayPackageSchema.index({ showInSlider: 1 })

module.exports = mongoose.model("HolidayPackage", HolidayPackageSchema)
