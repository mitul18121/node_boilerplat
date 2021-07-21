const express = require('express');
const noteController = require('../../controllers/note.contorller');
const validate = require('../../middlewares/validate');
const { authondication } = require('../../middlewares/auth.middleware');
const { createNote, deleteNote, updateNote, viewSingleNote } = require('../../validations/note.validation');

const router = express.Router();

router.post('/add', authondication, validate(createNote), noteController.createNote);
router.delete('/delete', authondication, validate(deleteNote), noteController.deleteNote);
router.get('/viewAllNotes', authondication, noteController.viewallNote);
router.put(`/updateNote/:noteId`, authondication, validate(updateNote), noteController.updateNote);
router.get('/getnotesbyuserid', authondication, noteController.getUserNotes);
router.get('/viewsinglenote/:noteId', authondication, validate(viewSingleNote), noteController.viewSingleNotes);

module.exports = router;
