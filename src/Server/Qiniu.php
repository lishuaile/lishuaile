<?php

namespace App\Server;
use lishuo\oss\Manager;
use lishuo\oss\storage\StorageConfig;
class Qiniu
{
    public function GetQiniu($img){

        $config = new StorageConfig("ln5CNft4EH5l1mR4V_UxPIzaYkg8cGrfZaURmPzX", "JwlnK4iP3DwBGEWIhtIpOp7y1mOjZ031lQ30xGs1", "");

        $storage = Manager::storage("qiniu") // 阿里云：aliyun、腾讯云：tencent、七牛云：qiniu
        ->init($config) // 初始化配置
        ->bucket("lslkuailele"); // 指定操作的存储桶

        // 上传文件
        $path =md5(rand(0000,9999).time()).'.png';


        $result = $storage->put($path, $img);

        $name="http://rm38b9s7d.hn-bkt.clouddn.com/".$path;
        return $name;

    }
}
