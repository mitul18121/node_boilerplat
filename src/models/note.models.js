const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    title: { type: String, required: true },
    detail: { type: String, required: true },
    tags: [
      {
        type: String,
      },
    ],
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'userSchema' },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
// const note = Note({
//   name,
//   title,
//   detail,
//   tags,
//   user_id: req.user_id,
// });
// const saveNote = await note.save()
