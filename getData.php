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
echo json_encode($data);