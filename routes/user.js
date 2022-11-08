const router = require("express")
  .Router();
const cloudinary = require("../utils/cloudnary");
const upload = require("../utils/multer");
const User = require("../model/user");

router.post("/events", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // Create new user
    let user = new User({
      name: req.body.name,
      image: result.secure_url,
      cloudinary_id: result.public_id,
      tagline: req.body.tagline,
        description: req.body.description,
        moderator: req.body.moderator,
        catagory: req.body.catagory,
        sub_catagory: req.body.sub_catagory,
        rigor_rank: req.body.rigor_rank

    });
    // save user details in mongodb
    await user.save();
    res.status(200)
      .send({
        user
      });
  } catch (err) {
    console.log(err);
  }
});


// router.get("/events", async (req, res) => {
//   try {
//     // let user = await User.findbyId(req.param.id);
//     const user = await Model.find
//     if (!user)
//       res.status(404)
//       .send({
//         message: "User not found!"
//       });
//     res.status(200)
//       .send(JSON(user));
//   } catch (err) {
//     console.log(err);
//   }
// });

router.get("/events", async (req, res) => {
  try {
      const data = await User.find();
      res.json(data)
  }
  catch (error) {
      res.status(500).json({ message: error.message })
  }
})

router.get('/events/:id', async (req, res) => {
  try {
      const data = await User.findById(req.params.id);
      res.json(data)
  }
  catch (error) {
      res.status(500).json({ message: error.message })
  }
})



router.delete('/events/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const data = await User.findByIdAndDelete(id)
      res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})


router.patch('/events/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };

      const result = await User.findByIdAndUpdate(
          id, updatedData, options
      )

      res.send(result)
  }
  catch (error) {
      res.status(500).json({ message: error.message })
  }
})
module.exports = router;