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
        // ģ��� API ��ȡ����
        const fetchArticles = async () => {
            try {
                // ��������滻Ϊʵ�ʵ� API ����
                // const response = await fetch('/api/articles');
                // const data = await response.json();
                const mockData = [
                    { id: 0, title: '�����¡���һ�������ﰲ��֪ͨ', content: '��һ�������ﰲ��...' },
                    { id: 1, title: '������ CT �豸��ʽͶ��ʹ��', content: '������ CT �豸����...' },
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
        return <div className="loading">������...</div>;
    }

    if (error) {
        return <div className="error">����: {error}</div>;
    }

    if (!article) {
        return (
            <div className="notFound">
                <header>
                    <h1>ҽԺ��������</h1>
                    <Link href="/" className="return-btn">������ҳ</Link>
                </header>
                <p>δ�ҵ���Ӧ�����¡�</p>
            </div>
        );
    }

    return (
        <div className="container">
            <header>
                <h1>ҽԺ��������</h1>
                <Link href="/" className="return-btn">������ҳ</Link>
            </header>
            <div className="article-container">
                <h2>{article.title}</h2>
                <div className="article-body">{article.content}</div>
            </div>
        </div>
    );
};

export default ArticlePage;