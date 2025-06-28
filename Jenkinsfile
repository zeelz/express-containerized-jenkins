pipeline {
    agent any

    tools {
      nodejs 'NodeJS'
    }

    stages {
        stage('Checkout GitHub'){
            steps {
                git branch: 'main', credentialsId: 'git-token', url: 'https://github.com/zeelz/jenkins.git'
            }
        }

        stage('Install node deps'){
            steps {
              sh 'npm install'
            }
        }

        stage('Build image'){
            steps {                
                script {
                    'docker.build("express-containerized"+"$BUILD_NUMBER")'
                }
            }
        }

        stage('Push Image'){
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-cred', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        sh 'echo ${PASS} | docker login -u ${USER} --password-stdin'
                        sh 'docker push ${USER}/express-containerized+"$BUILD_NUMBER"'
                    }                    
                }
            }
        }
    }

    post {
        success {
            echo 'Build completed successfully.'
        }

        failure {
            echo 'Build failed. Check logs.'
        }
    }
}
