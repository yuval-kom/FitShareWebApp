const router = require("express").Router();
const User = require("../models/User");
const Event = require("../models/Event");

//CREATE Event
router.post("/", async (req, res) => {
  const newEvent = new Event(req.body);
  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});



//UPDATE Event
router.put("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
      try {
        const updatedEvent = await Event.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedEvent);
      } catch (err) {
        res.status(500).json(err);
      }

  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
      try {
        await event.delete();
        res.status(200).json("Event has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL EVENTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;

  try {
    let events;
      if (catName) {
        events = await Event.find({
        categories: {
            $in: [catName],
          },
        });
      } else {
        events = await Event.find();
      }
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});






//-----------------------------------------------------------------------
//neet to chang to add participant
//LIKE / DISLIKE a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
