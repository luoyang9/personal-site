<?php
// define variables and set to empty values
$name = $email = $subject = $message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = test_input($_POST["name"]);
    $email = test_input($_POST["email"]);
    $subject = test_input($_POST["subject"]);
    $message = test_input($_POST["message"]);
	
	
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

function clean_string($string) {

  $bad = array("content-type","bcc:","to:","cc:","href");

  return str_replace($bad,"",$string);

}
 
     
$email_message = "";
$email_message .= "Name: ".clean_string($name)."\n";
$email_message .= "Email: ".clean_string($email)."\n";
$email_message .= "Subject: ".clean_string($subject)."\n";
$email_message .= "Message: ".clean_string($message)."\n";


$email_subject = "Message from website: ";
$email_subject .= clean_string($subject);


$email_to = "charlie.zhang.website@gmail.com"; //company email


// create email headers
 
$headers = 'From: '.$email."\r\n".
 
'Reply-To: '.$email."\r\n" .
 
'X-Mailer: PHP/' . phpversion();
 
if(mail($email_to, $email_subject, $email_message, $headers))
{
	echo 1;
}
else
{
	echo 0;
}


?>