import appConfig from './app.config';
import authConfig from './auth.config';
import databaseConfig from './database.config';
import mailConfig from './mail.config';

export const configLoads = [databaseConfig, appConfig, authConfig, mailConfig];
