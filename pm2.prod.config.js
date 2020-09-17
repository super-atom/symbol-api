module.exports = {
    apps: [
        {
            name: 'symbol_api_prod',
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
