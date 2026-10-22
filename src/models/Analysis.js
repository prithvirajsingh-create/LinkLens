
const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
            index: true
        },

        htmlInfo: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },

        seo: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },

        linkChecks: {
            type: [mongoose.Schema.Types.Mixed],
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Analysis", analysisSchema);
