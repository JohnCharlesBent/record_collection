<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../inc/authorize.php');
include('functions.php');

$randPage = $_POST['page'] ? $_POST['page'] : 1;

$num = $_POST['returned'] ? $_POST['returned'] : 25;

$sort = $_POST['sort'] ? $_POST['sort'] : 'artist';

$random = new rc_get_random_album();

$random->rc_show_random_album($key, $secret, $randPage, $num, $user, $user_agent, $sort);




?>