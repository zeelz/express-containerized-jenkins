pipeline {
    agent any

    tools {
      nodejs 'NodeJS'
    }

    environment {
        IMAGE = ''
    }

    stages {
        stage('Checkout GitHub'){
            steps {
                git branch: 'main', credentialsId: 'git-token', url: 'https://github.com/zeelz/jenkins.git'
            }
        }

        stage('Install node deps'){
            steps {
                sh 'echo hello'
              // sh 'npm install'
            }
        }

        stage('Build image'){
            steps {                
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-cred', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                       //'docker.build("express-containerized:v"+"$BUILD_NUMBER")'
                       sh 'docker build -t ${USER}/express-containerized:v${BUILD_NUMBER} .'                        
                    }
                }
            }
        }

        stage('Push Image'){
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-cred', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        sh 'echo ${PASS} | docker login -u ${USER} --password-stdin'
                        sh 'docker push ${USER}/express-containerized:v${BUILD_NUMBER}'
                        // sh IMAGE.push("${USER}/express-containerized:v${BUILD_NUMBER}")
                    }                    
                }
            }
        }
    }

    post {
        success {
            echo 'Build and push completed successfully.'
        }

        failure {
            echo 'Build or push failed. Check logs.'
        }
    }
}
