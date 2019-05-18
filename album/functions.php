<?php

	class rc_get_album_details {

		public function rc_show_album_details($key, $secret, $album_id, $user_agent)
		{
			$curl = curl_init();

			  curl_setopt_array($curl, array(
			  CURLOPT_URL => "https://api.discogs.com/releases/".$album_id."?key=".$key."&secret=".$secret,
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