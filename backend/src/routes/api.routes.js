import { Router } from 'express';
import { createApplication, listApplications } from '../controllers/applications.controller.js';
import { getNews, getPrograms, health, submitContact } from '../controllers/content.controller.js';

const router = Router();

router.get('/', health);
router.get('/applications', listApplications);
router.post('/applications', createApplication);
router.get('/news', getNews);
router.get('/programs', getPrograms);
router.post('/contact', submitContact);

export default router;
