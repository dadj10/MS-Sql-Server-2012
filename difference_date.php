<?php
	$date1 = "2008-11-01 22:45:00"; 

	$date2 = "2009-12-04 13:44:01"; 

	$diff = abs(strtotime($date2) - strtotime($date1)); 

	$years   = floor($diff / (365*60*60*24)); 
	$months  = floor(($diff - $years * 365*60*60*24) / (30*60*60*24)); 
	$days    = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24)/ (60*60*24));

	$hours   = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24 - $days*60*60*24)/ (60*60)); 

	$minuts  = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24 - $days*60*60*24 - $hours*60*60)/ 60); 

	$seconds = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24 - $days*60*60*24 - $hours*60*60 - $minuts*60)); 

	printf("%d years, %d months, %d days, %d hours, %d minuts\n, %d seconds\n", $years, $months, $days, $hours, $minuts, $seconds);

?>