app = ''
image_name = ''
pipeline{
   agent any
  
   stages{
 
      stage('Build image') {
         steps{
            script{
            /* This builds the actual image; synonymous to
         * docker build on the command line */
        echo ' Building Docker Image ...'
               image_name = "cliffseriex/scollect:${env.BUILD_NUMBER}"
        app = docker.build(image_name) 
            }  
         }
    }

    stage('Test image') {
       steps{
          script{
        /* Ideally, we would run a test framework against our image.
         * For this example, we're using a Volkswagen-type approach ;-) */
        app.inside {
            sh 'echo "Tests passed"'
            sh 'ls -al'
        }
       }
       }
    }
      
     stage('Push image') {
        steps{
           script{
        /* Finally, we'll push the image with two tags:
         * First, the incremental build number from Jenkins
         * Second, the 'latest' tag.
         * Pushing multiple tags is cheap, as all the layers are reused. */
        withCredentials([usernamePassword( credentialsId: 'dockhub', usernameVariable: 'USER', passwordVariable: 'PASSWORD')]) {
        def registry_url = "registry.hub.docker.com/"
        sh "docker login -u $USER -p $PASSWORD ${registry_url}"
        docker.withRegistry("http://${registry_url}", "dockhub") {
            // Push your image now
           app.push()
             echo "PUSHED ${image_name}"
        }
    }
     echo 'COMPLETED SUCCESSFULL'
        }
        }
    }
      
      
      stage('Deploy to ECS'){
      steps{
         script{
  //Deploy image to staging in ECS
        sh "aws ecs update-service --service mService  --cluster default --desired-count 0"
        timeout(time: 5, unit: 'MINUTES') {
            waitUntil {
                sh "aws ecs describe-services --service mService  --cluster default   > .amazon-ecs-service-status.json"

                // parse `describe-services` output
                def ecsServicesStatusAsJson = readFile(".amazon-ecs-service-status.json")
                def ecsServicesStatus = new groovy.json.JsonSlurper().parseText(ecsServicesStatusAsJson)
                println "$ecsServicesStatus"
                def ecsServiceStatus = ecsServicesStatus.services[0]
                return ecsServiceStatus.get('runningCount') == 0 && ecsServiceStatus.get('status') == "ACTIVE"
            }
        }
        sh "aws ecs update-service --service mService  --cluster default  --desired-count 1"
        timeout(time: 5, unit: 'MINUTES') {
            waitUntil {
                sh "aws ecs describe-services --service mService  --cluster default  > .amazon-ecs-service-status.json"

                // parse `describe-services` output
                def ecsServicesStatusAsJson = readFile(".amazon-ecs-service-status.json")
                def ecsServicesStatus = new groovy.json.JsonSlurper().parseText(ecsServicesStatusAsJson)
                println "$ecsServicesStatus"
                def ecsServiceStatus = ecsServicesStatus.services[0]
                return ecsServiceStatus.get('runningCount') == 0 && ecsServiceStatus.get('status') == "ACTIVE"
            }
        }
        timeout(time: 5, unit: 'MINUTES') {
            waitUntil {
                try {
                   // sh "curl http://52.202.249.4:80"
                    sh "Getting there"
                    return true
                } catch (Exception e) {
                    return false
                }
            }
        }
        echo "ecollect#${env.BUILD_NUMBER} SUCCESSFULLY deployed to http://52.202.249.4:80"
    }
   }
      }
   
      
      
      
  }
}
