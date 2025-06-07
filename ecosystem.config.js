module.exports = {
    apps: [
        {
            name: "healty-core-java",
            script: "java",
            args: "-jar healty.core-0.0.1-SNAPSHOT.jar",
            watch: false,
            autorestart: true
        },
        {
            name: "node-dev-app",
            script: "npm",
            args: "run dev",
            watch: true,
            autorestart: true
        }
    ]
};
