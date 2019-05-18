<?php
require_once('../inc/authorize.php');
include('functions.php');

$page = $_POST['page'] ? $_POST['page'] : 1;

$num = $_POST['returned'] ? $_POST['returned'] : 25;

$sort = $_POST['sort'] ? $_POST['sort'] : 'year';

$order = $_POST['order'] ? $_POST['order'] : 'desc';

$collection = new rc_get_collection();

$collection->rc_show_collection($key, $secret, $page, $num, $user, $user_agent, $sort, $order);
  
?>
