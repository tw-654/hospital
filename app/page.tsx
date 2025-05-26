'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import './style.css';
import { useRouter } from 'next/navigation';

// 更新 API 基础 URL
const API_BASE = 'http://121.40.80.144:3001/api';

type Department = {
    id: number;
    name: string;
};

type Article = {
    id: number;
    title: string;
    content: string;
};

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true); // 添加 loading 状态
    const [error, setError] = useState<string | null>(null); // 添加 error 状态
    const router = useRouter();

    useEffect(() => {
        // 检查登录状态
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token');
            const userInfo = localStorage.getItem('userInfo');
            const adminStatus = localStorage.getItem('isAdmin');
            setIsLoggedIn(!!(token && userInfo));
            setIsAdmin(adminStatus === 'true');
        };

        checkLoginStatus();

        // 获取科室数据
        const fetchDepartments = async () => {
            try {
                const token = localStorage.getItem('token'); // 获取 token

                const res = await fetch(`${API_BASE}/departments`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // 添加认证头
                    },
                     signal: AbortSignal.timeout(10000) // 10秒超时
                });

                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(`获取科室数据失败: ${res.status} ${res.statusText}\n${errorText}`);
                }

                const data = await res.json();
                setDepartments(data);
            } catch (error: any) {
                console.error('获取科室数据失败:', error);
                 if (error.name === 'AbortError') {
                    setError('请求科室数据超时，请检查网络连接');
                } else if (error.message.includes('Failed to fetch')) {
                     setError('无法连接到服务器，请检查：\n1. 服务器是否正在运行\n2. 网络连接是否正常\n3. 服务器地址是否正确');
                 } else {
                    setError(error.message);
                 }
                // 使用模拟数据作为后备
                const mockDepartments = [
                    { id: 1, name: '内科门诊' },
                    { id: 2, name: '外科门诊' },
                    { id: 3, name: '儿科门诊' },
                    { id: 4, name: '妇产科门诊' },
                    { id: 5, name: '急诊科' }
                ];
                setDepartments(mockDepartments);
            } finally {
                // 仅当所有数据加载完成后才设置 loading 为 false
                // setLoading(false);
            }
        };

        // 获取公告数据
        const fetchArticles = async () => {
            try {
                 const token = localStorage.getItem('token'); // 获取 token
                const res = await fetch(`${API_BASE}/articles`, {
                     headers: {
                        'Authorization': `Bearer ${token}` // 添加认证头
                    },
                     signal: AbortSignal.timeout(10000) // 10秒超时
                });

                if (!res.ok) {
                     const errorText = await res.text();
                    throw new Error(`获取公告数据失败: ${res.status} ${res.statusText}\n${errorText}`);
                }

                const data = await res.json();
                setArticles(data);
            } catch (error: any) {
                console.error('获取公告数据失败:', error);
                 if (error.name === 'AbortError') {
                    setError('请求公告数据超时，请检查网络连接');
                } else if (error.message.includes('Failed to fetch')) {
                     setError('无法连接到服务器，请检查：\n1. 服务器是否正在运行\n2. 网络连接是否正常\n3. 服务器地址是否正确');
                 } else {
                    setError(error.message);
                 }
                // 使用模拟数据作为后备
                const mockArticles = [
                    { id: 1, title: '【最新】五一假期门诊安排通知', content: '五一期间门诊正常开放...' },
                    { id: 2, title: '新引进 CT 设备正式投入使用', content: '我院最新引进的256层螺旋CT...' }
                ];
                setArticles(mockArticles);
            } finally {
                // 仅当所有数据加载完成后才设置 loading 为 false
                 // setLoading(false);
            }
        };

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            await Promise.all([
                fetchDepartments(),
                // fetchArticles() // Commented out to focus on login testing
            ]);
            setLoading(false);
        };

        fetchData();

    }, []);

    const navigateToDepartment = (deptName: string) => {
        if (!isLoggedIn) {
            alert('请先登录后再进行挂号');
            router.push('/login');
            return;
        }
        router.push(`/department?department=${encodeURIComponent(deptName)}`);
    };

    if (loading) {
        return <div className="loading">加载中...</div>; // 添加 loading 提示
    }

    if (error) {
         return <div className="error-message">错误：{error}</div>; // 添加错误提示
    }

    return (
        <div>
            <header>
                <h1>奔向五一医院预约挂号系统</h1>
                {isLoggedIn ? (
                    <div className="header-buttons">
                        {isAdmin && (
                            <Link href="/admin" className="admin-btn">管理后台</Link>
                        )}
                        <Link href="/profile" className="login-btn">个人中心</Link>
                    </div>
                ) : (
                    <Link href="/login" className="login-btn">用户登录</Link>
                )}
            </header>
            <div className="hospital-image">
                <img src="/hospital-image.png" alt="医院实景图" />
            </div>
            <div className="guide-section">
                <Link href="/guide" className="guide-dialog">智能导诊入口 ▶</Link>
            </div>
            <div className="main-content">
                <div className="registration-section">
                    <h2>门诊挂号</h2>
                    <ul>
                        {departments.map((dept) => (
                            <li key={dept.id} onClick={() => navigateToDepartment(dept.name)}>
                                {dept.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="notice-section">
                    <h2>医院公告</h2>
                    <ul>
                        {articles.map((article) => (
                            <li key={article.id}>
                                <Link href={`/article?id=${article.id}`}>
                                    {article.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HomePage;