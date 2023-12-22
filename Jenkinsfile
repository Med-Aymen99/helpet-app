pipeline {
    agent any

    environment {

        IMAGE_NAME_FRONTEND = "helpet-front"
        IMAGE_NAME_BACKEND = "helpet-back"
        DOCKERHUB_USERNAME = "jihen546"
        DOCKERHUB_PASSWORD = "jihene123"
        TAG = "latest"

        KUBE_NAMESPACE = 'helpet-app' 
        AZURE_RESOURCE_GROUP = 'devops-project'
        AKS_CLUSTER_NAME = 'helpet-cluster'
        
        //AZURE_SUBSCRIPTION_ID = 'bcfd15fd-cfda-4dab-b575-b826ed03175d'
        // AZURE_CLIENT_ID = 'df504505-a6fc-4868-abea-c7f83485e20c'
        // AZURE_CLIENT_SECRET = 'Dgr8Q~~sI0NQsg-Qh1Y.0yq2ydSS-18tNuBBXcGL'
        // AZURE_TENANT_ID = 'dbd6664d-4eb9-46eb-99d8-5c43ba153c61'

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

        stage('Build and Push Nest.js Docker Image') {
            steps {
                dir('./helpet-backend'){
                    echo "__building and pushing docker image__"
                    sh "docker build -t ${IMAGE_NAME_BACKEND}:${TAG} ."
                    sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
                    sh "docker tag ${IMAGE_NAME_BACKEND}:${TAG} ${DOCKERHUB_USERNAME}/${IMAGE_NAME_BACKEND}:${TAG}"
                    sh "docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME_BACKEND}:${TAG}"
                }
            }
        }

        stage('Run Tests') {
            steps {
                sh "cd helpet-frontend/ && npm test"            
            }
        }
        
        
        stage('Deploy to Azure AKS') {
            steps {
                withCredentials([azureServicePrincipal('AzurePrincipalCredentials')]){
                    sh 'az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID'
                    sh "az account set --subscription $AZURE_SUBSCRIPTION_ID"
                }
                    
                // Set Kubernetes context to AKS cluster
                sh "az aks get-credentials --resource-group $AZURE_RESOURCE_GROUP --name $AKS_CLUSTER_NAME --overwrite-existing"
                
                // Set the namespace "helpet-app" for the current context
                sh "kubectl config set-context --current --namespace $KUBE_NAMESPACE"

                // Apply Kubernetes workload and services to AKS
                sh "kubectl apply -f k8s/"

                // Deploy your application to AKS with the new image
                sh "kubectl set image deployment/helpet-backend helpet-backend=${DOCKERHUB_USERNAME}/${IMAGE_NAME_BACKEND}:${TAG}"
                sh "kubectl set image deployment/helpet-frontend helpet-frontend=${DOCKERHUB_USERNAME}/${IMAGE_NAME_FRONTEND}:${TAG}"

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
