const mongoose = require("mongoose");
const URI = process.env.URI;

const connection = async () => {
    try {
        
        const conn = await mongoose.connect(URI, {
            useUnifiedTopology: true,
        });
        console.log(`mongodb database is conencted ${conn.connection.host}`.bgBlue.bold);


    } catch (error) {
        console.log(`error in database connection, ${error.message}`.yellow.bold);
        process.exit();
    }
}

module.exports = connection;
