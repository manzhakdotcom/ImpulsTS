<?php
$config = [
    'host' => 'localhost',
    'driver' => 'mysql',
    'dbname' => 'params',
    'user' => 'root',
    'password' => ''
];
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