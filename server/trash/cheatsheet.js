// 1. Require Mongoose
const mongoose = require('mongoose');

// 2. Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// 3. Define Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  username: { type: String, unique: true }
});

// 4. Create Model
const User = mongoose.model('User', userSchema);

// ======================
// 🔵 CREATE
// ======================

// (1) Create and save (2 lines)
const newUser = new User({ name: 'Alice', age: 25, username: 'alice@example.com' });
await newUser.save();

// (2) Create directly (shortcut - 1 line)
const user = await User.create({ name: 'Bob', age: 30, username: 'bob@example.com' });

// ======================
// 🟢 READ (FIND)
// ======================

// (1) Find all users
const users = await User.find();

// (2) Find one user by condition
const oneUser = await User.findOne({ name: 'Alice' });

// (3) Find by ID
const userById = await User.findById('64e4f50c2a8b2f0012a4d9a5');

// ======================
// 🟠 UPDATE
// ======================

// (1) Find and update by ID
const updatedUser = await User.findByIdAndUpdate(
  '64e4f50c2a8b2f0012a4d9a5',//_id value in mongo db
  { age: 26 },// data to update
  { new: true } // returns updated document
);
// using any other key
  const updatedUse = await User.findOneAndUpdate(
    { username: req.params.username },// find entry using username in DB 
    { name: req.body.name },// data to update
    { new: false }// returns non-updated document
  );

// (2) Update many users
await User.updateMany({ age: { $lt: 18 } }, { age: 18 });

// ======================
// 🔴 DELETE
// ======================

// (1) Delete by ID
await User.findByIdAndDelete('64e4f50c2a8b2f0012a4d9a5');

// (2) Delete one by condition
await User.deleteOne({ name: 'Bob' });

// (3) Delete multiple users
await User.deleteMany({ age: { $gt: 60 } });

// ======================
// ⚙️ OTHER USEFUL METHODS
// ======================

// Count documents
const count = await User.countDocuments({});

// Sort and limit
const sortedUsers = await User.find().sort({ age: -1 }).limit(5);

// Pagination (skip + limit)
const paginated = await User.find().skip(10).limit(5);

// Schema options: default, minlength, maxlength, enum, match, validate, etc.
const productSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3 },
  price: { type: Number, min: 0 },
  category: { type: String, enum: ['books', 'clothing', 'tech'] }
});



//LOGIN CODE
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  // 1. Find user by username
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ error: "User not found" });

  // 2. Compare the plain password with the hashed one in DB
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid password" });

  // 3. Create JWT token (optional but recommended)
  // jwt.sign(payload, secretOrPrivateKey, [options, callback])

  const token = jwt.sign(
    { userId: user._id },          // payload (data you want to encode)
    process.env.JWT_SECRET,        // secret key from environment variable
    { expiresIn: '1h' }            // options
  );  

  // 4. Send success response (with or without token)
  res.json({ message: "Login successful", token });
});

// MiddleWare 
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token is present and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // throws if invalid or expired

    // Attach decoded payload to request object (e.g. userId)
    req.user = decoded;

    next(); // Pass control to next middleware or route
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};