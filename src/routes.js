import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FilerController from './app/controllers/FileController';
import ProviderControllers from './app/controllers/ProviderControllers';
import AppnitmentControler from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('apimeusalao/users', UserController.store);
routes.post('apimeusalao/sessions', SessionController.store);

routes.get('apimeusalao/', (req, res) => res.send('ok')),
routes.get('apimeusalao/test', (req, res) => res.send('test')),
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('apimeusalao/providers', ProviderControllers.index);
routes.get('apimeusalao/providers/:providerId/available', AvailableController.index);

routes.post('apimeusalao/appointments', AppnitmentControler.store);
routes.get('apimeusalao/appointments', AppnitmentControler.index);
routes.delete('apimeusalao/appointments/:id', AppnitmentControler.delete);

routes.get('apimeusalao/schedule', ScheduleController.index);

routes.get('apimeusalao/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('apimeusalao/files', upload.single('file'), FilerController.store);

export default routes;
