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
            alert('ע��ʱ�û��������벻��Ϊ�գ����������룡');
            return;
        }
        // ����������ʵ�ʵ�ע���߼������緢�����󵽺��
        // ע��ɹ����л�����¼ҳ
        setActiveTab('login');
    };

    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loginUsername === '' || loginPassword === '') {
            alert('��¼ʱ�û��������벻��Ϊ�գ����������룡');
            return;
        }
        // ����������ʵ�ʵĵ�¼�߼������緢�����󵽺��
        // ��¼�ɹ�����ת�� index ҳ
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
                        ��¼
                    </li>
                    <li
                        className={`cursor-pointer text-lg font-semibold ${activeTab === 'register' ? 'text-blue-500' : 'text-gray-500'}`}
                        onClick={() => handleTabChange('register')}
                    >
                        ע��
                    </li>
                </ul>
                {activeTab === 'login' && (
                    <div>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="mb-4">
                                <label htmlFor="loginUsername" className="block text-gray-700 text-sm font-bold mb-2">
                                    �û���
                                </label>
                                <input
                                    type="text"
                                    id="loginUsername"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="�������û���"
                                    value={loginUsername}
                                    onChange={(e) => setLoginUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="loginPassword" className="block text-gray-700 text-sm font-bold mb-2">
                                    ����
                                </label>
                                <input
                                    type="password"
                                    id="loginPassword"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="����������"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    ��¼