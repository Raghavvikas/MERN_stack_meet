const Profile = require("../models/profileModel.js");
const asyncHandler = require("express-async-handler");

// @desc    Get logged in profile_id notes
// @route   GET /api/notes
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  const profiles = await profile.find({ profile_id: req.profile_id._id });
  res.json(profiles);
});

//@description     Fetch single Note
//@route           GET /api/notes/:id
//@access          Public
const getNoteById = asyncHandler(async (req, res) => {
  const profile = await profile.findById(req.params.id);

  if (profile) {
    res.json(profile);
  } else {
    res.status(404).json({ message: "profile not found" });
  }

  res.json(profile);
});

//@description     Create single Note
//@route           GET /api/notes/create
//@access          Private
const Createprofile = asyncHandler(async (req, res) => {
  const { gender, DoB, address, avatar } = req.body;

  if (!gender || !DoB || !address || !avatar) {
    res.status(400);
    throw new Error("Please Fill all the fields");
    return;
  } else {
    const profile = new profile({
      profile_id: req.profile_id._id,
      gender,
      DoB,
      address,
      avatar,
    });

    const createdprofile = await profile.save();

    res.status(201).json(createdprofile);
  }
});

//@description     Delete single Note
//@route           GET /api/notes/:id
//@access          Private
const Deleteprofile = asyncHandler(async (req, res) => {
  const profile = await profile.findById(req.params.id);

  if (profile.profile_id.toString() !== req.profile_id._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (profile) {
    await profile.remove();
    res.json({ message: "Profile Removed" });
  } else {
    res.status(404);
    throw new Error("Profile not Found");
  }
});

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const Updateprofile = asyncHandler(async (req, res) => {
  const { gender, DoB, address, avatar } = req.body;

  const note = await Note.findById(req.params.id);

  if (note.profile_id.toString() !== req.profile_id._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

module.exports = { getNoteById, getNotes, CreateNote, DeleteNote, UpdateNote };
