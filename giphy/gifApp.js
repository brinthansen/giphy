    	$(document).ready(function() {

    	var gifTopics = [];


	function myFunction(){

   		var x = $(this).data("search");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x 
         + "&api_key=dc6zaTOxFJmzC&limit=10";


        $.ajax({
          url: queryURL,  
          method: "GET"
      })
          .done(function(response) {
        	var results = response.data;
        	console.log(results);
        	for (var i = 0; i <results.length; i++){

        	var gifDiv = $("<div>");
        	var rating = results[i].rating;
        	var animatedSrc = results[i].images.downsized_large.url;
        	var staticSrc = results[i].images.downsized_still.url;
        	var gifImage = $("<img>");
        	var p = $("<p>").text("Rating: " + rating);

        	gifImage.attr("src", staticSrc);
        	gifImage.addClass("gifGiphy");
        	gifImage.attr("data-still", staticSrc);
        	gifImage.attr("data-animate", animatedSrc);
        	gifDiv.append(p);
        	gifDiv.append(gifImage);

        	$(".gif-view").prepend(gifDiv);
          $(".gif-view").val('');               
                 
}       	       
	});
}


	$("#addGif").on("click", function(event) {
        event.preventDefault();
        var newGif = $("#gifInput").val().trim();
        gifTopics.push(newGif);
        console.log(gifTopics);
        $("#gifInput").val('');
        displayButtons();
      });


	function displayButtons() {
    $("#myButtons").empty();
    for (var i = 0; i < gifTopics.length; i++) {
      var a = $('<button class="btn btn-primary">');
      a.attr("id", "gif");
      a.attr("data-search", gifTopics[i]);
      a.text(gifTopics[i]);
      $("#myButtons").append(a);
    }
  }


  displayButtons();

  $(document).on("click", "#gif", myFunction);

  
  $(document).on("click", ".gifGiphy", pausePlayGifs);

  

 
  function pausePlayGifs() {
  	 var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}


});
