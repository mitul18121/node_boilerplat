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

const viewallNote = async (noteBody) => {
  const note = await Note.find(noteBody);
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No notes found');
  }
  return note;
};

// Get note by id
const getNoteById = async (id, user_id) => {
  const note = await Note.findOne({ _id: id, user_id: user_id });
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  return note;
};

// Delete a Notes
const deleteNote = async (noteId, user_id) => {
  const note = await Note.findOneAndDelete({ _id: noteId, user_id: user_id });
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  return note;
};

const updateNoteById = async (noteId, user_id, updateBody) => {
  const note = await Note.findOneAndUpdate({ noteId, user_id, updateBody, new: true });
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  Object.assign(note, updateBody);
  await note.save();
  return note;
};

const getNoteByUserId = async (user_id) => {
  const note = await Note.find({ user_id });
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
};
