#!groovy

@NonCPS
def cancelPreviousBuilds() {
  def jobName = env.JOB_NAME
  def buildNumber = env.BUILD_NUMBER.toInteger()
  def currentJob = Jenkins.instance.getItemByFullName(jobName)

  for (def build : currentJob.builds) {
    def exec = build.getExecutor()
      if (build.isBuilding() && build.number.toInteger() != buildNumber && exec != null) {
        exec.interrupt(
          Result.ABORTED,
          new CauseOfInterruption.UserInterruption("Aborted by #${buildNumber}"))
    }
  }
}

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

  options {
    timeout(time: "${params.JOB_TIMEOUT ?: '15'}", unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }
  
  agent { label 'ec2-fleet' }

  stages {
    stage('Pipeline') {
      stages {
        stage('Init') {
          steps {
            script {
              print(params)
              if (! params.every{it.value?.toString().trim()}) {
                error('All parameters are required.')
              }
              cancelPreviousBuilds()
            }
          }
          post {
            failure {
              slackSend (color: 'danger', message: "[ FALHA ] Parâmetros inválidos (<${BUILD_URL}|${BRANCH_NAME} #${BUILD_NUMBER}>)", channel: "${SLACK_CHANNEL}", tokenCredentialId: 'slack-token')
            }
          }
        }

        stage('Install Packages') {
          steps {
            sh "docker run --user node -v \$(pwd):/app:rw -w /app node:14.15.1 yarn install"
          }
        }

        stage('Build') {
          steps {
            sh "docker run --user node -v \$(pwd):/app:rw -w /app -e BASE_URL=$BASE_URL node:14.15.1 yarn build extract"
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
                sh "docker run --user node -v \$(pwd):/app -w /app node:14.15.1 yarn run test:ci"
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
              steps {
                withSonarQubeEnv('sonar-qube') {
                  sh '''
                    docker run \
                      -v \$(pwd):/app \
                      sonarsource/sonar-scanner-cli:4.4 \
                        -Dsonar.login="${SONAR_AUTH_TOKEN}" \
                        -Dsonar.host.url="${SONAR_HOST_URL}" \
                        -Dsonar.projectKey="${SONAR_PROJECT}" \
                        -Dsonar.projectBaseDir="/app" \
                        -Dsonar.javascript.lcov.reportPaths="/app/coverage/lcov.info" \
                        -Dsonar.sources=./src
                  '''
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

        stage('Deployment - EVOLUCAO') {
          when { expression { env.GIT_BRANCH?.startsWith("sprint/PC") } }
          steps {
            withAWS (credentials:"${AWS_CREDENTIALS}") {
              sh '''
                docker run \
                  -e AWS_DEFAULT_REGION=us-east-1 \
                  -e AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID}" \
                  -e AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY}" \
                  amazon/aws-cli:2.0.47 s3 rm s3://evolucao.conquista.sciensa.click --recursive
              '''
              sh '''
                docker run -e AWS_DEFAULT_REGION=us-east-1 \
                  -e AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID}" \
                  -e AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY}" \
                  -v ~/.aws:/root/.aws \
                  -v \$(pwd):/app \
                  -w /app \
                  amazon/aws-cli:2.0.47 s3 sync ./build s3://evolucao.conquista.sciensa.click/conquista/ --acl public-read --include '**/*'
              '''
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

        stage('Deployment - ROBO') {
          when { expression { env.GIT_BRANCH?.startsWith("sprint/PVEV") } }
          steps {
            withAWS (credentials:"${AWS_CREDENTIALS}") {
              sh '''
                docker run \
                  -e AWS_DEFAULT_REGION=us-east-1 \
                  -e AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID}" \
                  -e AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY}" \
                  amazon/aws-cli:2.0.47 s3 rm s3://robo.conquista.sciensa.click --recursive
              '''
              sh '''
                docker run -e AWS_DEFAULT_REGION=us-east-1 \
                  -e AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID}" \
                  -e AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY}" \
                  -v ~/.aws:/root/.aws \
                  -v \$(pwd):/app \
                  -w /app \
                  amazon/aws-cli:2.0.47 s3 sync ./build s3://robo.conquista.sciensa.click/conquista/ --acl public-read --include '**/*'
              '''
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

        stage('Deployment - DEVELOP') {
          when { anyOf {
            branch 'develop';
            expression { return Boolean.valueOf(FORCE_DEPLOY) }
          }}
          steps {
            withAWS (credentials:"${AWS_CREDENTIALS}") {
              sh '''
                docker run \
                  -e AWS_DEFAULT_REGION=us-east-1 \
                  -e AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID}" \
                  -e AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY}" \
                  amazon/aws-cli:2.0.47 s3 rm s3://${BUCKET_NAME} --recursive
              '''
              sh '''
                docker run -e AWS_DEFAULT_REGION=us-east-1 \
                  -e AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID}" \
                  -e AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY}" \
                  -v ~/.aws:/root/.aws \
                  -v \$(pwd):/app \
                  -w /app \
                  amazon/aws-cli:2.0.47 s3 sync ./build s3://${BUCKET_NAME}/conquista/ --acl public-read --include '**/*'
              '''
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
  }
}
