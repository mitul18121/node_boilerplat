const httpStatus = require('http-status');
// const mongoose = require('mongoose');
const Note = require('../models/note.models');
const ApiError = require('../utils/ApiError');

// Create a notes
const createNote = async (noteBody) => {
  const note = await Note.create(noteBody);
  if (!note) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Somthing is wrong');
  }
  return note;
};

const viewallNote = async (sortQuery) => {
  const { fieldname, sorting, page, limit } = sortQuery;
  let { search } = sortQuery;
  let whereClause = {};
  if (search) {
    search = new RegExp(search, 'ig');
    whereClause = {
      $or: [{ name: search }],
    };
  }
  const note = await Note.find(whereClause)
    .sort({ [fieldname]: parseInt(sorting) })
    .skip(page > 0 ? +limit * (+page - 1) : 0)
    .limit(+limit || 20);
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No notes found');
  }
  return note;
};

const aggrigateTestApi = async () => {
  const note = await Note.aggregate([
    {
      $group: {
        _id: '$tags',
        notesCount: { $sum: 1 },
      },
    },
  ]);
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No notes found');
  }
  return note;
};

// Get note by id`
const getNoteById = async (id, userId) => {
  const note = await Note.findOne({ _id: id, user_id: userId });

  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  return note;
};

// Delete a Notes
const deleteNote = async (noteId, userId) => {
  const note = await Note.findOneAndDelete({ _id: noteId, user_id: userId });
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  return note;
};

const updateNoteById = async (noteId, userId, updateBody) => {
  const note = await Note.findOneAndUpdate({ noteId, userId, updateBody, new: true });
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  Object.assign(note, updateBody);
  await note.save();
  return note;
};

const getNoteByUserId = async (userId) => {
  const note = await Note.find({ user_id: userId });

  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  return note;
};

module.exports = {
  createNote,
  deleteNote,
  getNoteById,
  viewallNote,
  updateNoteById,
  getNoteByUserId,
  aggrigateTestApi,
};

// .populate('user_id', { name: 1, phone: 1, email: 1, profile_url: 1 })
