const PersonalsControl = require('../controllers/personalData');
const express = require('express');
const router = express.Router();

router.post('/addPersonal',PersonalsControl.personalAdd);
router.get('/get-personals', PersonalsControl.getPersonalData);
router.put('/update-personal/:personalId', PersonalsControl.personalUpdate);
router.delete('/delete-personal/:personalId', PersonalsControl.deletePersonalData);
router.get('/show-data', PersonalsControl.getForm);
router.get('/', PersonalsControl.getDataAdd);
module.exports = router;