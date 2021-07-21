const httpStatus = require('http-status');
const mongoose = require('mongoose');
const Note = require('../models/note.models');
const ApiError = require('../utils/ApiError');

// Create a notes
const createNote = async (noteBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      const note = await Note.create(noteBody);
      resolve(note);
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        reject(new ApiError(httpStatus.BAD_REQUEST, 'Name must be unique'));
      }
      return reject(error);
    }
  });
};

const viewallNote = async (noteBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      const note = await Note.find(noteBody);
      if (!note) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No notes found');
      }
      resolve(note);
    } catch (error) {
      reject(error);
    }
  });
};

// Get note by id
const getNoteById = async (id, user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const note = await Note.findOne({ _id: id, user_id: user_id });
      if (!note) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
      }
      resolve(note);
    } catch (error) {
      reject(error);
    }
  });
};

// Delete a Notes
const deleteNote = async (noteId, user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const note = await Note.findOneAndDelete({ _id: noteId, user_id: user_id });
      if (!note) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
      }
      resolve(note);
    } catch (error) {
      reject(error);
    }
  });
};

const updateNoteById = async (noteId, user_id, updateBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      const note = await Note.findOneAndUpdate({ noteId, user_id, updateBody, new: true });
      if (!note) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
      }
      Object.assign(note, updateBody);
      await note.save();
      resolve(note);
    } catch (error) {
      reject(error);
    }
  });
};

const getNoteByUserId = async (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const note = await Note.find({ user_id });
      if (!note) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
      }
      resolve(note);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNote,
  deleteNote,
  getNoteById,
  viewallNote,
  updateNoteById,
  getNoteByUserId,
};
