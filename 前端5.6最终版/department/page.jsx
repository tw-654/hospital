'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
// ����ȫ�ֵ� style.css �ļ�
import '../style.css'; 

const DepartmentPage = () => {
    const [doctorsData, setDoctorsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // ģ��� API ��ȡ����
        const fetchDoctors = async () => {
            try {
                // ��������滻Ϊʵ�ʵ� API ����
                // const response = await fetch('/api/doctors');
                // const data = await response.json();
                const mockData = [
                    { id: 1, name: '����', title: '����ҽʦ', specialty: '��Ѫ���ڿ�' },
                    { id: 2, name: '����', title: '������ҽʦ', specialty: '�����ڿ�' },
                    { id: 3, name: '����', title: '����ҽʦ', specialty: '�����ڿ�' }
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
                        ������ҳ
                    </Link>
                </header>
                <div className="loading">������...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <header>
                    <h1 id="departmentTitle"></h1>
                    <Link href="/" className="return-btn">
                        ������ҳ
                    </Link>
                </header>
                <div className="error">����: {error}</div>
            </div>
        );
    }

    return (
        <div>
            <header>
                <h1 id="departmentTitle">����ҽ���б�</h1>
                <Link href="/" className="return-btn">
                    ������ҳ
                </Link>
            </header>
            <div className="doctor-list" id="doctorContainer">
                {doctorsData.map((doctor) => (
                    <div key={doctor.id} className="doctor-card">
                        <h3>{doctor.name}</h3>
                        <p>ְ��: {doctor.title}</p>
                        <p>ר��: {doctor.specialty}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DepartmentPage;