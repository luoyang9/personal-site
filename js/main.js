window.addEventListener('DOMContentLoaded', function() {
	new QueryLoader2(document.querySelector("body"), {
		barColor: "#efefef",
		backgroundColor: "#111",
		percentage: true,
		barHeight: 1,
		minimumTime: 200,
		maxTime: 60000,
		fadeOutTime: 1000
	});
});

$(document).ready(function(){
	
	//go up button
    $.goup({
		containerColor: "#FF6600"
	});
	
	//parallax
	if($(window).width() < 480)
	$('#parallax').parallax("50%", 0);
	$('#parallax2').parallax("50%", 0);
	$('#parallax3').parallax("50%", 0);
	$('#parallax4').parallax("50%", 0);
});

//form
function formSubmit(name, email, subject, message)
{
	if(messagesSent > 3) return;
	
	var alertMessage = document.getElementById("alertMessage");
	var contactAlert = document.getElementById("contactAlert");
	var darkBackground = document.getElementById("darkBackground");
	
	if (name == "" || email == "" || message == "")
	{
		alertMessage.innerHTML = "Your form is invalid";
		contactAlert.style.visibility = "visible";
		darkBackground.style.visibility = "visible";
		return;
	}
	if (!checkEmail(email))
	{
		alertMessage.innerHTML = "Your email is invalid";
		contactAlert.style.visibility = "visible";
		darkBackground.style.visibility = "visible";
		return;
	}
	
	var success = 0;
	var xmlhttp;
	if (window.XMLHttpRequest)
	{
		xmlhttp = new XMLHttpRequest();
	}
	else
	{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange=function()
	{
		if(xmlhttp.readyState==0)
		{
			console.log("not initialized");
		}
		if(xmlhttp.readyState==1)
		{
			console.log("connection established");
		}
		
		if(xmlhttp.readyState==2)
		{
			console.log("request received");
		}
		
		if(xmlhttp.readyState==3)
		{
			console.log("processing request");
		}
		if(xmlhttp.readyState==4)
		{
			success = xmlhttp.responseText;	
			if(success == 1)
			{
				alertMessage.innerHTML = "Message sent!";
				contactAlert.style.visibility = "visible";
				darkBackground.style.visibility = "visible";
				messagesSent++;
			}
			else
			{
				alertMessage.innerHTML = "Something went wrong while sending your form. Please send me an email at charlie.zhang.website@gmail.com instead.";
				contactAlert.style.visibility = "visible";
				darkBackground.style.visibility = "visible";
			}
		}
		
	}
	xmlhttp.open("POST", "php/contactForm.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("name="+name+"&email="+email+"&subject="+subject+"&message="+message);
}

function checkEmail(email)
{
	if(email.match(/^\S+@\S+\.\S+$/))
	{
		return true;
	}
	else
	{
		return false;
	}
}

function closeAlert()
{
	alertMessage.innerHTML = "";
	contactAlert.style.visibility = "hidden";
	darkBackground.style.visibility = "hidden";
}


//smooth scroll to anchor
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, Math.abs(window.pageYOffset - target.offset().top) * 1);
        return false;
      }
    }
  });
});