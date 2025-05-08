'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const [userRegistrations, setUserRegistrations] = useState<any[]>([]);//目前设置为无类型检查用以模拟
/*interface Registration {
  id: string;
  orderNumber: string;
  department: string;
  doctor: string;
  status: '已预约' | '已取消' | '已完成';
  scheduleTime: string;  // ISO 8601格式
  clinicLocation?: string;
}*/
  useEffect(() => {
    // 这里将来会替换为后端 API 调用
    setUserRegistrations(JSON.parse(localStorage.getItem('userRegistrations') || '[]'));
  }, []);
/*useEffect(() => {
  const fetchRegistrations = async () => {
    try {
      const res = await fetch('/api/user/appointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (res.status === 401) {
        router.push('/login');
        return;
      }

      if (!res.ok) throw new Error('获取数据失败');

      const data: Registration[] = await res.json();
      setUserRegistrations(data);
    } catch (err) {
      setError(err.message);
    }
  };

  fetchRegistrations();
}, [router]); // 添加router依赖*/
  return (
    <div className="profile-container">
      <header>
        <h1>个人中心</h1>
        <Link href="/" className="return-btn">返回首页</Link>
      </header>
      <div className="user-registrations">
        <h3 className="section-title">我的挂号记录</h3>
        {userRegistrations.length > 0 ? (
          <ul>
            {userRegistrations.map((reg, idx) => (
              <li key={idx}>
                <div>科室：{reg.department}</div>
                <div>医生：{reg.doctorName}</div>
                <div>时间：{reg.registrationTime}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>暂无挂号记录</p>
        )}
      </div>
    </div>
  );
}