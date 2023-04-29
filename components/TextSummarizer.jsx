'use client'

import Loader from "./Loader"
import { useEffect, useState } from "react";
import { useLazyGetSummaryQuery } from '../services/article';
import loader from '../src/assets/loader.svg'

const TextSummarizer = () => {
    const [article, setArticle] = useState({
        url: '',
        summary: '',
    })

    const [allArticles, setAllArticles] = useState([]);

    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(
            localStorage.getItem('articles')
        );

        if (articlesFromLocalStorage) {
            setAllArticles(articlesFromLocalStorage);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setArticle({ ...article, url: "https://www.grammarly.com/blog/articles/" })

        const { data } = await getSummary({ articleUrl: article.url });

        if (data?.summary) {

            const newArticle = { ...article, summary: data.summary };
            const updatedAllArticles = [newArticle, ...allArticles];

            setAllArticles(updatedAllArticles);
            setArticle(newArticle);
            console.log(newArticle);

            localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
        }
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <p className="head_text blue_gradient flex justify-center items-center gap-2 rounded-xl border-green-400 border-[1px] w-fit mx-auto p-2 cursor-pointer transition-all duration-300 hover:border-0 hover:text-white hover:bg-clip-border group" onClick={handleSubmit}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500 group-hover:text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                AI powered Text Summarizer
            </p>

            <div className='my-10 max-w-full flex justify-center items-center'>
                {isFetching ? (
                    <img src={loader} alt="loader" className='w-20 h-20 object-contain' />
                ) : error ? (
                    <p className='font-inter font-bold text-black text-center'>Well, that wasn&apos;t supposed to happen...
                        <br />
                        <span className='font-satoshi font-normal text-gray-700'>
                            {error?.data?.error}
                        </span>
                    </p>
                ) : (
                    article.summary && (
                        <div className='flex flex-col gap-3'>
                            <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                                Article <span className='blue_gradient'>Summary</span>
                            </h2>

                            <div className='summary_box'>
                                <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default TextSummarizer