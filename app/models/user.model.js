module.exports = mongoose => {
    const schema = mongoose.Schema({
        username:{
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
        address: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: "+84"
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
        
    },
    {
        timestamps: true
    });
    return mongoose.model("user", schema);
}