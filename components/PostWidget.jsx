'use client'

import { useState, useEffect } from 'react'
import moment from "moment"
import Link from "next/link"

import { getRecentPosts, getSimilarPosts } from 'services'
import Image from 'next/image'

const PostWidget = ({ categories, slug }) => {
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if(slug) {
            getSimilarPosts(categories, slug)
                .then((result) => setRelated(result))
            } else {
            getRecentPosts()
                .then((result) => setRelated(result))
            }
    }, [slug])

    return (
        <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                {slug ? 'Related Posts' : 'Recent Posts'}
            </h3>

            {related.map((post, index) => (
                <div key={index} className="flex items-center w-full mb-4">
                    <div className='w-16 flex-none'>
                        <Image 
                            alt='post'
                            height="60"
                            width="60"
                            className='align-middle rounded-full h-8 w-8 object-cover'
                            src={post.featuredImage.url}
                        />
                    </div>

                    <div className='flex-grow ml-4'>
                        <p className='text-gray-500 font-xs'>
                            {moment(post.createdAt).format("MMM DD YYYY")}
                        </p>
                        <Link href={`/post/${post.slug}`} key={index} className='text-md'>
                            {post.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostWidget