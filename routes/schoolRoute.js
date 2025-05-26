import { Router } from 'express';
import { addContent, listContents, listShortlisted, updateShortlisted } from '../controllers/ContentControllers.js';

const router = Router();

router.post('/addContent', addContent);
router.get('/listContents', listContents);
router.post('/update', updateShortlisted);
router.get('/shortlist', listShortlisted);

export default router;


