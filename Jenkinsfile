pipeline {
    agent any

    environment {

        IMAGE_NAME_FRONTEND = "helpet-front"
        IMAGE_NAME_BACKEND = "helpet-back"
        DOCKERHUB= credentials('dockerhub_id')
        TAG = "latest"
        
        KUBE_NAMESPACE = 'helpet-app' 
        AZURE_RESOURCE_GROUP = 'devops-project'
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
                    sh "docker login -u ${DOCKERHUB_USR} -p ${DOCKERHUB_PSW}"
                    sh "docker tag ${IMAGE_NAME_FRONTEND}:${TAG} ${DOCKERHUB_USR}/${IMAGE_NAME_FRONTEND}:${TAG}"
                    sh "docker push ${DOCKERHUB_USR}/${IMAGE_NAME_FRONTEND}:${TAG}"
                }
            }
        }

        stage('Build and Push Nest.js Docker Image') {
            steps {
                dir('./helpet-backend'){
                    echo "__building and pushing docker image__"
                    sh "docker build -t ${IMAGE_NAME_BACKEND}:${TAG} ."
                    sh "docker login -u ${DOCKERHUB_USR} -p ${DOCKERHUB_PSW}"
                    sh "docker tag ${IMAGE_NAME_BACKEND}:${TAG} ${DOCKERHUB_USR}/${IMAGE_NAME_BACKEND}:${TAG}"
                    sh "docker push ${DOCKERHUB_USR}/${IMAGE_NAME_BACKEND}:${TAG}"
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
                withCredentials([azureServicePrincipal('AzurePrincipalCredentials')]) {
                    sh 'az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID'
                    sh "az account set --subscription $AZURE_SUBSCRIPTION_ID"
                }

                // Set Kubernetes context to AKS cluster
                sh "az aks get-credentials --resource-group $AZURE_RESOURCE_GROUP --name $AKS_CLUSTER_NAME --overwrite-existing"
                
                // Set the namespace "helpet-app" for the current context
                sh "kubectl config set-context --current --namespace $KUBE_NAMESPACE"

                // Apply Kubernetes workload and services to AKS
                sh "kubectl apply -f k8s/"

                // Deploy the application to AKS with the new image
                sh "kubectl set image deployment/helpet-backend helpet-backend=${DOCKERHUB_USR}/${IMAGE_NAME_BACKEND}:${TAG}"
                sh "kubectl set image deployment/helpet-frontend helpet-frontend=${DOCKERHUB_USR}/${IMAGE_NAME_FRONTEND}:${TAG}"

                sh "kubectl rollout restart deployment helpet-frontend"
                sh "kubectl rollout restart deployment helpet-backend"

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
