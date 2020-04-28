app = ''
pipeline{
   agent any
   
   
   stages{
     
      stage('Build image') {
         steps{
            script{
            /* This builds the actual image; synonymous to
         * docker build on the command line */
        echo ' Building Docker Image ...'
        app = docker.build("scollect") 
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
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub') {
            app.push("${env.BUILD_NUMBER}")
            app.push("ecollect")
        }
        echo 'COMPLETED SUCCESSFULL'
        }
        }
    }
      
      
  }
}
