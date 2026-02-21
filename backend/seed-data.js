const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const products = [
  {
    name: "Samsung Galaxy S23 Ultra",
    brand: "Samsung",
    description: "8K Camera, 256GB Storage, 12GB RAM",
    price: 124999,
    category: "Electronics",
    subcategory: "Mobiles",
    images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c"],
    countInStock: 10,
    rating: 4.5,
    numReviews: 120,
    highlights: ["1 Year Warranty", "Free Delivery", "7 Days Replacement"]
  },
  {
    name: "Men's Casual Shirt",
    brand: "US Polo",
    description: "Cotton Blend, Regular Fit",
    price: 1899,
    category: "Fashion",
    subcategory: "Men's Clothing",
    images: ["https://images.unsplash.com/photo-1598033121414-5e17e5b9e6b1"],
    countInStock: 50,
    rating: 4.2,
    numReviews: 85,
    highlights: ["Free Delivery", "30 Days Return"]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Database seeded!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();