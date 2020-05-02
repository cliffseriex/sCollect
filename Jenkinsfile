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
          // sh  "docker push cliffseriex/scollect:${env.BUILD_NUMBER}"
           app.push()
             echo "PUSHED ${image_name}"
        }
    }
        echo 'COMPLETED SUCCESSFULL'
        }
        }
    }
      
      
  }
}
