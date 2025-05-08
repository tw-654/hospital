// pages/login.tsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showRegisterSuccess, setShowRegisterSuccess] = useState(false);

    const router = useRouter();

    const handleTabChange = (tab: 'login' | 'register') => {
        setActiveTab(tab);
    };

    const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (registerUsername === '' || registerPassword === '') {
            alert('注册时用户名和密码不能为空，请重新输入！');
            return;
        }
        setShowRegisterSuccess(true);
        setTimeout(() => {
            setShowRegisterSuccess(false);
            setActiveTab('login');
        }, 1500);
    };

    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loginUsername === '' || loginPassword === '') {
            alert('登录时用户名和密码不能为空，请重新输入！');
            return;
        }
        localStorage.setItem('isLoggedIn', 'true');
        router.push('/');
    };

    return (
        <div className="bg-gray-100 flex justify-center items-center min-h-screen flex-col">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <ul className="flex justify-around mb-6">
                    <li
                        className={`cursor-pointer text-lg font-semibold ${activeTab === 'login' ? 'text-blue-500' : 'text-gray-500'}`}
                        onClick={() => handleTabChange('login')}
                    >
                        登录
                    </li>
                    <li
                        className={`cursor-pointer text-lg font-semibold ${activeTab === 'register' ? 'text-blue-500' : 'text-gray-500'}`}
                        onClick={() => handleTabChange('register')}
                    >
                        注册
                    </li>
                </ul>

                {activeTab === 'login' ? (
                    <form onSubmit={handleLoginSubmit}>
                        <div className="mb-4">
                            <label htmlFor="loginUsername" className="block text-gray-700 text-sm font-bold mb-2">
                                用户名
                            </label>
                            <input
                                type="text"
                                id="loginUsername"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="请输入用户名"
                                value={loginUsername}
                                onChange={(e) => setLoginUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="loginPassword" className="block text-gray-700 text-sm font-bold mb-2">
                                密码
                            </label>
                            <input
                                type="password"
                                id="loginPassword"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="请输入密码"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            登录
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="mb-4">
                            <label htmlFor="registerUsername" className="block text-gray-700 text-sm font-bold mb-2">
                                用户名
                            </label>
                            <input
                                type="text"
                                id="registerUsername"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="请输入用户名"
                                value={registerUsername}
                                onChange={(e) => setRegisterUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="registerPassword" className="block text-gray-700 text-sm font-bold mb-2">
                                密码
                            </label>
                            <input
                                type="password"
                                id="registerPassword"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="请输入密码"
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            注册
                        </button>
                    </form>
                )}

                {showRegisterSuccess && (
                    <div className="mt-4 text-center text-green-500">
                        注册成功！
                    </div>
                )}
            </div>
            <Link href="/" className="mt-6 text-blue-500 hover:underline">返回首页</Link>
        </div>
    );
};

export default LoginPage;