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
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
