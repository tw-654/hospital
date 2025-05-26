'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import '../style.css';

// 定义医生类型
type Doctor = {
    id: number;
    name: string;
    title: string;
    specialty: string;
};

const DepartmentPage = () => {
    const [doctorsData, setDoctorsData] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const router = useRouter();
    const params = useSearchParams();

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    // 定义默认医生数据
    const defaultDoctors: Doctor[] = [
        { id: 1, name: '医生 1', title: '医师', specialty: '科室' },
        { id: 2, name: '医生 2', title: '医师', specialty: '科室' },
        { id: 3, name: '医生 3', title: '医师', specialty: '科室' },
    ];

    // 从环境变量中获取 API URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

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

        // 获取医生数据
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const department = params.get('department');
                const res = await fetch(`${apiUrl}/doctors?department=${department}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch doctors: ${res.status} ${res.statusText}`);
                }
                const data = await res.json();
                if (data.length === 0) {
                    setDoctorsData(defaultDoctors);
                } else {
                    setDoctorsData(data);
                }
            } catch (error: any) {
                setError(error.message);
                setDoctorsData(defaultDoctors);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiUrl, params]);

    const handleRegister = (doctor: Doctor) => {
        if (!isLoggedIn) {
            alert('请先登录后再进行挂号');
            router.push('/login');
            return;
        }
        setSelectedDoctor(doctor);
        setShowModal(true);
    };

    const handleConfirmRegister = async () => {
        try {
            if (!selectedDoctor) {
                throw new Error('No doctor selected');
            }

            const department = params.get('department');
            const token = localStorage.getItem('token');
            const res = await fetch(`${apiUrl}/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    doctorId: selectedDoctor.id,
                    department: department,
                    time: new Date().toISOString()
                })
            });

            if (!res.ok) {
                throw new Error(`挂号失败: ${res.status} ${res.statusText}`);
            }

            const responseData = await res.json();
            alert('挂号成功！' + responseData.message);
            router.push('/');

        } catch (err: any) {
            alert('挂号失败: ' + err.message);
        } finally {
            setShowModal(false);
        }
    };

    return (
        <div className="department-container">
            <header>
                <h1 id="departmentTitle">医生列表</h1>
                <div className="header-buttons">
                    <Link href="/" className="return-btn">返回首页</Link>
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
                </div>
            </header>
            {loading ? (
                <div className="loading">
                    加载中...
                </div>
            ) : error ? (
                <div className="error">
                    错误: {error}
                </div>
            ) : (
                <div className="doctor-list">
                    {doctorsData.map((doctor, index) => (
                        <div key={doctor.id} className="doctor-card">
                            <h3>
                                序号：{index + 1} 医生：{doctor.name || '暂无数据'}
                            </h3>
                            <p className="doctor-info">职称: {doctor.title || '暂无数据'}</p>
                            <p className="doctor-info">专长: {doctor.specialty || '暂无数据'}</p>
                            <button
                                className="register-btn"
                                onClick={() => handleRegister(doctor)}
                            >
                                挂号
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* 添加医生信息按钮 - 仅管理员可见 */}
            {isLoggedIn && isAdmin && (
                <div className="fixed right-4 bottom-4">
                    <Link href="/department/adminis">
                        <button
                            className="relative bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            +
                            {showTooltip && (
                                <div className="absolute top-0 right-14 bg-gray-800 text-white text-sm py-1 px-2 rounded">
                                    添加医生信息
                                </div>
                            )}
                        </button>
                    </Link>
                </div>
            )}

            {/* 挂号确认弹窗 */}
            {showModal && selectedDoctor && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={() => setShowModal(false)}>×</span>
                        <h2>确认挂号</h2>
                        <p>医生：{selectedDoctor.name}</p>
                        <p>职称：{selectedDoctor.title}</p>
                        <p>专长：{selectedDoctor.specialty}</p>
                        <div className="modal-buttons">
                            <button onClick={handleConfirmRegister}>确认挂号</button>
                            <button onClick={() => setShowModal(false)}>取消</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DepartmentPage;