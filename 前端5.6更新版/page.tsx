'use client';
import { useState } from 'react';
import Link from 'next/link';

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentArticle, setCurrentArticle] = useState<{ title: string; content: string } | null>(null);

    const navigateToDepartment = (deptName: string) => {
        window.location.href = `/department?department=${encodeURIComponent(deptName)}`;
    };

    const openModal = (title: string, content: string) => {
        setCurrentArticle({ title, content });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentArticle(null);
    };

    return (
        <div>
            <header>
                <h1>奔向五一医院预约挂号系统</h1>
                <Link href="/login" className="login-btn">用户登录</Link>
            </header>
            <div className="hospital-image">
                <img src="/image/hospital-image.png" alt="医院实景图" />
            </div>
            <div className="guide-section">
                <Link href="/guide" className="guide-dialog">智能导诊入口 ▶</Link>
            </div>
            <div className="main-content">
                <div className="registration-section">
                    <h2>门诊挂号</h2>
                    <ul>
                        <li onClick={() => navigateToDepartment('内科')}>内科门诊</li>
                        <li onClick={() => navigateToDepartment('外科')}>外科门诊</li>
                        <li onClick={() => navigateToDepartment('儿科')}>儿科门诊</li>
                        <li onClick={() => navigateToDepartment('妇产科')}>妇产科门诊</li>
                        <li onClick={() => navigateToDepartment('急诊科')}>急诊科</li>
                    </ul>
                </div>
                <div className="notice-section">
                    <h2>医院公告</h2>
                    <ul>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    openModal(
                                        '【最新】五一假期门诊安排通知',
                                        '五一期间门诊正常开放，急诊科24小时接诊。具体排班：4月29日-5月3日，内科、外科普通门诊照常...'
                                    );
                                }}
                            >
                                【最新】五一假期门诊安排通知
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    openModal(
                                        '新引进 CT 设备正式投入使用',
                                        '我院最新引进的256层螺旋CT已正式投入使用，该设备具有扫描速度快、成像清晰等特点...'
                                    );
                                }}
                            >
                                新引进 CT 设备正式投入使用
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    openModal(
                                        '疫情防控就诊须知更新',
                                        '根据最新防疫要求，所有来院患者需出示48小时内核酸阴性证明，请全程佩戴口罩...'
                                    );
                                }}
                            >
                                疫情防控就诊须知更新
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    openModal(
                                        '专家门诊时间调整公告',
                                        '王建国主任医师门诊时间调整为每周二、四上午，张丽华副主任医师新增周三下午门诊...'
                                    );
                                }}
                            >
                                专家门诊时间调整公告
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    openModal(
                                        '预约挂号系统使用指南',
                                        '新版预约挂号系统操作指南：1. 选择科室 2. 选择医生 3. 选择时间 4. 确认信息...'
                                    );
                                }}
                            >
                                预约挂号系统使用指南
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    openModal(
                                        '门诊部夏季作息时间调整',
                                        '自6月1日起，门诊时间调整为：上午8:00-12:00，下午14:30-18:00，夜诊时间不变...'
                                    );
                                }}
                            >
                                门诊部夏季作息时间调整
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    openModal(
                                        '体检中心预约流程更新',
                                        '体检预约改为线上全流程办理，请提前3个工作日通过医院公众号预约，报告可在线查询...'
                                    );
                                }}
                            >
                                体检中心预约流程更新
                            </a>
                        </li>
                    </ul>
                </div>
                {isModalOpen && (
                    <div id="articleModal" className="modal">
                        <div className="modal-content">
                            <span className="close-btn" onClick={closeModal}>×</span>
                            <h2 id="modalTitle">{currentArticle?.title}</h2>
                            <div id="modalBody" className="article-content">
                                {currentArticle?.content}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;