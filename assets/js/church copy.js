


      var baseurl = "https://jsonplaceholder.typicode.com";


      function mainCategories(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET",baseurl + "/posts",true);
        xmlhttp.onreadystatechange = function() {
          if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var persons = JSON.parse(xmlhttp.responseText);
            var tbltop = `<table>
			    <tr><th>Id</th><th>User Id</th><th>title</th><th>body</th></tr>`;
            //main table content we fill from data from the rest call
            var main ="";

            for (i = 0; i < persons.length; i++){
             // main += "<tr><td>"+persons[i].id+"</td><td>"+persons[i].userId+"</td><td>"+persons[i].title+"</td><td>"+persons[i].body+"</td></tr>";

              main += '<div class="card col-12 col-md-6 p-3 col-lg-3">'
              main +=   '<div class="card-wrapper">'
              main +=       '<div class="card-img">'
              main +=          '<img src="assets/images/church-321x214.png" alt="Mobirise" title=""></div>'
              main +=       '<div class="card-box">'
              main +=           '<h4 class="card-title mbr-fonts-style display-5">' + persons[i].title + '</h4>'
              main +=           '<p class="mbr-text mbr-fonts-style display-5">'+ persons[i].title + '</p>'
                        
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


      window.onload = function(){

        mainCategories();

      }


