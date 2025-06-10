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
            name: "medical-record-dev",
            script: "npm",
            args: "run dev",
            watch: false,
            autorestart: true
        },
        {
            name: "medical-record-prod",
            script: "npm",
            args: "run start",
            watch: false,
            autorestart: true
        }
    ]
};
