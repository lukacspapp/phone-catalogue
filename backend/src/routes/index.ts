import { Router } from 'express';
import phoneRoutes from './phone';
import healthRoutes from './health';

const router = Router();

router.use('/api/phones', phoneRoutes);
router.use('/health', healthRoutes);

export default router;
