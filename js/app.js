(function(){
	var app = angular.module('personal', ['ui.router']);

	app.config(function($stateProvider, $urlRouterProvider){

		$stateProvider.state('home', {
			url: "/home",
			templateUrl: 'partial-home.html',
			controller: "HomeController"
		})
		.state('projects', {
			url: "/projects",
			templateUrl: "partial-projects.html",
			controller: "ProjectsController"
		})
		.state('about', {
			url: "/about",
			templateUrl: "partial-about.html",
			controller: "AboutController"
		});
	});

	app.controller("NavController", function(){
		this.active = false;
		this.unclicked = true;
		this.change = function(){
			console.log('asdf');
			if(this.unclicked)
			{
				window.location.href = "/#/home"
				this.unclicked = false;
				$(".nav-pulse").remove();
				this.expand();
				this.fly();
			}
			else
			{
				if(this.active) this.shrink();
				else this.expand();
			}
		};
		this.activate = function(){
			if(!this.active) 
			{
				this.active = true;
				TweenLite.to($(".nav-home")[0], 0.3, {top:$(".nav-start").position().top+80});
				TweenLite.to($(".nav-about")[0], 0.3, {top:$(".nav-start").position().top+160});
				TweenLite.to($(".nav-projects")[0], 0.3, {top:$(".nav-start").position().top+240});
				TweenLite.to($(".nav-resume")[0], 0.3, {top:$(".nav-start").position().top+320});
			}
		};
		this.deactivate = function(){
			if(this.active)
			{
				this.active = false;
				TweenLite.to($(".nav-home")[0], 0.3, {top:$(".nav-start").position().top});
				TweenLite.to($(".nav-about")[0], 0.3, {top:$(".nav-start").position().top});
				TweenLite.to($(".nav-projects")[0], 0.3, {top:$(".nav-start").position().top});
				TweenLite.to($(".nav-resume")[0], 0.3, {top:$(".nav-start").position().top});
			}
		};
		this.expand = function(){
			if(this.unclicked) return;
			for(var i = 0; i < $(".nav-ball").length; i++)
			{
				TweenLite.to($(".nav-ball")[i], 0.2, {width: 75, height: 75, opacity: 1, color: "white"});
			}
			this.activate();
		};

		this.shrink = function(){
			if(this.active)
			{
				for(var i = 0; i < $(".nav-ball").length; i++)
				{
					TweenLite.to($(".nav-ball")[i], 0.2, {width: 25, height: 25, opacity: 0.2, color: "transparent"});
				}
			}
			this.deactivate();
		}

		this.fly = function(){
			$(".nav-start").css("background-color", "lightblue");
			for(var i = 0; i < $(".nav-ball").length; i++)
			{
				TweenLite.to($(".nav-ball")[i], 0.4, {delay:.15*i, left: 25, top: 25+i*80, margin: 0, ease: Power1.easeIn});
			}	
		}

		this.init = function(){
			var split = window.location.href.split("/");
			if(split[split.length-1] != "" && this.unclicked) 
			{
				this.unclicked = false;
				$(".nav-pulse").css("display","none");
				this.expand();
				this.fly();
			}
    	};
    	this.init();
	});

	app.controller("HomeController", function(){

	});

	app.controller("ProjectsController", function(){
		this.projects = [
			{
				name: "Voyagr",
				description: "Blahblah",
				image: "voyagr.jpg"
			},
			{
				name: "GetOut!",
				description: "Blah",
				image: "getout.jpg"
			}
		];

	});

	app.controller("AboutController", function(){

	});
})();