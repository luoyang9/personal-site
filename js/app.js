"use strict";

(function(){
	var app = angular.module('personal', ['ui.router']);

	app.config(function($stateProvider, $urlRouterProvider){

		$stateProvider
			.state('home', {
				url: "/home",
				templateUrl: 'partial-home.html'
			})
			.state('projects', {
				url: "/projects",
				templateUrl: "partial-projects.html",
				controller: "ProjectsController"
			})
			.state('about', {
				url: "/about",
				templateUrl: "partial-about.html"
			});
	});

	app.controller("NavController", ['$scope', function($scope){

		$scope.active = false;
		$scope.triggered = false;
		$scope.unclicked = true;
		$scope.mobile = false;

		$scope.trigger = function(){
			$scope.unclicked = false;
			$scope.expand();
			$scope.fly(true);
		}


		$scope.change = function(){
			if($scope.triggered)
			{
				if($scope.active) $scope.shrink();
				else $scope.expand();
			}
		};
		$scope.activate = function(){
			if(!$scope.active) 
			{
				$scope.active = true;
				TweenLite.to($(".nav-home"), 0.3, {top:$(".nav-start").position().top+80});
				TweenLite.to($(".nav-about"), 0.3, {top:$(".nav-start").position().top+160});
				TweenLite.to($(".nav-projects"), 0.3, {top:$(".nav-start").position().top+240});
				TweenLite.to($(".nav-resume"), 0.3, {top:$(".nav-start").position().top+320});
			}
		};
		$scope.deactivate = function(){
			if($scope.active)
			{
				$scope.active = false;
				TweenLite.to($(".nav-home"), 0.3, {top:$(".nav-start").position().top});
				TweenLite.to($(".nav-about"), 0.3, {top:$(".nav-start").position().top});
				TweenLite.to($(".nav-projects"), 0.3, {top:$(".nav-start").position().top});
				TweenLite.to($(".nav-resume"), 0.3, {top:$(".nav-start").position().top});
			}
		};
		$scope.expand = function(){
			if(!$scope.active)
			{
				TweenLite.to($(".nav-ball"), 0.2, {width: 75, height: 75, opacity: 1, color: "white"});
				$scope.activate();
			}	
		};

		$scope.desktopExpand = function(){
			if(!$scope.mobile)
			{
				if(!TweenMax.isTweening($(".nav-ball")) && !$scope.active)
				{
					$scope.expand();
				}
			}
		}

		$scope.shrink = function(){
			if($scope.active)
			{
				TweenLite.to($(".nav-ball"), 0.2, {width: 50, height: 50, opacity: 0.2, color: "transparent"});
			}
			$scope.deactivate();
		}

		$scope.fly = function(redirect){
			if(redirect)
			{
				TweenLite.to($("#outer-circle"), 1, {autoAlpha:0, display:"none"});
				TweenLite.to($("#middle-circle"), 1, {autoAlpha:0, display:"none"});
				TweenLite.to($("#inner-circle"), 1, {autoAlpha:0, display:"none"});
			}
			else
			{
				$("#outer-circle").hide();
				$("#middle-circle").hide();
				$("#inner-circle").hide();
			}
			

			for(var i = 0; i < $(".nav-ball").length; i++)
			{
				if(i != $(".nav-ball").length - 2 || !redirect)
				{
					TweenLite.to($(".nav-ball")[i], 0.4, {delay:.15*i, left: 25, top: 25+i*80, margin: 0, ease: Power1.easeIn, onComplete: function(){
						$scope.triggered = true;
					}});
				}
				else
				{
					TweenLite.to($(".nav-ball")[i], 0.4, {delay:.15*i, left: 25, top: 25+i*80, margin: 0, ease: Power1.easeIn, onComplete: goToHome});
				}
			}	
		}

		$scope.mobileShrink = function(){
			if($scope.mobile) $scope.change(); 
		};

		$scope.init = function(){
			if($(window).width() < 600) $scope.mobile = true;

			var split = window.location.href.split("/");
			if(split[split.length-1] != "" && $scope.unclicked) 
			{
				$scope.unclicked = false;
				$scope.expand();
				$scope.fly(false);
			}
			else
			{
				console.log("PRELOADING");
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
			}
		};

    	$scope.init();
	}]);

	app.controller("ProjectsController", function(){

		this.isMobile = function(){
			return $(window).width() < 600;
		};

		this.projects = [
			{
				name: "Vertical Shooter Game",
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
					"Google Picker API",
					"Google Sign-In API"
				]
			},
			{
				name: "OfflineBling",
				description: "OfflineBling allows users to query popular sites like Wikipedia and Wolfram Alpha offline, without WiFi, or data. Created at UofTHacks 2016.",
				image: "img/offlinebling.png",
				hasURL: true,
				url: "https://www.youtube.com/watch?v=NVjwlWY4EpM",
				urlType: "Video",
				source: "http://github.com/utk9/OfflineBling",
				used: [
					"Twilio API",
					"PHP",
					"Android"
				]
			},
			{
				name: "Personal Website",
				description: "The new and updated website about Charlie Zhang (me).",
				image: "img/charliezhang.png",
				hasURL: true,
				url: "http://www.charliezhang.xyz/",
				urlType: "Live",
				source: "http://github.com/luoyang9/personal-site",
				used: [
					"AngularJS",
					"GreenSock",
					"HTML5 Canvas"
				]
			},
			{
				name: "GetOut!",
				description: "A web platform that matches together university students with similar physical interests. Created for the final design project for SHAD 2015.",
				image: "img/getout.png",
				hasURL: true,
				url: "http://www.charliezhang.xyz/getout",
				urlType: "Demo",
				source: "http://github.com/luoyang9/SHAD-2015-Project",
				used: [
					"PHP",
					"MySQL",
					"Bootstrap"
				]
			},
			{
				name: "MyoMusic",
				description: "Ever wanted to play Guitar Hero/DDR with a Myo? Now you can with MyoMusic! Created at EngHack Fall 2015.",
				image: "img/myomusic.png",
				hasURL: true,
				url: "http://www.myomusic.ga",
				urlType: "Live",
				source: "http://github.com/luoyang9/MyoDDR",
				used: [
					"Myo.js",
					"AngularJS",
					"GreenSock"
				]
			},
			{
				name: "DisMahJam",
				description: "Ever wanted to know what yo jam is? Now you can with DisMahJam! Made at TerribleHack 2015. (Note: The terribleness of this project was intended)",
				image: "img/dismahjam.png",
				hasURL: true,
				url: "http://www.dismahjam.xyz",
				urlType: "Live",
				source : "http://github.com/daniel5151/dismahjam",
				used: [
					"PHP",
					"MySQL",
					"jQuery"
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
})();