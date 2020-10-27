import express from 'express';
import dignoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(dignoseService.getEntries());
});

export default router;
