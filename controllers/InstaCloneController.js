const InstaCloneService = require("../services/InstaCloneService");
const fs = require("fs");
const InstaCloneModel = require("../models/InstaCloneModel");
const BASE_URL = process.env.BASE_URL

exports.getPosts = async (req, res) => {
  try {
    const blogs = await InstaCloneService.getPosts();
    res.json({ data: blogs, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPost = async (req, res) => {
  var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType:req.file.mimetype,
        image:new Buffer.alloc(req.file.size)
    };
    InstaCloneModel.create(final_img,function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log(result.img);
            console.log("Saved To database");
            res.contentType(final_img.contentType);
            res.send(final_img.image);
        }
    })

};
