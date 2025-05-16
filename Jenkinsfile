node {
    stage ("try jenkinsfile") {
        agent {
            docker {
                image node:20-alpine
            }
        }
        git branch: "main", url: "https://github.com/zeelz/jenkins.git"
        echo "BUILD_ID is ${BUILD_ID}"
        sh "node -v"
    }
}
