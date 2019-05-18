<?php

class rc_get_random_album {
	// make a call to discogs api using random page number, then pull a random album from the returned results array.

	public function rc_show_random_album($key, $secret, $randPage, $num, $user, $user_agent, $sort)
	{
		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_URL => "https://api.discogs.com/users/".$user."/collection/folders/0/releases?&per_page=".$num."&key=".$key."&page=".$randPage."&secret=".$secret."&sort=".$sort,
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
	}

}
?>