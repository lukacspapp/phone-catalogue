import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler, notFoundHandler } from './middleware';
import routes from './routes';
import { dataLoader } from './services/DataLoader';
import { appConfig } from './config';

const app = express();

app.use(helmet());
app.use(cors(appConfig.cors));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// not need if we have a DB.
dataLoader.getPhones();

app.use('/', routes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(appConfig.port, () => {
  console.log(`🚀 Server running on port ${appConfig.port} in ${appConfig.nodeEnv} mode`);
});

export default app;
