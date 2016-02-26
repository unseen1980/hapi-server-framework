'use strict'

const Hapi = require('hapi');
const server = new Hapi.Server();
const Path = require('path');

server.connection({
    host: 'localhost',
    port: '8000'
});

function handler(request, reply) {
    reply(request.params)
}

server.register(require('inert'), () => {
    server.route({
        method: 'GET',
        path: '/users/{userId}',
        handler: handler
    });
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            reply('hello')
        }
    });
    server.route({
        method: 'GET',
        path: '/{images*}',
        handler: {
        	directory:{
        		path: Path.join(__dirname, 'public')
        	}
        }
    });

    server.start(() => console.log(`Started at: ${server.info.uri}`));
})
