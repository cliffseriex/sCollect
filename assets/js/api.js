


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
              main += "<tr><td>"+persons[i].id+"</td><td>"+persons[i].userId+"</td><td>"+persons[i].title+"</td><td>"+persons[i].body+"</td></tr>";
            }
            var tblbottom = "</table>";
            var tbl = tbltop + main + tblbottom;
            document.getElementById("personinfo").innerHTML = tbl;
          }
        };
        xmlhttp.send();
      }


      window.onload = function(){

        mainCategories();

      }


