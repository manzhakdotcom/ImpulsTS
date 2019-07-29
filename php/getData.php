<?php
$config = require __DIR__ . '/config.php';

$pdo = new PDO(
    $config['driver'] . 
    ':host=' . 
    $config['host'] . 
    ';dbname=' . 
    $config['dbname'], 
    $config['user'], 
    $config['password']
);

$table = (isset($_GET['table']) && trim($_GET['table'] !== '')) ? $_GET['table'] : 'kp';

$sth = $pdo->prepare('select id, sign from ' . $table . ' where typertu_id > 0');
$sth->execute();
$data = $sth->fetchAll(PDO::FETCH_ASSOC);
header('Content-Type:application/json;charset=UTF-8');
echo json_encode($data);