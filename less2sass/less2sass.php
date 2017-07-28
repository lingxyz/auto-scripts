<?php
// 将 less 转化为 sass， 并在 bash 输出
    $less = './test.less';
    $sass = './test.sass';
    if (file_exists($sass)) {
        unlink ('./test.sass');
    }
    $lessFile = fopen("test.less", "r+") or exit("无法打开文件!");
    $sassFile = fopen("test.sass", "x+") or exit("无法创建文件!");
    while(!feof($lessFile))
    {
        $replaceString = preg_replace('/\{|\}|\;/', '', fgets($lessFile));
        echo $replaceString;
        fwrite($sassFile, $replaceString);
    }
    fclose($lessFile);
    fclose($sassFile);
