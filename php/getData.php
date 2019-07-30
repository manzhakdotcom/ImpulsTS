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

$table = (isset($_GET['table']) && trim($_GET['table'] !== '')) ? $_GET['table'] : die('Нет таблицы');
$param = (isset($_GET['param']) && trim($_GET['param'] !== '')) ? $_GET['param'] : '';

if($param === '0') {
    echo array();
    return;
}


if ($param) {
    $sth = $pdo->prepare('select sign, dev_desc from ' . $table . ' where kp_id = ' . $param);
} else {
    $sth = $pdo->prepare('select id, sign from ' . $table . ' where typertu_id > 0');
}

$sth->execute();
$data = $sth->fetchAll(PDO::FETCH_ASSOC);
header('Content-Type:application/json;charset=UTF-8');
echo json_encode($data);