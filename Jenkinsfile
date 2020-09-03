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

  agent none 

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
        sh 'yarn build'
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
    }
  }
}
