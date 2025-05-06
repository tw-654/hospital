// pages/login.tsx
import React, { useState } from 'react';
import Link from 'next/link';

interface ApiResponse {
    success: boolean;
    message?: string;
    token?: string;
}

const LoginPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setErrorMessage('');
    };

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: registerUsername,
                    password: registerPassword,
                }),
            });

            const data: ApiResponse = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'ע��ʧ��');
            }

            // ע��ɹ��߼�
            setActiveTab('login');
            setRegisterUsername('');
            setRegisterPassword('');
            alert('ע��ɹ������¼��');
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : '����δ֪����');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: loginUsername,
                    password: loginPassword,
                }),
            });

            const data: ApiResponse = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || '��¼ʧ��');
            }

            // ��¼�ɹ��߼�
            localStorage.setItem('authToken', data.token!);
            window.location.href = '/';
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : '����δ֪����');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 flex justify-center items-center min-h-screen flex-col">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <ul className="flex justify-around mb-6">
                    <li
                        className={`cursor-pointer text-lg font-semibold ${activeTab === 'login' ? 'text-blue-500' : 'text-gray-500'
                            }`}
                        onClick={() => handleTabChange('login')}
                    >
                        ��¼
                    </li>
                    <li
                        className={`cursor-pointer text-lg font-semibold ${activeTab === 'register' ? 'text-blue-500' : 'text-gray-500'
                            }`}
                        onClick={() => handleTabChange('register')}
                    >
                        ע��
                    </li>
                </ul>

                {errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {errorMessage}
                    </div>
                )}

                {/* ��¼�� */}
                {activeTab === 'login' && (
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
                                disabled={isLoading}
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
                                disabled={isLoading}
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                disabled={isLoading}
                            >
                                {isLoading ? '��¼��...' : '��¼'}
                            </button>
                        </div>
                    </form>
                )}

                {/* ע��� */}
                {activeTab === 'register' && (
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="mb-4">
                            <label htmlFor="registerUsername" className="block text-gray-700 text-sm font-bold mb-2">
                                �û���
                            </label>
                            <input
                                type="text"
                                id="registerUsername"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="�������û���"
                                value={registerUsername}
                                onChange={(e) => setRegisterUsername(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="registerPassword" className="block text-gray-700 text-sm font-bold mb-2">
                                ����
                            </label>
                            <input
                                type="password"
                                id="registerPassword"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="����������"
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'ע����...' : 'ע��'}
                            </button>
                        </div>
                    </form>
                )}

                <div className="mt-4 text-center">
                    <Link href="/" className="text-blue-500 hover:text-blue-700 text-sm">
                        ������ҳ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;