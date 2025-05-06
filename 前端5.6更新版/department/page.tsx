'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
// 引入全局的 style.css 文件
import '../style.css'; 

const DepartmentPage = () => {
    const [doctorsData, setDoctorsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 模拟从 API 获取数据
        const fetchDoctors = async () => {
            try {
                // 这里可以替换为实际的 API 请求
                // const response = await fetch('/api/doctors');
                // const data = await response.json();
                const mockData = [
                    { id: 1, name: '张三', title: '主任医师', specialty: '心血管内科' },
                    { id: 2, name: '李四', title: '副主任医师', specialty: '呼吸内科' },
                    { id: 3, name: '王五', title: '主治医师', specialty: '消化内科' }
                ];
                setDoctorsData(mockData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    if (loading) {
        return (
            <div>
                <header>
                    <h1 id="departmentTitle"></h1>
                    <Link href="/" className="return-btn">
                        返回首页
                    </Link>
                </header>
                <div className="loading">加载中...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <header>
                    <h1 id="departmentTitle"></h1>
                    <Link href="/" className="return-btn">
                        返回首页
                    </Link>
                </header>
                <div className="error">错误: {error}</div>
            </div>
        );
    }

    return (
        <div>
            <header>
                <h1 id="departmentTitle">科室医生列表</h1>
                <Link href="/" className="return-btn">
                    返回首页
                </Link>
            </header>
            <div className="doctor-list" id="doctorContainer">
                {doctorsData.map((doctor) => (
                    <div key={doctor.id} className="doctor-card">
                        <h3>{doctor.name}</h3>
                        <p>职称: {doctor.title}</p>
                        <p>专长: {doctor.specialty}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DepartmentPage;