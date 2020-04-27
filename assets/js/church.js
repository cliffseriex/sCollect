


      var baseurl = "https://ecollect.apptechhosting.com/api/v1";


      function mainCategories(){
        var baseurl = "https://ecollect.apptechhosting.com/api/v1";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST",baseurl + "/getAllChurches",true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
//        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        xmlhttp.send("msisdn=0246144043&session=abcde&token=1a6722b44e35a073e46e8a972109ce94");
        // xmlhttp.send(
        //       "msisdn" : "0246144043",
        //       "session": "abcde",
        //       "token"  : "1a6722b44e35a073e46e8a972109ce94"
        //   );
        xmlhttp.onreadystatechange = function() {
          if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var church = JSON.parse(xmlhttp.responseText);
            var tbltop = `<table>
			    <tr><th>Id</th><th>User Id</th><th>title</th><th>body</th></tr>`;
            //main table content we fill from data from the rest call
            var main ="";

            for (i = 0; i < church.length; i++){
             // main += "<tr><td>"+persons[i].id+"</td><td>"+persons[i].userId+"</td><td>"+persons[i].title+"</td><td>"+persons[i].body+"</td></tr>";

              main += '<div class="card col-12 col-md-6 p-3 col-lg-3">'
              main +=   '<div class="card-wrapper">'
              main +=       '<div class="card-img">'
              main +=          '<img src="assets/images/church-321x214.png" alt="Mobirise" title=""></div>'
              main +=       '<div class="card-box">'
              main +=           '<h4 class="card-title mbr-fonts-style display-5">' + church[i].name + '</h4>'
              main +=           '<p class="mbr-text mbr-fonts-style display-5">'+ church[i].name + '</p>'
                        
              main +=           '<div class="mbr-section-btn align-left"><a href="https://mobirise.co" class="btn btn-secondary-outline display-7">Send</a></div>'
              main +=        '</div>'
              main +=    '</div>'
              main +=  '</div>'
                $('#target').append(main)

            }
            var tblbottom = "</table>";
            var tbl = tbltop + main + tblbottom;
            //document.getElementById("personinfo").innerHTML = main;
            
          }
        };

        xmlhttp.send();
      }


      function test(){
          // var xhr = new XMLHttpRequest();
          // xhr.open("POST", "https://ecollect.apptechhosting.com/api/v1/getAllChurches?msisdn=0246144043&session=abcde&token=1a6722b44e35a073e46e8a972109ce94", true);
          // xhr.setRequestHeader('Content-Type', 'application/json');
          // xhr.send(JSON.stringify({
          //     value: value
          // }));

          var request = $.ajax({
            xhrFields: {
                  withCredentials: true
              },
               url: 'https://api.themoviedb.org/3/movie/popular',
              method: "POST",
              data: {    "api_key" : "6e63c2317fbe963d76c3bdc2b785f6d1"  },
              dataType: "json"
            });
             
            request.done(function( msg ) {
              alert(" worked " +msg);
            });
             
            request.fail(function( jqXHR, textStatus ) {
              alert( "Request failed: " + textStatus );
            });
      }



      window.onload = function(){
       // test();
       // mainCategories();

          $.ajax({
              url: 'http://ecollect.apptechhosting.com/api/v1/getAllChurches?msisdn=0246144043&session=abcde&token=1a6722b44e35a073e46e8a972109ce94',
             // url: 'https://api.themoviedb.org/3/movie/popular?api_key=6e63c2317fbe963d76c3bdc2b785f6d1',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              type: "POST", /* or type:"GET" or type:"PUT" */
              dataType: "json",
              data: {
             //  "api_key" : "6e63c2317fbe963d76c3bdc2b785f6d1"
              },
              success: function (result) {
                alert(" success "+result);
                  console.log(result);
                  var church = JSON.parse(xmlhttp.responseText);
              },
              error: function () {
                alert(" fail ");
                  console.log("error");
              }
          });
      }


