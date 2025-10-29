import Property from "../models/Property.js";

// 🏡 Create property (Host only)
export const createProperty = async (req, res) => {
  try {
    const { title, description, location, pricePerNight, type, amenities } = req.body;

    // ✅ Cloudinary URLs
    const imageUrls = req.files.map(file => file.path || file.filename || file.location);

    const property = new Property({
      title,
      description,
      location,
      pricePerNight,
      type,
      amenities: amenities ? amenities.split(",") : [],
      images: imageUrls,
      owner: req.user.id,
    });

    await property.save();
    res.status(201).json({ message: "Property created successfully", property });
  } catch (error) {
    console.error("Create Property Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🌍 Get all properties (public + filters)
export const getProperties = async (req, res) => {
  try {
    const { location, type, minPrice, maxPrice } = req.query;
    let filter = {};

    if (location) filter.location = new RegExp(location, "i");
    if (type) filter.type = type;
    if (minPrice || maxPrice)
      filter.pricePerNight = {
        ...(minPrice && { $gte: minPrice }),
        ...(maxPrice && { $lte: maxPrice }),
      };

    const properties = await Property.find(filter).populate("owner", "name email");
    res.json(properties);
  } catch (error) {
    console.error("Get Properties Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🏠 Get single property by ID (Public)
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("owner", "name email");
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    console.error("Get Property By ID Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✏️ Update property (Host only)
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    if (property.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    // ✅ If new images uploaded, replace; else keep existing
    const imageUrls = req.files?.map(file => file.path || file.filename || file.location) || property.images;

    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      { ...req.body, images: imageUrls },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.error("Update Property Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🗑️ Delete property (Host only)
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    if (property.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await property.deleteOne();
    res.json({ message: "Property deleted" });
  } catch (error) {
    console.error("Delete Property Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get properties of logged-in host
export const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id });
    res.status(200).json(properties);
  } catch (error) {
    console.error("Get My Properties Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
