const HolidayPackage = require("../models/HolidayPackeges");


const  createPackeges=async(req,res)=>{
   try {
    const packageData = req.body

   

    const newPackage = await HolidayPackage.create(packageData)

    res.status(201).json({
      success: true,
      message: "Package created successfully",
      data: newPackage,
    })
  } catch (error) {
    console.error("Create package error:", error)
    res.status(400).json({
      success: false,
      message: "Failed to create package",
      error: error.message,
    })
  }
}
const updatePackeges=async(req,res)=>{
    const { id } = req.params

  try {
   

    const updatedPackage = await HolidayPackage.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

    if (!updatedPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Package updated successfully",
      data: updatedPackage,
    })
  } catch (error) {
    console.error("Update package error:", error)
    res.status(400).json({
      success: false,
      message: "Failed to update package",
      error: error.message,
    })
  }
}

const deletePackeges=async(req,res)=>{
   const { id } = req.params

  try {
 

    const deletedPackage = await HolidayPackage.findByIdAndDelete(id)

    if (!deletedPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Package deleted successfully",
      data: deletedPackage,
    })
  } catch (error) {
    console.error("Delete package error:", error)
    res.status(400).json({
      success: false,
      message: "Failed to delete package",
      error: error.message,
    })
  }
}
const getPackeges=async(req,res)=>{
    try {
    const {
      page = 1,
      limit = 10,
      category,
      minPrice,
      maxPrice,
      featured,
      sortBy = "createdAt",
      sortOrder = "desc",
      search,
    } = req.query

    // Build filter object
    const filter = { isActive: true }

    if (category) filter.category = category
    if (featured !== undefined) filter.featured = featured === "true"
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }
    if (search) {
      filter.$or = [
        { headline: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
        { overview: { $regex: search, $options: "i" } },
      ]
    }

    // Build sort object
    const sort = {}
    sort[sortBy] = sortOrder === "desc" ? -1 : 1

    const skip = (Number(page) - 1) * Number(limit)

    const packages = await HolidayPackage.find(filter).sort(sort).skip(skip).limit(Number(limit))

    const total = await HolidayPackage.countDocuments(filter)

    res.status(200).json({
      success: true,
      message: "Packages fetched successfully",
      data: packages,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
        itemsPerPage: Number(limit),
      },
    })
  } catch (error) {
    console.error("Get packages error:", error)
    res.status(400).json({
      success: false,
      message: "Failed to fetch packages",
      error: error.message,
    })
  }
}

module.exports={createPackeges,updatePackeges,deletePackeges,getPackeges}