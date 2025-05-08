'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import './style.css';
import { useRouter } from 'next/navigation';

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
    const [departments, setDepartments] = useState<Department[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const router = useRouter();

    useEffect(() => {
        // 检查登录状态
        const checkLoginStatus = () => {
            const loginStatus = localStorage.getItem('isLoggedIn');
            setIsLoggedIn(loginStatus === 'true');
        };
        
        checkLoginStatus();

        // 获取科室数据（预留API接口）
        const fetchDepartments = async () => {
            try {
                // 这里将来会替换为实际的API调用
                // const response = await fetch('/api/departments');
                // const data = await response.json();
                // setDepartments(data);
                
                // 临时使用模拟数据
                const mockDepartments = [
                    { id: 1, name: '内科门诊' },
                    { id: 2, name: '外科门诊' },
                    { id: 3, name: '儿科门诊' },
                    { id: 4, name: '妇产科门诊' },
                    { id: 5, name: '急诊科' }
                ];
                setDepartments(mockDepartments);
            } catch (error) {
                console.error('获取科室数据失败:', error);
            }
        };

        // 获取公告数据（预留API接口）
        const fetchArticles = async () => {
            try {
                // 这里将来会替换为实际的API调用
                // const response = await fetch('/api/articles');
                // const data = await response.json();
                // setArticles(data);
                
                // 临时使用模拟数据
                const mockArticles = [
                    { id: 1, title: '【最新】五一假期门诊安排通知', content: '五一期间门诊正常开放...' },
                    { id: 2, title: '新引进 CT 设备正式投入使用', content: '我院最新引进的256层螺旋CT...' }
                ];
                setArticles(mockArticles);
            } catch (error) {
                console.error('获取公告数据失败:', error);
            }
        };

        fetchDepartments();
        fetchArticles();
    }, []);

    const navigateToDepartment = (deptName: string) => {
        if (!isLoggedIn) {
            alert('请先登录后再进行挂号');
            return;
        }
        router.push(`/department?department=${encodeURIComponent(deptName)}`);
    };

    return (
        <div>
            <header>
                <h1>奔向五一医院预约挂号系统</h1>
                {isLoggedIn ? (
                    <Link href="/profile" className="login-btn">个人中心</Link>
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