pipeline { 
    agent any

    triggers {
        githubPush()
    }

    tools {
        nodejs 'Node20'
    }

    

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
        
        stage('Verify Docker Access') {
            steps {
                bat 'docker --version'
                bat 'docker compose version'
                bat 'docker info'
                bat 'docker compose config -q'
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
        
        stage('Build Docker Images') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                bat 'docker compose up -d --build'
            }
        }

        stage('Verify Deployment') {
            steps {
                bat 'docker compose ps'
                bat 'docker compose exec -T postgres pg_isready -U cu_app -d university_applications'
                powershell '''
                    $ErrorActionPreference = "Stop"
                    $response = Invoke-WebRequest `
                        -Uri "http://localhost:5000" `
                        -UseBasicParsing `
                        -TimeoutSec 15

                    if ($response.StatusCode -ne 200) {
                        throw "Frontend health check failed."
                    }

                    Write-Host "Frontend health check passed."
                '''
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
