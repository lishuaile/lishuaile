   public function getCodeLogin(Request $request)
    {

        try {
            //获取手机号码
            $phone = $request->get('phone');


            //判断手机号码是否为空
            if (empty($phone)) {
                return $this->fail('手机号码不能为空');
            }
            //判断手机号码是否符合规则
            if (!preg_match("/^1[3456789][0123456789]{9}$/", $phone)) {
                return $this->fail('手机号码格式不正确');
            }
            $codePhone = 'phoneCode_' . $phone;//存入验证码
            $timePhone = 'phoneTime_' . $phone;//存入的时间
            $todayPhone = 'phoneToday_' . $phone . date('Ymd');//一天的次数
            //判断是否存入验证码]
            if (Cache::get($codePhone)) {
            // 当前时间戳的时间 减去
                if (time() - Cache::get($timePhone) < 60) {
                    $res = 60 - (time() - Cache::get($timePhone));
                    return $this->fail("还剩{$res}秒后重试");
                }
            }
            if (Cache::get($todayPhone) >= 5) {
                return $this->fail("今天次数已经用完，请明天再来尝试");
            }
            //获取随机四位验证码
            $code = mt_rand(1000, 9999);
            //   $result= (new GetCode())->GetCodePhone($phone,$code);
            Cache::put($codePhone, $code, 300);//验证码300秒后失效
            Cache::put($timePhone, time());//存入当前时间
            Cache::put($todayPhone, Cache::increment($todayPhone));//自增

//            if (!$result){
//                return $this->fail($result);
//            }

            return $this->success('短信获取成功', $code);
        } catch (\Exception $e) {
            return $this->fail($e->getMessage());
        }
    }
