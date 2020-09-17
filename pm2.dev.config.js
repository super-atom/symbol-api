module.exports = {
    apps: [
        {
            name: 'symbol_api_dev',
            script: './src/server.ts',
            interpreter: './node_modules/.bin/ts-node',
            exec_mode: 'fork_mode',
            watch: false,
            ignore_watch: ['[/\\]./', 'node_modules'],
            instances: 1,
            port: 6661,
            noDaemonMode: true,
            env_dev: {
                NODE_ENV: 'development',
                MODE: 'development',
            },
            env_local: {
                NODE_ENV: 'development',
                MODE: 'local',
            },
        },
    ],
};
