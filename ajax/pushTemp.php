<?php
require_once '../includes/db.php'; // The mysql database connection script

if ((isset($_GET['TEMP'])) and (($_GET['KEY']) == "xxxx")) {
	$TEMP = ($_GET['TEMP']);
	$inserted = $mysqli->query("INSERT INTO office_temp (Date, Temp)	VALUES (NOW(), $TEMP)");	
} 
?>