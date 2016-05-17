<?php 
require_once '../includes/db.php'; // The mysql database connection script
require_once '../includes/response.php'; // The TempResponse script

if(isset($_GET['from']) && isset($_GET['to'])){
$from = $_GET['from'];
$to = $_GET['to'];

$query="SELECT TempId, Date, Temp FROM office_temp WHERE Date BETWEEN '$from' AND '$to'";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$arr = array();
if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$arr[] = $row;	
	}
}

$tempResponse = new TempResponse();
$tempResponse->Temps = $arr;

########################################
#get last log date
$query="SELECT MAX(Date) AS Date FROM office_temp WHERE Date BETWEEN '$from' AND '$to'";
$sel = $mysqli->query($query);
$sel_row = $sel->fetch_object();
$tempResponse->LastLogDate = date("c", strtotime($sel_row->Date) );

########################################

# JSON-encode the response
echo $json_response = json_encode($tempResponse);
}
?>