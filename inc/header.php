<?php
/**********************
* Record Collection -- header
* -- Loads the contents of the document header for all pages 
**********************/ 
$title = $_POST['title'] ? $_POST['title'] : 'Collection Contents';
?>

<!-- Begin document -->
<!doctype html>

<html lang="en">
<head>
	<meta charset="utf-8">

	<title>AG | JB | Record Collection | <?php echo $title; ?></title>

	<meta name="description" content="Alison Green and John Bent's record collection">
	<meta name="author" content="John Charles Bent">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="stylesheet" href="https://use.typekit.net/vtp5dwi.css">

	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">

	<link rel="stylesheet" href="dist/css/styles.css">

	<!--[if lt IE 9]>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>
	<![endif]-->
	<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
	<link rel="manifest" href="site.webmanifest">
	<link rel="mask-icon" href="safari-pinned-tab.svg" color="#5bbad5">
	<meta name="msapplication-TileColor" content="#ffc40d">
	<meta name="theme-color" content="#ffffff">
</head>

<body>
	