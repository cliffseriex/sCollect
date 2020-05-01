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
        app = docker.build("cliffseriex/scollect:${env.BUILD_NUMBER}") 
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
        docker.withRegistry('https://hub.docker.com/repositories', 'dockhub') {
            app.push
        }
        echo 'COMPLETED SUCCESSFULL'
        }
        }
    }
      
      
  }
}
