require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");


const app = express();

const connectDB=require('./config/db')
const { cloudinaryConnect } = require("./config/cloudinary");

const aiRoutes=require("./routes/aiRoutes")
const authRoutes=require('./routes/authRoutes')
const blogPostRoutes=require('./routes/blogPostRoutes')
const commentRoutes=require('./routes/commentRoutes')
const dashboardRoutes=require('./routes/dashboardRoutes')

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

// Connecting to cloudinary
cloudinaryConnect();

app.use(express.json());

connectDB();
app.use('/api/v1/ai',aiRoutes)
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/posts',blogPostRoutes)
app.use('/api/v1/comments',commentRoutes)
app.use('/api/v1/dashboard-summary',dashboardRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

