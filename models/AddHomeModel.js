import mongoose from "mongoose";

const AddHomeSchema = mongoose.Schema({
    home_name: {
        type: String,
        required: true,
        trim: true
    },
    home_desc: String,
    creator: String,
    // tags: [String],
    created_at: {
        type: Date,
        default: new Date()
    },
    home_image: {
        type: [String],
        required: true,
    },
    thumbnail_image: {
        type: String,
        required: true
    },
    owner_image: String,
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    latitude: Number,
    longitude: Number,
    total_guests: Number,
    total_beds: Number,
    total_bedroom: Number,
    total_bathroom: Number,
    rating: Number,
    this_place_offers: [String],
    deleted: false,
    favourite: {
        type: [String],
        default: []
    },
    property_type: {
        type: [String],
        default: []
    },
    type_of_place: {
        type: String,
    }

})

export default mongoose.model("Airbnb_Homes", AddHomeSchema);