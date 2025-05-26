// pages/department/adminis.js

'use client';

import '../../style.css';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

// 定义类型
type Department = {
    id: number;
    name: string;
};

type Doctor = {
    id: number;
    name: string;
    title: string;
    specialty: string;
    department: string;
};

// 更新 API 基础 URL
const API_BASE = 'http://121.40.80.144:3001/api';

const AdminPage = () => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState<Department[]>([]);
    const [newDepartment, setNewDepartment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // 检查管理员权限
        const checkAdminAuth = () => {
            const isAdmin = localStorage.getItem('isAdmin');
            if (isAdmin !== 'true') {
                alert('您没有管理员权限');
                router.push('/');
            }
        };

        checkAdminAuth();

        // 获取科室列表
        const fetchDepartments = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('未登录或登录已过期');
                }

                console.log('正在请求科室列表...');
                console.log('请求URL:', `${API_BASE}/departments`);
                console.log('Token:', token);

                const res = await fetch(`${API_BASE}/departments`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    // 添加超时设置
                    signal: AbortSignal.timeout(10000) // 10秒超时
                });

                console.log('服务器响应状态:', res.status);
                console.log('服务器响应头:', Object.fromEntries(res.headers.entries()));

                if (!res.ok) {
                    if (res.status === 401) {
                        throw new Error('登录已过期，请重新登录');
                    }
                    const errorText = await res.text();
                    console.error('服务器错误响应:', errorText);
                    throw new Error(`获取科室列表失败: ${res.status} ${res.statusText}\n${errorText}`);
                }

                const data = await res.json();
                console.log('获取到的科室数据:', data);
                setDepartments(data);
            } catch (error: any) {
                console.error('获取科室列表失败:', error);
                if (error.name === 'AbortError') {
                    setError('请求超时，请检查网络连接');
                } else if (error.message.includes('Failed to fetch')) {
                    setError('无法连接到服务器，请检查：\n1. 服务器是否正在运行\n2. 网络连接是否正常\n3. 服务器地址是否正确');
                } else {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('未登录或登录已过期');
            }

            const res = await fetch(`${API_BASE}/doctors`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    title,
                    specialty,
                    department,
                }),
            });

            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error('登录已过期，请重新登录');
                }
                const errorData = await res.json();
                throw new Error(errorData.message || '添加医生失败');
            }

            const responseData = await res.json();
            alert(`医生信息添加成功！医生ID: ${responseData.doctorId}`);
            
            // 清空表单
            setName('');
            setTitle('');
            setSpecialty('');
            setDepartment('');

        } catch (error: any) {
            console.error('添加医生失败:', error);
            if (error.message.includes('Failed to fetch')) {
                setError('无法连接到服务器，请检查网络连接');
            } else {
                setError(error.message);
            }
            alert('医生信息添加失败: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddDepartment = async () => {
        if (!newDepartment.trim()) {
            alert('请输入科室名称');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('未登录或登录已过期');
            }

            const res = await fetch(`${API_BASE}/departments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: newDepartment,
                }),
            });

            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error('登录已过期，请重新登录');
                }
                const errorData = await res.json();
                throw new Error(errorData.message || '添加科室失败');
            }

            const responseData = await res.json();
            alert(`科室添加成功！科室ID: ${responseData.departmentId}`);
            setNewDepartment('');

            // 重新获取科室列表
            const updatedRes = await fetch(`${API_BASE}/departments`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!updatedRes.ok) {
                throw new Error('获取更新后的科室列表失败');
            }
            const updatedData = await updatedRes.json();
            setDepartments(updatedData);

        } catch (error: any) {
            console.error('添加科室失败:', error);
            if (error.message.includes('Failed to fetch')) {
                setError('无法连接到服务器，请检查网络连接');
            } else {
                setError(error.message);
            }
            alert('科室添加失败: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">加载中...</div>;
    }

    return (
        <div className="department-container">
            <header>
                <h1 id="departmentTitle">管理医生信息</h1>
                <div className="header-buttons">
                    <button 
                        onClick={() => router.push('/')} 
                        className="return-btn"
                    >
                        返回首页
                    </button>
                </div>
            </header>
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            <div className="admin-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">姓名：</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">职称：</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="specialty">专长：</label>
                        <input
                            type="text"
                            id="specialty"
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="department">科室：</label>
                        <select
                            id="department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                            disabled={loading}
                        >
                            <option value="">请选择科室</option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.name}>{dept.name}</option>
                            ))}
                        </select>
                    </div>
                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={loading}
                    >
                        {loading ? '处理中...' : '添加医生'}
                    </button>
                </form>
                {/* 添加科室 */}
                <div className="add-department">
                    <label htmlFor="newDepartment">添加新科室：</label>
                    <input
                        type="text"
                        id="newDepartment"
                        value={newDepartment}
                        onChange={(e) => setNewDepartment(e.target.value)}
                        disabled={loading}
                    />
                    <button 
                        onClick={handleAddDepartment} 
                        className="add-department-btn"
                        disabled={loading}
                    >
                        {loading ? '处理中...' : '添加科室'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;