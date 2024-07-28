const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://worknlearn1:pass1234qwer@cluster0.69lyfhk.mongodb.net/foodapp?retryWrites=true&w=majority&appName=Cluster0";


async function mongoDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB!");

    const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
    global.food_items=fetched_data;
    const food_Category=  await mongoose.connection.db.collection("foodCategory").find({}).toArray();
    global.foodCategory=food_Category;
    // global.foodCategory=food_Category;

    // console.log("Fetched data:", global.food_items);

  } catch (error) {
    console.error("Error in database connection:", error);
  }
}


module.exports = mongoDB;
