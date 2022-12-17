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
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    total_guest: Number,
    total_beds: Number,
    total_bedroom: Number,
    total_bathroom: Number,
    rating: Number,
    // type_of_place: String,
    // property_type: String,
    this_place_offers: [String],
    deleted: false,
    favourite: {
        type: [String],
        default: []
    },

})

export default mongoose.model("Homes", AddHomeSchema);