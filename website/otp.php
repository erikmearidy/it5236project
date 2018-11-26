<?php
// Import the application classes
require_once('include/classes.php');

// Create an instance of the Application class
$app = new Application();
$app->setup();


// Declare an empty array of error messages
$errors = array();

// If someone has clicked their email validation link, then process the request
if ($_SERVER['REQUEST_METHOD'] == 'GET') {

	if (isset($_GET['id'])) {
		
		$success = $app->processOTPValidation($_GET['id'], $errors);
		if ($success) {
		header("Location: list.php");
		}

	}

}
?>


<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>One Stop Photos</title>
	<meta name="description" content="Your One Stop Spot for Your Photos">
	<meta name="author" content="Russell Thackston">
	<link rel="stylesheet" href="css/style.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<!--1. Display Errors if any exists 
	2. Display Login form (sticky):  Username and Password -->

<body>
	<?php include 'include/header.php'; ?>

	<h2>Login</h2>

	<?php include('include/messages.php'); ?>
	
	<div>
		<form method="get" action="otp.php">
			
			<input type="text" name="id" id="otp" placeholder="OneTimePassword"  />
			<br/>

			<input type="submit" value="Login" name="login" />
		</form>
	</div>
	<a href="register.php">Need to create an account?</a>
	<br/>
	<a href="reset.php">Forgot your password?</a>
	<?php include 'include/footer.php'; ?>
	<script src="js/site.js"></script>
</body>
</html>
