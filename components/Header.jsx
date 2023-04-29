'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image';

import { signIn, signOut, useSession } from 'next-auth/react';

import { getAuthors, getCategories } from 'services'
import { Modal } from 'components';

import { toast, Toaster } from 'react-hot-toast';

import logo from '../src/assets/images.png'
import { submitAuthor } from "services";

const Header = () => {

    const [categories, setCategories] = useState([]);
    const [authIsVerified, setAuthIsVerified] = useState(false);
    const [authorBio, setAuthorBio] = useState('');

    let [isOpen, setIsOpen] = useState(false)

    function openModal() {
        setIsOpen(true)
    }

    function handleSubmit() {
        if (session) {
            const authorObj = {
                name: session?.user?.name,
                url: session?.user?.image,
                email: session?.user?.email,
                bio: authorBio
            }
            submitAuthor(authorObj);
        }

        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="ml-3 flex-1 text-center">
                            <p className="text-sm text-gray-900 font-semibold">
                                Hey, Your details have been successfully submitted
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                Check back later to see whether your are approved
                                <br />
                                <b>Register only once</b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ))

        setIsOpen(false);
    }

    const { data: session } = useSession();

    useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories));

        getAuthors().then((result) => {
            result.map((writer) => {
                if (writer.email === session?.user?.email)
                    setAuthIsVerified(true)
            }
            )
        });
    }, [session])


    return (
        <div className='container mx-auto px-10 mb-8'>
            <Toaster />
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
                        className='cursor-pointer rounded-full transition-all duration-100 hover:shadow-lg float-right align-middle ml-4 mt-1 relative'
                    >
                        <Image
                            unoptimized
                            alt={session.user.name}
                            height="30"
                            width="30"
                            className="align-middle drop-shadow-lg rounded-full h-8 w-8"
                            src={session.user.image}
                        />

                        <div className={`h-3 w-3 rounded-full absolute right-[-1.5px] bottom-[0.5px] ${authIsVerified ? 'bg-green-800 border-[0.5px] border-green-900' : 'bg-red-800 border-[0.5px] border-red-900'}`} />
                    </button>
                }

                <div
                    className='text-blue-400 font-semibold cursor-pointer hover:shadow-lg transition-all duration-100 ease-in float-right align-middle ml-4 bg-white rounded-lg px-2 py-2 active:bg-slate-200'
                    onClick={session ? signOut : signIn}
                >
                    {session ? 'Sign Out' : 'Sign In'}
                </div>

                {authIsVerified &&
                    <button
                        className='text-blue-400 font-semibold cursor-pointer hover:shadow-lg transition-all duration-100 ease-in float-right align-middle ml-4 bg-white rounded-lg px-2 py-2 active:bg-slate-200 disabled:bg-slate-300'
                        onClick={openModal}
                        disabled={!authIsVerified}
                    >
                        Write
                    </button>
                }

                {session && !authIsVerified &&
                    <button
                        className='text-blue-400 font-semibold cursor-pointer hover:shadow-lg transition-all duration-100 ease-in float-right align-middle ml-4 bg-white rounded-lg px-2 py-2 active:bg-slate-200'
                        onClick={openModal}
                    >
                        Register Author
                    </button>
                }

                <Modal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    title={session && !authIsVerified ? "Wanna Write Awesome Blogs??" : "Get Started"}
                    content={session && !authIsVerified ? <div>
                        Click on the button below 👇 to register yourself.
                        <br />
                        <br />
                        Once confirmed by the admin, your Profile should turn into green
                        <br />

                        <div className='flex justify-center items-center'>
                            <div className='cursor-pointer rounded-full transition-all duration-100 hover:shadow-lg align-middle ml-4 mt-1 relative w-fit h-fit'>
                                <Image
                                    unoptimized
                                    alt={session.user.name}
                                    height="30"
                                    width="30"
                                    className="align-middle drop-shadow-lg rounded-full h-8 w-8"
                                    src={session.user.image}
                                />
                                <div className='h-3 w-3 rounded-full absolute right-[-1.5px] bottom-[0.5px] bg-red-800 border-[0.5px] border-red-900' />
                            </div>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>


                            <div className='cursor-pointer rounded-full transition-all duration-100 hover:shadow-lg align-middle ml-4 mt-1 relative w-fit h-fit'>
                                <Image
                                    unoptimized
                                    alt={session.user.name}
                                    height="30"
                                    width="30"
                                    className="align-middle drop-shadow-lg rounded-full h-8 w-8"
                                    src={session.user.image}
                                />
                                <div className='h-3 w-3 rounded-full absolute right-[-1.5px] bottom-[0.5px] bg-green-800 border-green-900 border-[0.5px]' />
                            </div>
                        </div>

                        <div>
                            <br />
                            <label for="bio" class="block mb-2 text-sm font-medium text-gray-900">A cool bio</label>
                            <input type="text" id="bio" class="border bg-green-100 border-gray-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Do nothing...." required onChange={(e) => setAuthorBio(e.target.value)} />
                        </div>
                        <br />
                    </div> :
                        <div>
                            Now that you are approved as an Author.
                            <br />
                            <br />
                            Headover to
                            <a href="https://app.hygraph.com/signup" target="_blank" rel="noreferrer">
                                <img src={logo.src} alt="hygraph-logo" className='w-fit h-5 inline mx-2' />
                            </a>
                            and get yourself registered to access the CMS (Skip to the next step if already done).
                            <br />
                            <br />
                            Once registered, comeback here and click on the link below
                            <br />
                            <br />
                            <a className='text-blue-400 hover:underline' href="https://app.hygraph.com/39d2435807e7433b8f8f956ee52e24f9/master" target="_blank" rel="noreferrer">Access Link</a>
                        </div>
                    }
                    clickHandle={session && !authIsVerified ? handleSubmit : () => setIsOpen(false)}
                />

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