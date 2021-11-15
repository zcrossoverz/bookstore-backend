const config = {
    app: {
        port: process.env.PORT || 8080,
        origins: [
            "http://localhost:8081"
        ]
    }
};

module.exports = config;