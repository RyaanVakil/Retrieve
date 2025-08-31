import mongoose from "mongoose";

const fileSchema = mongoose.Schema(
    {
        url: {
            type: String,
        },
        originalName: {
            type: String,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        public_id: {
            type: String,
        },
        uploadTimestamp: { type: Date },
        expiryTimestamp: Date,
    },
    { timestamps: true }
);

export const File = mongoose.model("File", fileSchema);