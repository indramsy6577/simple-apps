pipeline {
    agent { label 'dev' }

    stages {
        stage('Pull SCM') {
            steps {
                echo "📥 Starting build at: ${new Date()}"
                git branch: 'main', url: 'https://github.com/indramsy6577/simple-apps.git'
            }
        }
        
        stage('Build') {
            steps {
                sh '''
                cd app
                npm install
                '''
            }
        }
        
        stage('Testing') {
            steps {
                sh '''
                cd app
                APP_PORT=5001 npm test
                APP_PORT=5000 npm run test:coverage
                '''
            }
        }
        
        stage('Code Review') {
            steps {
                sh '''
                cd app
                sonar-scanner \
                    -Dsonar.projectKey=simple-apps \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=http://10.25.200.92:9000 \
                    -Dsonar.token=sqp_d25c608fd76c9d5e87cb079811682a94b4b51566
                '''
            }
        }
        
        stage('Deploy') {
            steps {
                sh '''
                # Matikan container lama kalau masih jalan
                docker compose down || true
                # Jalankan container baru
                docker compose up --build -d
                '''
            }
        }
        
        stage('Backup') {
            steps {
                sh 'docker compose push'
            }
        }
    }

    post {
        success {
            sh 'echo "✅ Build succeeded at: $(date)"'
        }
        failure {
            sh 'echo "❌ Build failed at: $(date)"'
        }
        always {
            echo "🕒 Build finished at: ${new Date()}"
        }
    }
}
