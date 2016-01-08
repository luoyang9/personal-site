"use strict";

(function(){
	var app = angular.module('personal', ['ui.router']);

	app.config(function($stateProvider, $urlRouterProvider, $locationProvider){

		$stateProvider
			.state('home', {
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
			if(this.unclicked)
			{
				$("#trigger-home").trigger('click');
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
			if(this.unclicked) 
			{
				this.change();
				return;
			}
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

		this.mobileShrink = function(){
			if($(window).width() < 600) this.change(); 
		};

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

		this.isMobile = function(){
			return $(window).width() < 600;
		};

		this.projects = [
			{
				name: "Unnamed Game",
				description: "A vertical shooter game made in libGDX. Currently in development. Features different powerups, enemies, and levels.",
				image: "img/shooter.png",
				hasURL: false,
				url: "",
				urlType: "",
				source: "http://github.com/luoyang9/shooter",
				used: [
					"Java",
					"libGDX"
				]
			},
			{
				name: "Voyagr",
				description: "An online travel blog featuring an interactive map with markers for each blog post. Made at Hack the North 2015.",
				image: "img/voyagr.png",
				hasURL: true,
				url: "http://www.myvoyagr.co",
				urlType: "Live",
				source: "http://github.com/rickeywang/hack2015",
				used: [
					"MapBox API",
					"Google Picker API"
				]
			},
			{
				name: "GetOut!",
				description: "A web platform that matches together university students with similar physical interests. Created for the final design project for SHAD 2015.",
				image: "img/getout.png",
				hasURL: true,
				url: "http://www.charliezhang.xyz/getout",
				urlType: "Live",
				source: "http://github.com/luoyang9/SHAD-2015-Project",
				used: [
					"PHP",
					"MySQL"
				]
			},
			{
				name: "DisMahJam",
				description: "Ever wanted to know what yo jam is? Now you can with DisMahJam! Made at TerribleHack 2015",
				image: "img/dismahjam.png",
				hasURL: true,
				url: "http://www.dismahjam.xyz",
				urlType: "Live",
				source : "http://github.com/daniel5151/dismahjam",
				used: [
					"PHP",
					"MySQL"
				]
			},
			{
				name: "Lectorial!",
				description: "A native Android app where students can communicate with peers in the same course. Made at Tech Retreat 2015.",
				image: "img/lectorial.png",
				hasURL: false,
				url: "",
				urlType: "",
				source: "http://github.com/HCastano/Lectorial",
				used: [
					"Android",
					"PHP"
				]
			},
			{
				name: "Green Identity",
				description: "A company website built for Green Identity, the winning team at SHAD 2015. ",
				image: "img/greenidentity.png",
				hasURL: true,
				url: "http://www.greenidentity.ca",
				urlType: "Live",
				source : "http://github.com/luoyang9/Green-Identity-Website",
				used: [
					"Bootstrap",
					"jQuery",
					"PHP"
				]
			}
		];

	});

	app.controller("AboutController", function(){

	});
})();