#!groovy
 
pipeline {

  parameters {
    string(name: 'SONAR_PROJECT', defaultValue: params.SONAR_PROJECT ?: 'conquista-react-front')
    string(name: 'BASE_URL', defaultValue: params.BASE_URL ?: '')
    string(name: 'BUCKET_NAME', defaultValue: params.BUCKET_NAME ?: '')

    string(name: 'AWS_CREDENTIALS', defaultValue: params.AWS_CREDENTIALS ?: '')
    string(name: 'JOB_TIMEOUT', defaultValue: params.JOB_TIMEOUT ?: '15')
    string(name: 'SLACK_CHANNEL', defaultValue: params.SLACK_CHANNEL ?: 'int_conquista_pr_front')

    booleanParam(name: 'FORCE_CLEAN',  defaultValue: params.FORCE_CLEAN  ?: false)
    booleanParam(name: 'SKIP_TESTS',   defaultValue: params.SKIP_TESTS   ?: false)
    booleanParam(name: 'FORCE_SONAR',  defaultValue: params.FORCE_SONAR  ?: false)
    booleanParam(name: 'FORCE_DEPLOY', defaultValue: params.FORCE_DEPLOY ?: false)
  }

  agent { label 'master' }

  options {
    timeout(time: "${params.JOB_TIMEOUT}", unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }

  tools { nodejs "node" }

  
  stages {

    stage('Pre-reqs') {
      steps {
        script {
          sh 'env'
          sh "node --version"
          sh "yarn --version"

          print(params)
          if (! params.every{it.value?.toString().trim()}) {
            error('All parameters are required.')
          }
        }
      }
      post {
        failure {
          slackSend (color: 'danger', message: "[ FALHA ] Parâmetros inválidos (<${env.BUILD_URL}|#${env.BUILD_NUMBER}>)", channel: "${params.SLACK_CHANNEL}", tokenCredentialId: 'slack-token')
        }
      }
    }

    stage('Clean Packages') {
      when {
        anyOf {
          changelog '.*\\[DEPS\\].*';
          expression { return params.FORCE_CLEAN }
        }
      }

      steps {
        sh "yarn cache clean --mirror"
        sh "yarn global add typescript@3.7.2"
      }
      post {
        success {
          slackSend (color: 'warning', message: "[ AVISO ] Limpando cache de dependências (<${env.BUILD_URL}|#${env.BUILD_NUMBER}>)", channel: "${params.SLACK_CHANNEL}", tokenCredentialId: 'slack-token')
        }
        failure {
          slackSend (color: 'danger', message: "[ FALHA ] Não foi possivel limpart o cache de dependências (<${env.BUILD_URL}|#${env.BUILD_NUMBER}>)", channel: "${params.SLACK_CHANNEL}", tokenCredentialId: 'slack-token')
        }  
      }
    }

    stage('Install Packages') {
      steps {
        sh "yarn install"
      }
      post {
        failure {
          slackSend (color: 'danger', message: "[ FALHA ] Não foi possivel instalar as dependências (<${env.BUILD_URL}|#${env.BUILD_NUMBER}>)", channel: "${params.SLACK_CHANNEL}", tokenCredentialId: 'slack-token')
        }  
      }
    }

    stage('Test') {
      when { expression { return !params.SKIP_TESTS } }

      steps {
        sh 'yarn run test'
      }
      post {
        always {
          cobertura (coberturaReportFile: 'output/coverage/jest/cobertura-coverage.xml')
        }
        failure {
          slackSend (color: 'danger', message: "[ FALHA ] Testes com erro (<${env.BUILD_URL}|#${env.BUILD_NUMBER}>)", channel: "${params.SLACK_CHANNEL}", tokenCredentialId: 'slack-token')
        }
      }
    }

    stage('SonarQube') {
      when {
        anyOf {
          branch 'develop';
          expression { return params.FORCE_SONAR }
        }
      }

      environment {
        SCANNER_HOME = tool 'Scanner'
      }
      steps {
        withSonarQubeEnv('sonar-qube') {
          sh """
            ${SCANNER_HOME}/bin/sonar-scanner \
              -Dsonar.projectKey="${params.SONAR_PROJECT}" \
              -Dsonar.sources=.
            """
        }
      }
      post {
        failure {
          slackSend (color: 'danger', message: "[ FALHA ] Ocorreu um erro com o SonarQube (<${env.BUILD_URL}|#${env.BUILD_NUMBER}>)", channel: "${params.SLACK_CHANNEL}", tokenCredentialId: 'slack-token')
        }  
      }
    }

    stage('Deploy') {
      when { 
        anyOf {
          branch 'develop';
          branch 'qa';
          expression { return params.FORCE_DEPLOY }
        }
      } 

      stages {
        stage('Create Build Artifacts') {
          steps {
            sh 'yarn build'
          }
          post {
            failure {
              slackSend (color: 'danger', message: "[ FALHA ] Erro no build da aplicação (<${env.BUILD_URL}|#${env.BUILD_NUMBER}>)", channel: "${params.SLACK_CHANNEL}", tokenCredentialId: 'slack-token')
            }
          }
        }

        stage('Deployment') {
          steps {
            sh "BASE_URL='${params.BASE_URL}' yarn run extract"

            withAWS (region:'us-east-1', credentials:"${params.AWS_CREDENTIALS}") {
              s3Delete (bucket: "${params.BUCKET_NAME}", path: '**/*')
              s3Upload (bucket: "${params.BUCKET_NAME}", workingDir: 'build', path: 'conquista/', includePathPattern: '**/*', acl: 'PublicRead');
            }
          }
          post {
            success {
              slackSend (color: 'good', message: "[ SUCESSO ] Deploy aplicado com sucesso (<${env.BUILD_URL}|#${env.BUILD_NUMBER}>)", channel: "${params.SLACK_CHANNEL}", tokenCredentialId: 'slack-token')
            }
            failure {
              slackSend (color: 'danger', message: "[ FALHA ] Não foi possivel publicar as alterações no ambiente (<${env.BUILD_URL}|#${env.BUILD_NUMBER}>)", channel: "${params.SLACK_CHANNEL}", tokenCredentialId: 'slack-token')
            }
          }
        }
        
      }
    }

  }
}
