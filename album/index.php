<?php

require_once('../inc/authorize.php');
include('functions.php');

$album_id = $_POST['album_id'] ? $_POST['album_id'] : '235587';

$album = new rc_get_album_details();

$album->rc_show_album_details($key, $secret, $album_id, $user_agent);

?>