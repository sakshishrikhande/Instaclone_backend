const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/Routes");
const cors = require('cors')
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 8001


const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
var upload = multer({ dest: 'upload' })

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/api/v1/post", router);

//configure mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/InstaClone",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

const imageSchema = new mongoose.Schema({
  name: String,
  description:String,
  location:String,
  likes:Number,
  image: { data: Buffer, contentType: String },
});
const Image = mongoose.model('instaclone', imageSchema);

app.post("/images",upload.single('postImage'),async (req,res,next)=>{
  const image = new Image({
    name: req.body.name,
    description:req.body.description,
    location:req.body.location,
    likes:Math.floor(Math.random() * 100),
    image: {
        data: fs.readFileSync(req.file.path),
        contentType: 'image/jpeg'
    },
  });
  image.save()
    .then(result => {
        console.log(result);
        res.send("Image uploaded successfully");
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
})

app.get('/images', (req, res) => {
  Image.find({}, (err, images) => {
    if (err) return res.status(500).send(err);
    if (!images) return res.status(404).send('No images found');
    res.json(images);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

module.exports = app;