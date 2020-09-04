#!groovy
 
pipeline {

  parameters {
    string(name: 'SONAR_PROJECT', defaultValue: params.SONAR_PROJECT ?: 'conquista-front-dev')
    string(name: 'BASE_URL', defaultValue: params.BASE_URL ?: 'https://dev.conquista.sciensa.click')
    string(name: 'BUCKET_NAME', defaultValue: params.BUCKET_NAME ?: 'dev.conquista.sciensa.click')

    string(name: 'AWS_CREDENTIALS', defaultValue: params.AWS_CREDENTIALS ?: 'conquista-dev-S3_DEPLOYER')
    string(name: 'JOB_TIMEOUT', defaultValue: params.JOB_TIMEOUT ?: '15')
    string(name: 'SLACK_CHANNEL', defaultValue: params.SLACK_CHANNEL ?: 'int_conquista_pr_front')

    booleanParam(name: 'FORCE_CLEAN',  defaultValue: params.FORCE_CLEAN  ?: false)
    booleanParam(name: 'SKIP_TESTS',   defaultValue: params.SKIP_TESTS   ?: false)
    booleanParam(name: 'FORCE_SONAR',  defaultValue: params.FORCE_SONAR  ?: false)
    booleanParam(name: 'FORCE_DEPLOY', defaultValue: params.FORCE_DEPLOY ?: false)
  }

  environment {
    SONAR_PROJECT = "${params.SONAR_PROJECT}"
    BASE_URL = "${params.BASE_URL}"
    BUCKET_NAME = "${params.BUCKET_NAME}"

    AWS_CREDENTIALS = "${params.AWS_CREDENTIALS}"
    SLACK_CHANNEL = "${params.SLACK_CHANNEL}"

    FORCE_CLEAN = "${params.FORCE_CLEAN}"
    SKIP_TESTS = "${params.SKIP_TESTS}"
    FORCE_SONAR = "${params.FORCE_SONAR}"
    FORCE_DEPLOY = "${params.FORCE_DEPLOY}"
  }

  agent { label 'master' }

  options {
    timeout(time: "${params.JOB_TIMEOUT ?: '15'}", unit: 'MINUTES')
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
          slackSend (color: 'danger', message: "[ FALHA ] Parâmetros inválidos (<${BUILD_URL}|${BRANCH_NAME} #${BUILD_NUMBER}>)", channel: "${SLACK_CHANNEL}", tokenCredentialId: 'slack-token')
        }
      }
    }


    stage('Clean Packages') {
      when { anyOf {
        changelog '.*?\\[DEPS\\].*?';
        expression { return Boolean.valueOf(FORCE_CLEAN) }
      }}

      steps {
        sh "yarn cache clean --mirror"
        sh "yarn global add typescript@3.7.2"
      }
      post {
        success {
          slackSend (color: 'warning', message: "[ AVISO ] Cache de dependências foi limpo (<${BUILD_URL}|${BRANCH_NAME} #${BUILD_NUMBER}>)", channel: "${SLACK_CHANNEL}", tokenCredentialId: 'slack-token')
        }
        failure {
          slackSend (color: 'danger', message: "[ FALHA ] Erro ao limpar o cache de dependências (<${BUILD_URL}|${BRANCH_NAME} #${BUILD_NUMBER}>)", channel: "${SLACK_CHANNEL}", tokenCredentialId: 'slack-token')
        }  
      }
    }


    stage('Install Packages') {
      steps {
        sh "yarn install"
      }
      post {
        failure {
          slackSend (color: 'danger', message: "[ FALHA ] Erro ao instalar as dependências (<${BUILD_URL}|${BRANCH_NAME} #${BUILD_NUMBER}>)", channel: "${SLACK_CHANNEL}", tokenCredentialId: 'slack-token')
        }  
      }
    }


    stage('Build') {
      steps {
        sh 'yarn build'
      }
      post {
        failure {
          slackSend (color: 'danger', message: "[ FALHA ] Erro no build da aplicação (<${BUILD_URL}|${BRANCH_NAME} #${BUILD_NUMBER}>)", channel: "${SLACK_CHANNEL}", tokenCredentialId: 'slack-token')
        }
      }
    }


    stage('QA') {
      when { expression { return !Boolean.valueOf(SKIP_TESTS) } }

      stages {
        stage('Test') {
          steps {
            sh 'yarn run test:ci'
          }
          post {
            always {
              cobertura (coberturaReportFile: 'coverage/cobertura-coverage.xml')
            }
            failure {
              slackSend (color: 'danger', message: "[ FALHA ] Testes com erro (<${BUILD_URL}|${BRANCH_NAME} #${BUILD_NUMBER}>)", channel: "${SLACK_CHANNEL}", tokenCredentialId: 'slack-token')
            }
          }
        }
        
        stage('SonarQube') {
          when { anyOf {
            branch 'develop';
            expression { return Boolean.valueOf(FORCE_SONAR) }
          }}

          environment {
            SCANNER_HOME = tool 'Scanner'
          }
          steps {
            withSonarQubeEnv('sonar-qube') {
              sh """
                ${SCANNER_HOME}/bin/sonar-scanner \
                  -Dsonar.projectKey="${SONAR_PROJECT}"
                """
            }
          }
          post {
            failure {
              slackSend (color: 'danger', message: "[ FALHA ] Ocorreu um erro com o SonarQube (<${BUILD_URL}|${BRANCH_NAME} #${BUILD_NUMBER}>)", channel: "${SLACK_CHANNEL}", tokenCredentialId: 'slack-token')
            }  
          }
        }

      }
    }


    stage('Deployment') {
      when { anyOf {
        branch 'develop';
        branch 'qa';
        expression { return Boolean.valueOf(FORCE_DEPLOY) }
      }}

      steps {
        sh "BASE_URL='${BASE_URL}' yarn run extract"

        withAWS (region:'us-east-1', credentials:"${AWS_CREDENTIALS}") {
          s3Delete (bucket: "${BUCKET_NAME}", path: '**/*')
          s3Upload (bucket: "${BUCKET_NAME}", workingDir: 'build', path: 'conquista/', includePathPattern: '**/*', acl: 'PublicRead');
        }
      }
      post {
        success {
          slackSend (color: 'good', message: "[ SUCESSO ] Deploy aplicado com sucesso (<${BUILD_URL}|${BRANCH_NAME} #${BUILD_NUMBER}>)", channel: "${SLACK_CHANNEL}", tokenCredentialId: 'slack-token')
        }
        failure {
          slackSend (color: 'danger', message: "[ FALHA ] Erro ao publicar as alterações no ambiente (<${BUILD_URL}|${BRANCH_NAME} #${BUILD_NUMBER}>)", channel: "${SLACK_CHANNEL}", tokenCredentialId: 'slack-token')
        }
      }
    }

  }
}
