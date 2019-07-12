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

$sth = $pdo->prepare('select * from kp');
$sth->execute();
$data = $sth->fetchAll(PDO::FETCH_ASSOC);
header('Content-Type:application/json;charset=UTF-8');
echo json_encode($data);