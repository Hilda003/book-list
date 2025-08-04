import routes from './routes.js';
import Hapi from '@hapi/hapi';
import { initDatabase } from './database.js';

const init = async () => {
    try {
        await initDatabase();
        console.log('Database initialized successfully');

    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
         routes: {
      cors: {
        origin: ['*'],
            headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'],
            additionalHeaders: ['cache-control', 'x-requested-with']
      },
    },
        });


    server.route(routes);
    await server.start();
    console.log(`Server running ${server.info.uri}`);
    
};

process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
    process.exit(1);
});

init();