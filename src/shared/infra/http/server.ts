import http from 'http';

import router from '@shared/infra/http/routes';
import createTableFiles from '@shared/database/utils/createTablefiles';

createTableFiles();

http.createServer(router).listen(3333);
