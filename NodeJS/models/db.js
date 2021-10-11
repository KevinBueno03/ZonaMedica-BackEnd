const mongoose = require('mongoose');

const mongoAtlasUri =
"mongodb+srv://kevinB:ztATZ4gDvaR7QwN@primary.utyi1.mongodb.net/ZonaMedica?retryWrites=true&w=majority";

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected"),
  );
} catch (e) {
  console.log("could not connect");
}

module.exports = mongoose;


//////
require ('./user.model');
