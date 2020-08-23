module.exports = {
    apps: [
        {
            name: 'api_dev',
            script: './src/server.ts',
            interpreter: 'ts-node',
            exec_mode: 'fork_mode',
            watch: true,
            ignore_watch: ['[/\\]./', 'node_modules'],
            instances: 1,
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
