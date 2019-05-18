<?php
class rc_get_collection {
	// make a call to the discgos api, get collection results -values for key, secret are in authorize file in the inc directory...

	public function rc_show_collection($key, $secret, $page, $num, $user, $user_agent, $sort, $order) 
	{
		
		$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => "https://api.discogs.com/users/".$user."/collection/folders/0/releases?&per_page=".$num."&key=".$key."&page=".$page."&secret=".$secret."&sort=".$sort."&order=".$order,
		  CURLOPT_USERAGENT => $user_agent,
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "GET",
		));

		$response = curl_exec($curl);

		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
		  echo "cURL Error #:" . $err;
		} else {
		  $response = json_encode($response, TRUE);

		  echo $response;

		} // end if 
	
	} // end rc_get_collections

}

?>