import { LoginForm } from '../../components/ui/loginForm';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { useState } from 'react';
import { z } from 'zod';
import { Label } from '../../components/ui/label';
import { RegisterForm } from '../../components/ui/registerform';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="w-full flex items-center flex-col">
      <div className="flex justify-center w-full pb-8 pt-16 items-center">
        <Button
          variant={isLogin ? 'loginButtons' : 'ghost'}
          onClick={() => setIsLogin(true)}
        >
          Login
        </Button>
        <span className="text-gray-300 ml-4 mr-4">/</span>
        <Button
          variant={isLogin ? 'ghost' : 'loginButtons'}
          onClick={() => setIsLogin(false)}
        >
          Register
        </Button>
      </div>

      <Card className="w-3/6 xs:w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-3/6 h-[650px] flex relative overflow-hidden rounded-lg">
        <div
          className={`hidden sm:flex  absolute top-0 h-full w-[40%] bg-[#1C7ED6] rounded-lg transform transition-transform duration-500 ${
            isLogin ? 'translate-x-[150%]' : 'translate-x-0'
          }`}
        >
          <div className="h-full w-full flex items-center justify-center text-white">
            {isLogin ? 'Welcome Back!' : 'Join Us!'}
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center relative">
          <div
            className={` sm:right-[40%] sm:w-[60%] right-0 w-full flex flex-col justify-center items-center transition-opacity duration-500 ${
              isLogin ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {isLogin && <LoginForm />}
          </div>
          <div
            className={`sm:left-[40%] sm:w-[60%] left-0 w-full flex flex-col justify-center items-center transition-opacity duration-500 ${
              isLogin ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {!isLogin && <RegisterForm />}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginRegister;
