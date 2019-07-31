<?php
header('Content-Type:application/json;charset=UTF-8');

$config = require __DIR__ . '/config.php';

$pdo = new PDO($config['driver'] . ':host=' . $config['host'] . ';dbname=' . $config['dbname'], $config['user'], $config['password']);

$table = (isset($_GET['table']) && trim($_GET['table'] !== '')) ? $_GET['table'] : null;
$param = (isset($_GET['param']) && trim($_GET['param'] !== '')) ? $_GET['param'] : null;

if(is_null($table)) {
    echo json_encode(array('table' => 'Нужно задать название таблицы БД.'));
    exit();
}

if (is_null($param)) {
    $sth = $pdo->prepare('select id, sign from ' . $table . ' where typertu_id > 0');
} else {
    $sth = $pdo->prepare('select sign, dev_desc from ' . $table . ' where kp_id = ' . $param);
}

$sth->execute();
$data = $sth->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);