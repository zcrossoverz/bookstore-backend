module.exports = mongoose => {
    const schema = mongoose.Schema({
        title:{
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            default: 0,
            required: true
        },
        cover: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required: true
        },
        hot: {
            type: Boolean,
            required: true,
            default: false
        }
        
    },
    {
        timestamps: true
    });
    return mongoose.model("product", schema);
}
