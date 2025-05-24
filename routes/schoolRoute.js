import { Router } from 'express';
import { addSchool, listSchools } from '../controllers/schoolControllers.js';

const router = Router();

router.post('/addSchool', addSchool);
router.get('/listSchools', listSchools);

export default router;


