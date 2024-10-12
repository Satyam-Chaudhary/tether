import { Router } from 'express';
import {searchContact} from '../controllers/ContactsController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';

const contactsRoutes = Router();

contactsRoutes.post('/search', verifyToken, searchContact);

export default contactsRoutes;
