(function(){
	var app = angular.module('personal', []);

	app.controller("PagesController", function(){
		this.active = 1;
		this.isActive = function(page){
			return this.active == page;
		};	
		this.setActive = function(page){
			this.active = page;
		};
	});
	

	app.controller("NavController", function(){
		this.active = false;
		this.unclicked = true;
		this.change = function(){
			if(this.unclicked)
			{
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
				TweenLite.to($(".nav-projects")[0], 0.3, {top:$(".nav-start").position().top+160});
				TweenLite.to($(".nav-contact")[0], 0.3, {top:$(".nav-start").position().top+240});
				TweenLite.to($(".nav-resume")[0], 0.3, {top:$(".nav-start").position().top+320});
			}
		};
		this.deactivate = function(){
			if(this.active)
			{
				this.active = false;
				TweenLite.to($(".nav-home")[0], 0.3, {top:$(".nav-start").position().top});
				TweenLite.to($(".nav-projects")[0], 0.3, {top:$(".nav-start").position().top});
				TweenLite.to($(".nav-contact")[0], 0.3, {top:$(".nav-start").position().top});
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
				TweenLite.to($(".nav-ball")[i], 0.4, {delay:.1*i, left: 25, top: 25+i*80, margin: 0, ease: Power1.easeIn});
			}	
			TweenLite.to($("#name")[0], 1.2, {opacity: 1});
		}
	});

})();