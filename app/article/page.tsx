'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import '../style.css';

// API基础URL
const API_BASE = 'http://121.40.80.144:3001';

// 定义文章类型接口
type Article = {
    id: number;          // 文章ID
    title: string;       // 文章标题
    content: string;     // 文章内容
    publish_date: string; // 发布日期
    author?: string;     // 作者（可选）
    pageviews: number;   // 浏览次数
    attachments?: string[]; // 附件列表（可选）
};
/*
//接入后端后拓展的文章类型
// type Article = {
  id: number;
  title: string;
  content: string;
  publish_date: string;     // 新增字段
  author?: string;          // 可选字段
  pageviews: number;        // 浏览次数
  attachments?: string[];   // 附件列表
};*/

// 文章详情页面组件
// 用于显示医院公告的详细内容
const ArticlePage = () => {
    // 状态管理
    const [article, setArticle] = useState<Article | null>(null); // 文章数据
    const [loading, setLoading] = useState(true);  // 加载状态
    const [error, setError] = useState<string | null>(null); // 错误信息

    // 获取URL参数中的文章ID
    const searchParams = useSearchParams();
    const articleId = searchParams.get('id');

    // 获取文章详情
    useEffect(() => {
        const fetchArticle = async () => {
            if (!articleId) {
                setError('未找到文章ID');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                // 发送请求获取文章详情
                const res = await fetch(`${API_BASE}/api/articles/${articleId}`);
                
                if (!res.ok) {
                    if (res.status === 404) throw new Error('文章不存在');
                    throw new Error(`HTTP错误! 状态码: ${res.status}`);
                }
                
                const data: Article = await res.json();
                console.log('从后端 API 获取到的文章数据:', data);

                // 数据格式校验
                if (!data.id || !data.title || !data.content) {
                    throw new Error('返回数据格式错误');
                }

                setArticle(data);
                console.log('articles 状态被更新:', data);
            } catch (err) {
                setError(err instanceof Error ? err.message : '获取文章失败');
                console.error('获取公告数据失败:', error);
            } finally {
                setLoading(false);
            }
            console.log('fetchArticles 函数调用完成');
        };

        fetchArticle();
    }, [articleId]);

    // 加载状态显示
    if (loading) return <div className="loading">加载中...</div>;
    // 错误状态显示
    if (error) return <div className="error">{error}</div>;
    // 文章不存在显示
    if (!article) return <div className="error">未找到文章</div>;

    return (
        // 文章详情页面容器
        <div className="article-container">
            {/* 页面头部 */}
            <header>
                <h1>医院公告详情</h1>
                <Link href="/" className="return-btn">返回首页</Link>
            </header>

            {/* 文章内容区域 */}
            <div className="article-content">
                {/* 文章标题 */}
                <h2>{article.title}</h2>

                {/* 文章元数据 */}
                <div className="article-meta">
                    {article.author && <span>作者: {article.author}</span>}
                    <span>发布时间: {new Date(article.publish_date).toLocaleDateString()}</span>
                    <span>浏览次数: {article.pageviews}</span>
                </div>

                {/* 文章正文 */}
                <div className="article-body">{article.content}</div>

                {/* 文章附件区域 */}
                {article.attachments && article.attachments.length > 0 && (
                    <div className="article-attachments">
                        <h3>附件</h3>
                        <ul>
                            {article.attachments.map((attachment, index) => (
                                <li key={index}>
                                    <a href={attachment} target="_blank" rel="noopener noreferrer">
                                        附件 {index + 1}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

//增加一个边界错误处理模块
export default ArticlePage;