pipeline {
    agent any

    environment {
        IMAGE_NAME_FRONTEND = "helpet-front"
        HELPET_BACK = "helpet-back"
        DOCKERHUB_USERNAME = "jihen546"
        DOCKERHUB_PASSWORD = "jihene123"
        TAG = "latest"
        AZURE_CREDENTIALS = credentials('azure-service-principal')
        KUBE_NAMESPACE = 'helpet-app' 
        AZURE_RESOURCE_GROUP = 'devops-project'
        AZURE_SUBSCRIPTION_ID = 'bcfd15fd-cfda-4dab-b575-b826ed03175d'
        AKS_CLUSTER_NAME = 'helpet-cluster'
    }
    tools { 
        nodejs "node-16"
    }

    stages {
        stage('Checkout App') {
            steps {
                script {
                    git url: 'https://github.com/Med-Aymen99/helpet-app.git', branch: 'master'
                }
            }
        }

        stage('Build and Push React Docker Image') {
            steps {
                dir('./helpet-frontend'){
                    sh "docker build -t ${IMAGE_NAME_FRONTEND}:${TAG} ."
                    sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
                    sh "docker tag ${IMAGE_NAME_FRONTEND}:${TAG} ${DOCKERHUB_USERNAME}/${IMAGE_NAME_FRONTEND}:${TAG}"
                    sh "docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME_FRONTEND}:${TAG}"
                }
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
                dir('./helpet-backend'){
                    echo "__building and pushing docker image__"
                    sh "docker build -t ${HELPET_BACK}:${TAG} ."
                    sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
                    sh "docker tag ${HELPET_BACK}:${TAG} ${DOCKERHUB_USERNAME}/${HELPET_BACK}:${TAG}"
                    sh "docker push ${DOCKERHUB_USERNAME}/${HELPET_BACK}:${TAG}"
                }
            }
        }

        stage('Run Tests') {
            steps {
                sh "cd helpet-frontend/ && npm install && npm test"
                sh "cd helpet-backend/ && npm install && npm run test"
            }
        }
        
        stage('Deploy to Dev Environment') {
            steps {
                sh "cd helpet-frontend/ && npm start"
                sh "cd helpet-backend/ && npm run start:dev"
            }
        }
        
        stage('Deploy to Azure AKS') {
            steps {
                script {
                    sh "az login"
                    
                    sh "az account set --subscription $AZURE_SUBSCRIPTION_ID"
                    
                    // Set Kubernetes context to AKS cluster
                    sh "az aks get-credentials --resource-group $AZURE_RESOURCE_GROUP --name $AKS_CLUSTER_NAME"
                    
                    // Apply Kubernetes workload and services to AKS
                    sh "kubectl apply -f k8s/ -n $KUBE_NAMESPACE"
                }
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
