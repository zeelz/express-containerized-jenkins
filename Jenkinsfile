node {
    stage ("try jenkinsfile") {
        docker.image("node:20-alpine").inside {        
            git branch: "main", url: "https://github.com/zeelz/jenkins.git"
            echo "BUILD_ID is ${BUILD_ID}"
            // sh "node -v"
            sh "ls -l"
        }
    }
}
