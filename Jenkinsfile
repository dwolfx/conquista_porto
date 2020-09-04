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

  agent { label 'ec2-fleet' } 

  options {
    timeout(time: "${params.JOB_TIMEOUT ?: '15'}", unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }
  
  stages {
    stage('Pre-reqs') {
      steps {
        script {
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

    stage('Install Packages') {
      agent { docker { image 'node:13.14.0' } }
      steps {
        sh "yarn install"
      }
    }

    stage('Build') {
      agent { docker { image 'node:13.14.0' } }
      steps {
        sh "yarn build"
        sh "BASE_URL='${BASE_URL}' yarn run extract"
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
          agent { docker { image 'node:13.14.0' } }
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
          agent { docker { 
            image 'newtmitch/sonar-scanner:4' 
            args '--entrypoint=""'  
          } }
          when { anyOf {
            branch 'develop';
            expression { return Boolean.valueOf(FORCE_SONAR) }
          }}
          steps {
            withSonarQubeEnv('sonar-qube') {
              sh 'sonar-scanner -Dsonar.projectKey="${SONAR_PROJECT}" -Dsonar.projectBaseDir="${PWD}" -Dsonar.sources=.'
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
      agent { docker { 
        image 'amazon/aws-cli:2.0.47' 
        args '--entrypoint=""'  
      } }
      when { anyOf {
        branch 'develop';
        branch 'qa';
        expression { return Boolean.valueOf(FORCE_DEPLOY) }
      }}
      steps {
        withAWS (region:'us-east-1', credentials:"${AWS_CREDENTIALS}") {
          sh "aws s3 rm s3://${BUCKET_NAME} --recursive"
          sh "aws s3 sync ./build s3://${BUCKET_NAME}/conquista/ --acl public-read --include '**/*'"
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
