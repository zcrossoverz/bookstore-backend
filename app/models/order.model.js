module.exports = mongoose => {
    const schema = mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        order: [
            {
                id: {
                    type: String
                },
                title: {
                    type: String
                },
                cover: {
                    type: String
                },
                time_order: {
                    type: Date
                },
                number: {
                    type: Number
                },
                price: {
                    type: Number
                },
                total: {
                    type: Number
                }
            }
        ]
    },
    {
        timestamps: true
    });
    return mongoose.model("order", schema);
}