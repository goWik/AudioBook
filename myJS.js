
//mina func.
//http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


 function SpotifyURL(id){
    var url = "https://embed.spotify.com/?uri=" + id + "&theme=white";
    return url;
  }
  
  $(document).ready(function() {
  console.log("ready!");
  
   var par = getParameterByName("id");
   var spotifyURl = SpotifyURL(par);
   
  //från Ratchet, kör func
  window.addEventListener('push', function () {
      console.log("test!");
  }
  }
  
  )
  
  
  $("#showSpotifyIframe").attr("src",spotifyURl);
  
  //använder Spoitfy API för att spela upp ljuböcker m.m
  //API ID för valda ljudblöker
  var madicken = "6R8GNymg4ubeMld3oxHY0j";
  var ronja =  "6L25tlpmr1zmPNkc4n9XXh";
  var emil = "5PO5M3H7FRvXRu3N1lBdao";
  var lotta = "31xuselGS3SqVunI7o00Aq";
  
  //func som ger grund-url dvs Spotify endpoint
  function makeURL(id){
    var url = "https://api.spotify.com/v1/albums/" + id + "?market=SE";
    return url;
  }

//func ger info om boken från Spotify API, plockar ut info och titel
  function giveInfoAboutAudioBook(data, id){
    var responseBody = data;
    var info = data.artists[id].name;
    var title = data.name;
    var infoAboutBook = info + ", " + title;
    return infoAboutBook;
  }
  
  //func. plockar bilden från Spotify API
   function giveImage(data,id){
      var responseBody = data;
      var images = data.images[id].url;
      return images;
    }
  
  //callback, tar emot url-en
  //sätter till respektive selector som får värden av JSON
  $.get(makeURL(madicken), function(data, textStatus, jqXHR) {
    $('#madicken').attr("src",giveImage(data,0));
    $('#authorM').html(giveInfoAboutAudioBook(data, 0));
  });

  
  
  $.get(makeURL(ronja), function(data, textStatus, jqXHR) {
    $('#ronja').attr("src",giveImage(data,0));
    $('#authorR').html(giveInfoAboutAudioBook(data, 0));
  });

  $.get(makeURL(emil), function(data, textStatus, jqXHR) {
    $('#emil').attr("src",giveImage(data,0));
    $('#authorE').html(giveInfoAboutAudioBook(data, 0));
  });
  
  
  $.get(makeURL(lotta), function(data, textStatus, jqXHR) {
    $('#lotta').attr("src",giveImage(data,0));
      var responseBody = data;
      var info = data.artists[0]["name"]; //artist
      var title = data.artists[1]["name"]; //title
      var infoAboutBook = info + ", " + title;
    $('#authorL').html(infoAboutBook);
  });
 
  //------------LIBRIS API----------------------------------------------- 
  //lagrar och deklarerar de hårtkodade ljudböckerna:
  var madickenLibris = "madicken";
  var ronjaLibris = "ronja rövardotter";
  var emilLibris = "emil från lönneberga";
  var lottaLibris = "lotta på bråkmakargatan"
  
 //använder LIBRIS API för att få ut info om olika böcker, isbn, creator, title m.m
 //ENDPOINTS byggs från variabler ovan
    function getURL(idLibris){
      var librisURL = "http://libris.kb.se/xsearch?query=" + idLibris + "&format=json";
      return librisURL;
  }
  
  //grund-func. för att ta ut info om boken från Libris API
  //LIBRIS api har olika mycket data i JSON format för olika endpoints därför skapar jag en func som tar emot olika paramterar, data1 och id
  function giveInfo(data1, id){
    var responseBody1 = data1;
    var title = data1.xsearch.list[id]["title"];
    var creator = data1.xsearch.list[id]["creator"];
    var isbn = data1.xsearch.list[id]["isbn"];
    var aboutBook = title + " ," + creator + ", " + "ISBN:" +  isbn; 
    return aboutBook;
  }

//action Button -click kör igång func. som i sin tur triggar igång funktioner: (interaktion med appen)
//1). en grund func. som ger URL och pratar med libris API
//2). en func som hämtar info från libris API

//vid knapptrycket "visa info om boken" skickas en request till Libris Api och data i JSON format hämtas
//sedan får jag respons i form av en JSON data och jag plockar ut det jag vill användai appen
  $("#btnM").click(function(){
  $.get(getURL(madickenLibris), function(data1, textStatus, jqXHR) {
  $('#authorMLibris').html(giveInfo(data1,8));
});
});

  $("#btnR").click(function(){
  $.get(getURL(ronjaLibris), function(data1, textStatus, jqXHR) {
  $('#authorRLibris').html(giveInfo(data1,8));
});
});

  $("#btnE").click(function(){
  $.get(getURL(emilLibris), function(data1, textStatus, jqXHR) {
  $('#authorELibris').html(giveInfo(data1, 9));
});
});

  $("#btnL").click(function(){
  $.get(getURL(lottaLibris), function(data1, textStatus, jqXHR) {
  $('#authorLLibris').html(giveInfo(data1, 4));
});
});



//************************* använder OMDB api för att kunna söka på olika filmer och få olika data om den sökta filmen:

$("#btn-search").click(function(){
var id = $('#place').val();
console.log(id);
console.log("Hej");
var url = "http://www.omdbapi.com/?t=" +  id + "&y=&plot=short&r=json";

//Användaren skriver den filmen som den vill söka på i en textruta. Endpoint skapas utfrån sökningen (Jquery selektor.val) Request skickas till API. JSON data hämtas och data bearbetas och visas i appen. OMDBI api har samma datastruktur (liak många obj för vajr obj.sökning) och detta har underlättat att ta ut visa elemnt från JSON.
$.get(url, function(data, textStatus, jqXHR) {
  var responseBody = data;
  var infoAbautTheMovie = "TITEL: " + data.Title + "GRENE: " + data.Grene + "SKÅDESPELARE: " + data.Actors + "HANDLING: " + data.Plot + ", SPRÅK: " + data.Language + "IMDBI ID: " + data.ImdbId;

  $('#textArea').html(infoAbautTheMovie);
});
});


}); //slut parantes document ready----
