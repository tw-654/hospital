// pages/login.tsx
import React, { useState } from 'react';
import Link from 'next/link';

const LoginPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (registerUsername === '' || registerPassword === '') {
            alert('注册时用户名和密码不能为空，请重新输入！');
            return;
        }
        // 这里可以添加实际的注册逻辑，比如发送请求到后端
        // 注册成功后切换到登录页
        setActiveTab('login');
    };

    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loginUsername === '' || loginPassword === '') {
            alert('登录时用户名和密码不能为空，请重新输入！');
            return;
        }
        // 这里可以添加实际的登录逻辑，比如发送请求到后端
        // 登录成功后跳转到 index 页
        window.location.href = '/';
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
                {activeTab === 'login' && (
                    <div>
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
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    登录