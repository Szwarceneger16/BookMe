<?php

namespace App;


trait DateFormatTrait
{
    public static function format_His($date)
    {
        return $date->format('H:i:s');
    }

    public static function format_Ymd_His($date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public static function format_Ymd($date)
    {
        return $date->format('Y-m-d');
    }
}
