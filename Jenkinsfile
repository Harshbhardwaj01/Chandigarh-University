
pipeline {
    agent any

    triggers {
        githubPush()
    }

    tools {
        nodejs 'Node20'
    }

    

    environment {
        // Reuse the existing Docker Compose project and its database volume.
        COMPOSE_PROJECT_NAME = 'chandigarhuniversity'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Harshbhardwaj01/Chandigarh-University.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
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
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USR',
                        passwordVariable: 'DOCKER_PSW'
                    )
                ]) {
                    bat '@echo off\n' +
                        'echo %DOCKER_PSW%| docker login -u %DOCKER_USR% --password-stdin'
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
                    $ready = $false

                    for ($i = 0; $i -lt 12; $i++) {
                        try {
                            $response = Invoke-WebRequest `
                                -Uri "http://localhost:5000" `
                                -UseBasicParsing `
                                -TimeoutSec 5

                            if ($response.StatusCode -eq 200) {
                                $ready = $true
                                break
                            }
                        } catch {
                            Start-Sleep -Seconds 5
                        }
                    }

                    if (-not $ready) {
                        throw "Frontend health check failed at http://localhost:5000"
                    }

                    Write-Host "Frontend health check passed."
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD pipeline completed successfully.'
        }

        failure {
            echo 'Pipeline failed. Collecting Docker diagnostics.'
            bat 'docker compose ps -a'
            bat 'docker compose logs --tail=100'
        }

        always {
            bat 'docker logout'
        }
    }
}
