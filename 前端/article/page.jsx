'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import '../style.css';

const ArticlePage = () => {
    const [articlesData, setArticlesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [article, setArticle] = useState(null);

    const { searchParams } = new URL(window.location.href);
    const articleId = parseInt(searchParams.get('id'), 10);

    useEffect(() => {
        // 模拟从 API 获取数据
        const fetchArticles = async () => {
            try {
                // 这里可以替换为实际的 API 请求
                // const response = await fetch('/api/articles');
                // const data = await response.json();
                const mockData = [
                    { id: 0, title: '【最新】五一假期门诊安排通知', content: '五一假期门诊安排...' },
                    { id: 1, title: '新引进 CT 设备正式投入使用', content: '新引进 CT 设备详情...' },
                ];
                setArticlesData(mockData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    useEffect(() => {
        if (!loading && !error) {
            const foundArticle = articlesData.find(item => item.id === articleId);
            setArticle(foundArticle);
        }
    }, [loading, error, articleId, articlesData]);

    if (loading) {
        return <div className="loading">加载中...</div>;
    }

    if (error) {
        return <div className="error">错误: {error}</div>;
    }

    if (!article) {
        return (
            <div className="notFound">
                <header>
                    <h1>医院公告详情</h1>
                    <Link href="/" className="return-btn">返回首页</Link>
                </header>
                <p>未找到对应的文章。</p>
            </div>
        );
    }

    return (
        <div className="container">
            <header>
                <h1>医院公告详情</h1>
                <Link href="/" className="return-btn">返回首页</Link>
            </header>
            <div className="article-container">
                <h2>{article.title}</h2>
                <div className="article-body">{article.content}</div>
            </div>
        </div>
    );
};

export default ArticlePage;