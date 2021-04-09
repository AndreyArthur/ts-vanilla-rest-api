import http from 'http';

import router from '@shared/infra/http/routes';
import createTableFiles from '@shared/utils/createTablefiles';

createTableFiles();

http.createServer((req, res) => router(req, res)).listen(3333);
