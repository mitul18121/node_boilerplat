const httpStatus = require('http-status');
const NoteService = require('../services/note.service');
const ApiError = require('../utils/ApiError');

const createNote = async (req, res) => {
  try {
    const { name, detail, tags, title } = req.body;
    const params = {
      name,
      detail,
      tags,
      title,
      user_id: req.user_id,
    };
    const note = await NoteService.createNote(params);
    if (note && note.error) {
      throw new ApiError({ status: httpStatus.BAD_REQUEST, message: 'Something went wrong' });
    }
    res.status(httpStatus.CREATED).send({ status: httpStatus.OK, message: 'Create note successfully', data: note });
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(error.status || 500).send({ status: error.status, message: 'Note Name allready taken' });
    }
    res.status(error.status || 500).send({ status: error.status, message: error.message });
  }
};

const viewallNote = async (req, res) => {
  try {
    const note = await NoteService.viewallNote();
    if (note && note.error) {
      throw new ApiError({ status: httpStatus.BAD_REQUEST, message: 'Unauthorized user' });
    }
    res.status(httpStatus.CREATED).send({ status: httpStatus.OK, message: 'Find all notes', data: note });
  } catch (error) {
    res.status(error.status || 500).send({ status: error.status, message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await NoteService.deleteNote(req.body.noteId, req.user_id);
    if (note && note.error) {
      throw new ApiError({ status: httpStatus.NOT_FOUND, message: 'Note not found' });
    }
    res.status(httpStatus.CREATED).send({ status: httpStatus.OK, message: 'Note delete successfully', data: note });
  } catch (error) {
    res.status(error.status || 500).send({ status: error.status, message: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const note = await NoteService.updateNoteById(req.params.noteId, req.user_id, req.body);
    if (note && note.message) {
      throw new ApiError({ status: httpStatus.NOT_FOUND, message: 'Note not found' });
    }
    res.send({ status: httpStatus.OK, message: 'Note updated successfully', data: note });
  } catch (error) {
    res.status(error.status || 500).send({ status: error.status, message: error.message });
  }
};

const getUserNotes = async (req, res) => {
  try {
    const note = await NoteService.getNoteByUserId(req.user_id);
    if (!note) {
      throw new ApiError({ status: httpStatus.NOT_FOUND, message: 'Note not found' });
    }
    res.status(httpStatus.OK).send({ status: httpStatus.OK, message: 'Note get successfully', data: note });
  } catch (error) {
    res.status(error.status || 500).send({ status: error.status, message: error.message });
  }
};

const viewSingleNotes = async (req, res) => {
  try {
    const note = await NoteService.getNoteById(req.params.noteId, req.user_id);
    if (!note) {
      throw new ApiError({ status: httpStatus.NOT_FOUND, message: 'Note not found' });
    }
    res.status(httpStatus.OK).send({ status: httpStatus.OK, message: 'Note found successfully', data: note });
  } catch (error) {
    res.status(error.status || 500).send({ status: error.status, message: error.message });
  }
};

module.exports = { createNote, deleteNote, viewallNote, updateNote, getUserNotes, viewSingleNotes };
