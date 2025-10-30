pipeline {
    agent { label 'dev' }

    environment {
        TZ = 'Asia/Jakarta'
        SONAR_HOST = 'http://10.25.200.92:9000'
        SONAR_TOKEN = credentials('sonar-token') // Gunakan credential store Jenkins
    }

    stages {
        stage('Pull SCM') {
            steps {
                echo "📥 Pulling source code from GitHub..."
                git branch: 'main', url: 'https://github.com/indramsy6577/simple-apps.git'
            }
        }
        
        stage('Build') {
            steps {
                echo "🏗️  Building Node.js app..."
                sh '''
                cd app
                npm install
                '''
            }
        }
        
        stage('Testing') {
            steps {
                echo "🧪 Running tests..."
                sh '''
                cd app
                APP_PORT=5001 npm test
                APP_PORT=5000 npm run test:coverage
                '''
            }
        }
        
        stage('Code Review') {
            steps {
                echo "🔍 Running SonarQube scan..."
                sh '''
                cd app
                sonar-scanner \
                    -Dsonar.projectKey=simple-apps \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=$SONAR_HOST \
                    -Dsonar.token=$SONAR_TOKEN
                '''
            }
        }

        stage('Cleanup') {
            steps {
                echo "🧹 Cleaning up old containers and networks..."
                sh '''
                docker compose down || true
                docker container prune -f || true
                '''
            }
        }
        
        stage('Deploy') {
            steps {
                echo "🚀 Deploying new version..."
                sh '''
                docker compose up --build -d
                '''
            }
        }
        
        stage('Backup') {
            steps {
                echo "📦 Pushing images to backup registry..."
                sh '''
                docker compose push || true
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed. Check logs for details."
        }
        always {
            echo "🕒 Build finished at: $(date)"
        }
    }
}
