pipeline {
    agent any

    triggers {
        githubPush()
    }

    tools {
        nodejs 'Node20'
    }

    // ❌ REMOVED the environment block that was crashing the pipeline

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Harshbhardwaj01/Chandigarh-University.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Build') {
            steps {
                bat 'npm run build '
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test '
            }
        }

        stage('Docker Login') {
            steps {
                // ✅ Fetch the credentials only when this specific stage runs
               withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', passwordVariable: 'DOCKER_PSW', usernameVariable: 'DOCKER_USR')]) {
    // Notice there is NO space between %DOCKER_PSW% and the | symbol
    bat 'echo %DOCKER_PSW%| docker login -u %DOCKER_USR% --password-stdin'
}
            }
        }
    }

    post {
        always {
            // Cleans up the credentials from the Windows machine afterward
            bat 'docker logout'
        }
    }
}