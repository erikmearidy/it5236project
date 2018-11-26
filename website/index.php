<?php
	
// Import the application classes
require_once('include/classes.php');

// Create an instance of the Application class
$app = new Application();
$app->setup();

// Declare an empty array of error messages
$errors = array();

?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Erik Mearidy</title>
	<meta name="description" content="Russell Thackston's personal website for IT 5236">
	<meta name="author" content="Russell Thackston">
	<link rel="stylesheet" href="css/style.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
	<?php include 'include/header.php'; ?>
	<h2>Welcome to One Stop Photos</h2>
	<img src="css/images/logo.jpg" alt="logo" height="100px" width="100px">
	<p>
		Save your favorite images in one stop! For now you can create an account <a href="login.php">here:</a> or proceed directly to the 
		<a href="login.php">login page</a>.
	</p>
	<?php include 'include/footer.php'; ?>
	<script src="js/site.js"></script>
</body>
</html>
