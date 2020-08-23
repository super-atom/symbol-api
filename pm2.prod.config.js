module.exports = {
    apps: [
        {
            name: 'api_prod',
            script: './dist/server.js',
            exec_mode: 'cluster',
            instances: 2,
            env: {
                NODE_ENV: 'production',
                MODE: 'production',
            },
        },
    ],
};
