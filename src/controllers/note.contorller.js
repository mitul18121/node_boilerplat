const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const NoteService = require('../services/note.service');

const createNote = async (req, res, next) => {
  try {
    const note = await NoteService.createNote(req.body);
    if (note && note.error) {
      return next(new ApiError(note.error.statusCode, note.error.message));
    }
    res.status(httpStatus.CREATED).send(note);
  } catch (error) {
    if (error instanceof ApiError) {
      return next(new ApiError(error.statusCode, error.message));
    }
    next(error);
  }
};

const viewallNote = async (req, res, next) => {
  try {
    const note = await NoteService.viewallNote({});
    if (note && note.error) {
      return next(new ApiError(note.error.statusCode, note.error.message));
    }
    res.status(httpStatus.CREATED).send(note);
  } catch (error) {
    if (error instanceof ApiError) {
      return next(new ApiError(error.statusCode, error.message));
    }
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const note = await NoteService.deleteNote(req.body.noteId);
    if (note && note.error) {
      return next(new ApiError(note.error.statusCode, note.error.message));
    }
    res.status(httpStatus.CREATED).send(note);
  } catch (error) {
    if (error instanceof ApiError) {
      return next(new ApiError(error.statusCode, error.message));
    }
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const note = await NoteService.updateNoteById(req.params.noteId, req.body);
    if (note && note.message) {
      return next(new ApiError(note.error.statusCode, note.error.message));
    }
    res.send(note);
  } catch (error) {
    if (error instanceof ApiError) {
      return next(new ApiError(error.statusCode, error.message));
    }
    next(error);
  }
};
module.exports = { createNote, deleteNote, viewallNote, updateNote };
