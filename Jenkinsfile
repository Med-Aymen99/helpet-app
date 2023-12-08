pipeline {
    agent any

    environment {
        HELPET_FRONT = "helpet-front"
        HELPET_BACK = "helpet-back"
        DOCKERHUB_USERNAME = "jihen546"
        DOCKERHUB_PASSWORD = "jihene123"
        TAG = "latest"
    }
    tools { 
        nodejs "node-16"
    }

    stages {
        stage('Checkout React App') {
            steps {
                script {
                    git url: 'https://github.com/jihenedoudech/Helpet-React.git', branch: 'master'
                }
            }
        }

        /* stage('Test React App') {
            steps {
                script {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        } */

        stage('Build and Push React Docker Image') {
            steps {
                script {
                    sh "docker build -t ${HELPET_FRONT}:${TAG} ."
                    sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
                    sh "docker tag ${HELPET_FRONT}:${TAG} ${DOCKERHUB_USERNAME}/${HELPET_FRONT}:${TAG}"
                    sh "docker push ${DOCKERHUB_USERNAME}/${HELPET_FRONT}:${TAG}"
                }
            }
        }

        stage('Checkout Nest.js App') {
            steps {
                echo "__pulling from git__"
                git url: 'https://github.com/jihenedoudech/Helpet-nestJS.git', branch: 'master'
            }
        }

        /* stage('Test Nest.js App') {
            steps {
                echo "__testing react__"
                sh 'node --version'
                sh 'npm install'
                sh 'npm test'
                }
        } */

        stage('Build and Push Nest.js Docker Image') {
            steps {
                echo "__building and pushing docker image__"
                sh "docker build -t ${HELPET_BACK}:${TAG} ."
                sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
                sh "docker tag ${HELPET_BACK}:${TAG} ${DOCKERHUB_USERNAME}/${HELPET_BACK}:${TAG}"
                sh "docker push ${DOCKERHUB_USERNAME}/${HELPET_BACK}:${TAG}"
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! Deploy your applications.'
        }
        failure {
            echo 'Pipeline failed! Check the logs for errors.'
        }
    }
}
