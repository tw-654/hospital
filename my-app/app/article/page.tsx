'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import '../style.css';

type Article = {
    id: number;
    title: string;
    content: string;
};

const ArticlePage = () => {
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const idParam = searchParams.get('id');
    const articleId = idParam !== null ? parseInt(idParam, 10) : null;

    useEffect(() => {
        const fetchArticle = async () => {
            if (!articleId) {
                setError('文章ID无效');
                setLoading(false);
                return;
            }

            try {
                // 这里将来会替换为实际的API调用
                // const response = await fetch(`/api/articles/${articleId}`);
                // const data = await response.json();
                // setArticle(data);
                
                // 临时使用模拟数据
                const mockArticle = {
                    id: articleId,
                    title: '【最新】五一假期门诊安排通知',
                    content: '五一期间门诊正常开放，急诊科24小时接诊。具体排班：4月29日-5月3日，内科、外科普通门诊照常...'
                };
                setArticle(mockArticle);
                setLoading(false);
            } catch (err) {
                setError('获取文章详情失败');
                setLoading(false);
            }
        };

        fetchArticle();
    }, [articleId]);

    if (loading) return <div className="loading">加载中...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!article) return <div className="error">未找到文章</div>;

    return (
        <div className="article-container">
            <header>
                <h1>医院公告详情</h1>
                <Link href="/" className="return-btn">返回首页</Link>
            </header>
            <div className="article-content">
                <h2>{article.title}</h2>
                <div className="article-body">{article.content}</div>
            </div>
        </div>
    );
};

export default ArticlePage;