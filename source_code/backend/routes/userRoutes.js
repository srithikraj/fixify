const express = require("express")
const mongoose = require("mongoose")
const database = require("../connect")
const ObjectId = require("mongodb").ObjectId
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const ServiceProvider = require("../models/serviceProviderModel")
const Service = require("../models/serviceModel")
const { sendOTP, verifyOTP } = require("../controller/otpService");



let userRoutes = express.Router()

//////////////////////////////////////////////////////////////////////////
// Read Routes
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// Create Routes
//////////////////////////////////////////////////////////////////////////

/**
 * Request Type: POST 
 * URL: http://localhost:3000/users/login
 * Description: Verify user login info. Returns user info upon success.
*/

// userRoutes.route("/users").get(async (request, response) => {
//     let db = database.getDb()
//     let data = await db.collection("users").find({}).toArray()
//     response.json({ data })
// })

userRoutes.route("/users/login").post(async (request, response) => {
  try {
    let db = database.getDb();
    const user = await db.collection("users").findOne({ username: request.body.username });

    if (!user) {
      return response.status(404).json({ success: false, message: "Login Failed! User not found!" });
    }

    const confirmation = await bcrypt.compare(request.body.password, user.password);
    if (!confirmation) {
      return response.status(401).json({ success: false, message: "Login Failed! Incorrect Password!" });
    }

    if (!user.isVerified) {
      console.log(`User ${user._id} not verified, sending OTP to ${user.email}`);
      await sendOTP(user.email, user._id);
      return response.status(403).json({
        success: false,
        message: "Your email is not verified. A new OTP has been sent to your email.",
        userId: user._id,
      });
    }

    const token = jwt.sign(
      { username: user.username, role: user.role, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    response.json({
      success: true,
      message: "Login Successful!",
      token: token,
      user: { id: user._id, username: user.username, first_name: user.first_name, last_name: user.last_name, role: user.role, email: user.email, phone: user.phone, address: user.address },
    });
  } catch (error) {
    console.error("Error during login:", error);
    response.status(500).json({ success: false, message: "An error occurred during login." });
  }
});

//customer sign up  
userRoutes.post("/signup", async (req, res) => {
  try {
    const { username, password, first_name, last_name, email, phone, role, address } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      first_name,
      last_name,
      email,
      phone,
      role,
      address,
      isVerified: false,
    });

    // Save user to database
    await newUser.save();

    // Send OTP to the user's email
    await sendOTP(email, newUser._id);

    res.status(201).json({
      message: "User registered successfully! Please verify your email with OTP.",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});



// worker sign u route
// userRoutes.post("/worker-signup", async (req, res) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     try {
//       const {
//         username,
//         password,
//         first_name,
//         last_name,
//         email,
//         phone,
//         address,
//         skills,           // an array e.g., ["Plumbing", "Electrical"]
//         hourlyRate,       // number value
//         serviceDescription,
//         schedule,         // object containing availability info
//       } = req.body;
  
//       // Check if user already exists
//       const existingUser = await User.findOne({
//         $or: [{ username }, { email }]
//       }).session(session);
//       if (existingUser) {
//         await session.abortTransaction();
//         session.endSession();
//         return res.status(400).json({ message: "Username or email already exists." });
//       }
  
//       // Hash the password
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       // Create new user document
//       const newUser = new User({
//         username,
//         password: hashedPassword,
//         first_name,
//         last_name,
//         email,
//         phone,
//         role: "provider",
//         address,
//         isVerified: false,
//       });
//       await newUser.save({ session });
  
//       // Create service provider document that references the new user
//       const newServiceProvider = new ServiceProvider({
//         user_id: newUser._id,
//         status: "pending", // or "verified" based on your business logic
//         availability: schedule,
//         ratings: 0,
//         reviews_count: 0,
//         // Optionally, you can also store an array of services if available
//       });
//       await newServiceProvider.save({ session });
  
//       // Create a service document if the worker provides a service.
//       // For multiple skills, you can loop through skills to create multiple documents.
//       // Here we assume only one service is registered for simplicity.
//       const newService = new Service({
//         user_id: newUser._id,
//         type: skills,  // use the first skill or loop through skills if necessary
//         description: serviceDescription,
//         hourly_rate: hourlyRate,
//       });
//       await newService.save({ session });
  
//       // Commit the transaction
//       await session.commitTransaction();
//       session.endSession();
  
//       // Optionally, send an OTP to the worker's email for verification.
//       await sendOTP(email, newUser._id);
  
//       res.status(201).json({
//         message: "Worker registered successfully! Please verify your email with OTP.",
//         userId: newUser._id,
//       });
//     } catch (error) {
//       // Abort the transaction on error
//       await session.abortTransaction();
//       session.endSession();
//       console.error("Worker Signup Error:", error);
//       res.status(500).json({ message: "Server error. Please try again later." });
//     }
//   });

// userRoutes.post("/worker-signup", async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     const {
//       username,
//       password,
//       first_name,
//       last_name,
//       email,
//       phone,
//       address,
//       skills,           // an array e.g., ["Plumbing", "Electrical"]
//       hourlyRate,       // number value
//       serviceDescription,
//       schedule,         // object containing availability info
//     } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({
//       $or: [{ username }, { email }]
//     }).session(session);
//     if (existingUser) {
//       await session.abortTransaction();
//       session.endSession();
//       return res.status(400).json({ message: "Username or email already exists." });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user document
//     const newUser = new User({
//       username,
//       password: hashedPassword,
//       first_name,
//       last_name,
//       email,
//       phone,
//       role: "provider",
//       address,
//       isVerified: false,
//     });
//     await newUser.save({ session });

//     // Create the service document first
//     const newService = new Service({
//       user_id: newUser._id,
//       type: skills,  // If you expect multiple skills, this can be an array.
//       description: serviceDescription,
//       hourly_rate: hourlyRate,
//     });
//     await newService.save({ session });

//     // Now create the service provider document with a reference to the service
//     const newServiceProvider = new ServiceProvider({
//       user_id: newUser._id,
//       status: "pending", // or "verified" based on your business logic
//       services: [newService._id], // Include the service reference here
//       availability: schedule,
//       ratings: 0,
//       reviews_count: 0,
//     });
//     await newServiceProvider.save({ session });

//     // Commit the transaction
//     await session.commitTransaction();
//     session.endSession();

//     // Optionally, send an OTP to the worker's email for verification.
//     await sendOTP(email, newUser._id);

//     res.status(201).json({
//       message: "Worker registered successfully! Please verify your email with OTP.",
//       userId: newUser._id,
//     });
//   } catch (error) {
//     // Abort the transaction on error
//     await session.abortTransaction();
//     session.endSession();
//     console.error("Worker Signup Error:", error);
//     res.status(500).json({ message: "Server error. Please try again later." });
//   }
// });


userRoutes.post("/worker-signup", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      username,
      password,
      first_name,
      last_name,
      email,
      phone,
      address,
      skills,           // an array e.g., ["Plumbing", "Electrical"]
      hourlyRate,       // number value
      serviceDescription,
      schedule,         // object containing availability info
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    }).session(session);
    if (existingUser) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Username or email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document
    const newUser = new User({
      username,
      password: hashedPassword,
      first_name,
      last_name,
      email,
      phone,
      role: "provider",
      address,
      isVerified: false,
    });
    await newUser.save({ session });

    // Create service provider document that references the new user
    const newServiceProvider = new ServiceProvider({
      user_id: newUser._id,
      status: "pending", // or "verified" based on your business logic
      availability: schedule,
      ratings: 0,
      reviews_count: 0,
      // Optionally, you can also store an array of services if available
    });
    await newServiceProvider.save({ session });

    // Create a service document if the worker provides a service.
    // For multiple skills, you can loop through skills to create multiple documents.
    // Here we assume only one service is registered for simplicity.
    const newService = new Service({
      user_id: newUser._id,
      type: skills,  // use the first skill or loop through skills if necessary
      description: serviceDescription,
      hourly_rate: hourlyRate,
    });
    await newService.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Optionally, send an OTP to the worker's email for verification.
    await sendOTP(email, newUser._id);

    res.status(201).json({
      message: "Worker registered successfully! Please verify your email with OTP.",
      userId: newUser._id,
    });
  } catch (error) {
    // Abort the transaction on error
    await session.abortTransaction();
    session.endSession();
    console.error("Worker Signup Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});



userRoutes.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await sendOTP(email, user._id);
    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

userRoutes.post("/verify-otp", async (req, res) => {
  try {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
      return res.status(400).json({ success: false, message: "User ID and OTP required" });
    }

    const result = await verifyOTP(userId, otp);
    if (result.success) {
      await User.findByIdAndUpdate(userId, { isVerified: true });
    }
    res.json(result);
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
});

//////////////////////////////////////////////////////////////////////////
// Update Routes
//////////////////////////////////////////////////////////////////////////
userRoutes.put("/users/update", async (req, res) => {
  try {
    const { email, username, name, lastName, phone, addressln1, province, postalCode } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email identifier is required." });
    }

    const updateFields = {
      username,
      first_name: name,
      last_name: lastName,
      phone,
      address: {
        line1: addressln1,
        province,
        postal_code: postalCode,
      },
    };

    let db = database.getDb();

    const result = await db.collection("users").findOneAndUpdate(
      { email },
      { $set: updateFields },
      { returnDocument: "after" } // <-- Important for newer driver versions
    );

    if (!result) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    return res.json({ success: true, data: result.value });
  } catch (error) {
    console.error("Error updating customer profile:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});



//////////////////////////////////////////////////////////////////////////
// Delete Routes
//////////////////////////////////////////////////////////////////////////


// deletes consumers as well as providers
userRoutes.delete("/users/:id", async (req, res) => {
  console.log("Deleting user with ID:", req.params.id);
  try {
    let db = database.getDb();
    const customerId = req.params.id;

    // Delete the customer document matching the given ID
    const result = await db.collection("users").deleteOne({ _id: new ObjectId(customerId) });
    //   const result2 = await db.collection("service_provider").deleteOne({ user_id: new ObjectId(customerId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer successfully deleted" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//----------------service provider edit----------------------------------------------------

userRoutes.route("/users/:id").put(async (request, response) => {
  let db = database.getDb();
  let userId = request.body.user_id;
  let serviceProviderId = request.body._id;
  // if (!ObjectId.isValid(userId)) {
  //   return response.status(400).json({ message: "Invalid User ID" });
  // }
  try {
    const { userDetails } = request.body;
    let data = await db.collection("service_providers").findOne({ _id: new ObjectId(String(serviceProviderId)) })
    if (JSON.stringify(data.services) !== JSON.stringify(request.body.services)) {
      let result = await db.collection("service_providers").updateOne(
        { _id: new ObjectId(String(serviceProviderId)) },
        { $set: { services: request.body.services } }
      );
    }
    let result = await db.collection("users").updateOne(
      { _id: new ObjectId(String(userId)) },
      { $set: userDetails }
    );

    if (result.matchedCount === 0) {
      return response.status(404).json({ message: "User not found" });
    }

    response.json({ message: "User updated successfully" });
  } catch (error) {
    console.log("error", error)
    response.status(500).json({ message: "Error updating user", error });
  }
});


//------------customer edit---------------------------------------------
userRoutes.route("/user/:id").put(async (request, response) => {
  let db = database.getDb();
  let userId = request.params.id;
  try {
    const { _id, ...userDetails } = request.body;
    let user = await db.collection("users").findOne({ _id: new ObjectId(String(userId)) });
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }
    // Object.keys(userDetails).forEach(key => {
    //   if (userDetails[key] === null) {
    //     console.log("key", key);
    //     delete userDetails[key];
    //   }
    // });
    let result = await db.collection("users").updateOne(
      { _id: new ObjectId(String(userId)) },
      { $set: userDetails }
    );
    if (result.matchedCount === 0) {
      return response.status(404).json({ message: "User not found" });
    }
    response.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    response.status(500).json({ message: "Error updating user", error });
  }
});
//========================================================================
module.exports = userRoutes