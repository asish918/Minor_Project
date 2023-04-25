'use client'

import { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image';

import { signIn, signOut, useSession } from 'next-auth/react';

import { getCategories } from 'services'
import RichTextModal from './RichTextModal';

const Header = () => {
    const [categories, setCategories] = useState([]);

    let [isOpen, setIsOpen] = useState(false)

    function openModal() {
        setIsOpen(true)
    }

    const { data: session } = useSession();

    useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories))
    }, [])

    return (
        <div className='container mx-auto px-10 mb-8'>
            <div className='border-b w-full inline-block border-white py-8'>
                <div className='md:float-left inline md:block'>
                    <Link href="/">
                        <span className='cursor-pointer font-bold text-2xl md:text-4xl text-white'>
                            Better Blog
                        </span>
                    </Link>
                </div>


                {session &&
                    <button
                        className='cursor-pointer rounded-full transition-all duration-100 hover:shadow-lg float-right align-middle ml-4 mt-1'
                    >
                        <Image
                            unoptimized
                            alt={session.user.name}
                            height="30"
                            width="30"
                            className="align-middle drop-shadow-lg rounded-full h-8 w-8"
                            src={session.user.image}
                        />
                    </button>
                }

                <div
                    className='text-blue-400 font-semibold cursor-pointer hover:shadow-lg transition-all duration-100 ease-in float-right align-middle ml-4 bg-white rounded-lg px-2 py-2 active:bg-slate-200'
                    onClick={session ? signOut : signIn}
                >
                    {session ? 'Sign Out' : 'Sign In'}
                </div>

                {session &&
                    <div
                        className='text-blue-400 font-semibold cursor-pointer hover:shadow-lg transition-all duration-100 ease-in float-right align-middle ml-4 bg-white rounded-lg px-2 py-2 active:bg-slate-200'
                    onClick={openModal}
                    >
                        Write
                    </div>
                }

                <RichTextModal isOpen={isOpen} setIsOpen={setIsOpen} />

                <div className='hidden md:float-left md:contents'>
                    {categories.map((category, index) => (
                        <Link key={category.slug} href={`/category/${category.slug}`}>
                            <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Header