'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const [userRegistrations, setUserRegistrations] = useState<any[]>([]);

  useEffect(() => {
    // 这里将来会替换为后端 API 调用
    setUserRegistrations(JSON.parse(localStorage.getItem('userRegistrations') || '[]'));
  }, []);

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