var bumpTimer;

function goToHome()
{
	$("#trigger-home").trigger('click');
}

window.onload = function()
{
	var preload = new createjs.LoadQueue();
	preload.on("complete", handleComplete, this);
	preload.loadManifest([
     {src:"img/charliezhang.png"},
     {src:"img/dismahjam.png"},
     {src:"img/getout.png"},
     {src:"img/greenidentity.png"},
     {src:"img/lectorial.png"},
     {src:"img/myomusic.png"},
     {src:"img/shooter.png"},
     {src:"img/voyagr.png"},
     {src:"partial-home.html"},
     {src:"partial-about.html"},
     {src:"partial-projects.html"}
 	]);

 	function handleComplete()
 	{
 		$(".nav-init")[0].click();
 	}

}