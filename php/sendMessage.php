<?php

// define variables and set to empty values
$name = $email_from = $subject = $message = "";
echo "Contact Form";

if(isset($_POST['email'])) 
{
    $email_to = "charlie.zhang.website@gmail.com"; //website email 
    $email_subject = "Message from website: "; //subject
 
 
    function died($error) {
 
        echo "Sorry, but there were error(s) found in the information you submitted: <br/><br/> ";
        echo $error."<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
		echo "<a href='http://www.charlie-zhang.com#contact'>Back</a>"
        die();
 
    }
     
	//check if vars are set
    if(!isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['subject']) || !isset($_POST['message'])) 
	{
		echo "Sorry, but there appears to be a problem with the form you submitted.";
		echo "Please go <a href='http://www.charlie-zhang.com#contact'>back</a> and try again.";
        died();       
    }
	
	//validate input
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
	  $name = test_input($_POST["name"]);
	  $email_from = test_input($_POST["email"]);
	  $subject = test_input($_POST["subject"]);
	  $message = test_input($_POST["message"]);
	}
	
	function test_input($data) {
	  $data = trim($data);
	  $data = stripslashes($data);
	  $data = htmlspecialchars($data);
	  return $data;
	}
	
	
    $error_message = "";
 
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
 
  if(!preg_match($email_exp,$email_from)) {
 
    $error_message .= 'The email you entered does not appear to be valid.<br />';
 
  }
 
    $string_exp = "/^[A-Za-z .'-]+$/";
 
  if(!preg_match($string_exp,$name)) {
 
    $error_message .= 'The name you entered does not appear to be valid.<br />';
 
  }
 
  if(strlen($message) < 2) {
 
    $error_message .= 'The message you entered does not appear to be valid.<br />';
 
  }
 
  if(strlen($error_message) > 0) {
 
    died($error_message);
 
  }
 
    $email_message = "Form details below.\n\n";
 
     
    function clean_string($string) {
 
      $bad = array("content-type","bcc:","to:","cc:","href");
 
      return str_replace($bad,"",$string);
 
    }
 
     
 
    $email_message .= "Name: ".clean_string($name)."\n";
 
    $email_message .= "Email: ".clean_string($email_from)."\n";
 
    $email_message .= "Subject: ".clean_string($subject)."\n";
 
    $email_message .= "Message: ".clean_string($message)."\n";
	
 
	$email_subject .= clean_string($subject);
 
     
 
// create email headers
 
$headers = 'From: '.$email_from."\r\n".
 
'Reply-To: '.$email_from."\r\n" .
 
'X-Mailer: PHP/' . phpversion();
 
mail($email_to, $email_subject, $email_message, $headers);  
 
?>
 
 
 
<!-- include your own success html here -->
 
 <html>
	<div style="text-align: center;">
		<h2>Thank you for contacting me. I will be in touch with you very soon.</h2>
	</div>
 </html>
 
 
 
 
<?php
	
}
 
?>