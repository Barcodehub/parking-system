import { Router } from 'express';
import { sendEmail } from '../controllers/email.controller';

const router = Router();

router.post('/send', (req, res) => {
    void sendEmail(req, res);
  });

export default router;