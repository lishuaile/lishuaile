<?php

namespace App\Server;

class GetWu
{
    /**
     * 无限极分类
     * 2022/11/28  9:02
     */
    public  function Getwu($comments, $parent_id = 0, $level = 0){
        $arr = [];
        foreach ($comments as $key => $val) {
            if ($val['pid'] == $parent_id) {
                $val['level'] = $level;
                $val['childs'] =self::Getwu($comments, $val['id'], $level + 1);
                $arr[] = $val;
            }
        }
        return $arr;
    }
}
