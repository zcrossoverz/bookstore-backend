module.exports = mongoose => {
    const schema = mongoose.Schema({
        name:{
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        
    },
    {
        timestamps: true
    });
    return mongoose.model("user", schema);
}