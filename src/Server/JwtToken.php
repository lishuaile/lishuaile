<?php

namespace App\Server;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
class JwtToken
{
    public static function Encryption($data){
        $key = 'example_key';
        $payload = [
            'iss' => 'http://example.org',
            'aud' => 'http://example.com',
            'iat' => 1356999524,
            'nbf' => 1357000000,
            'data'=>$data
        ];
        $jwt = JWT::encode($payload, $key, 'HS256');
        return $jwt;
    }
    public static function decrypt($token){
        $key = 'example_key';
        $decoded = JWT::decode($token, new Key($key, 'HS256'));
        return $decoded;
    }
}
