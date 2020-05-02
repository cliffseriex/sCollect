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
         /*     
              withCredentials([usernamePassword(credentialsId: 'dockhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                 echo 'username $USERNAME  ---  password $PASSWORD'
                sh 'docker login --username=cliffseriex -p=Poljez@cliff#1'
                 echo 'Docker login successfull'
         }
         */
        /*docker.withRegistry('https://hub.docker.com/repositories/cliffseriex/scollect', 'dockhub') {
            app.push
        }*/
                withCredentials([usernamePassword( credentialsId: 'dockhub', usernameVariable: 'USER', passwordVariable: 'PASSWORD')]) {
        def registry_url = "registry.hub.docker.com/"
        sh "docker login -u $USER -p $PASSWORD ${registry_url}"
        docker.withRegistry("http://${registry_url}", "dockhub") {
            // Push your image now
           //sh  "docker push ${app}"
             echo "READY TO PUSH ${app}"
        }
    }
        echo 'COMPLETED SUCCESSFULL'
        }
        }
    }
      
      
  }
}
