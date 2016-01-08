$( document ).ready(function() {
	//preload
	$.ajax({
	  url: "partial-home.html",
	  success: function(){console.log("preload home success")}
	});
	$.ajax({
	  url: "partial-projects.html",
	  success: function(){console.log("preload projects success")}
	});
	$.ajax({
	  url: "partial-about.html",
	  success: function(){console.log("preload about success")}
	});
});