const express = require('express');
const noteController = require('../../controllers/note.contorller');
const validate = require('../../middlewares/validate');
const { createNote, deleteNote, updateNote } = require('../../validations/note.validation');

const router = express.Router();

router.route('/add').post(validate(createNote), noteController.createNote);
router.route('/delete').delete(validate(deleteNote), noteController.deleteNote);
router.route('/viewAllNotes').get(noteController.viewallNote);
router.route(`/updateNote/:noteId`).put(validate(updateNote), noteController.updateNote);

module.exports = router;
