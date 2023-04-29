'use client'

import { Fragment, useState } from "react"
import Image from "next/image";
import { Dialog, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react';
import { submitAuthor } from "services";

import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { SlateEditor } from "components";
import ExampleDocument from "utils/ExampleDocument";

const RichTextModal = ({ isOpen, setIsOpen }) => {
    const [document, updateDocument] = useState(ExampleDocument);

    function closeModal() {
        setIsOpen(false)
    }

    const { data: session } = useSession();

    const handleAuthorSubmission = () => {
        if (!session)
            return;

        const authorObj = {
            name: session?.user?.name,
            url: session?.user?.image
        }

        submitAuthor(authorObj);
        closeModal();
    }


    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col items-center">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg flex flex-col font-medium leading-6 text-gray-900 text-center"
                                >
                                    Hey 👋
                                    <u className="flex gap-5 items-center justify-center">
                                        <div className='cursor-pointer rounded-full transition-all duration-100 hover:shadow-lg w-fit m-0 items-center justify-center'>
                                            <Image
                                                unoptimized
                                                alt={session?.user?.name}
                                                height="30"
                                                width="30"
                                                className="drop-shadow-lg rounded-full h-8 w-8"
                                                src={session?.user?.image}
                                            />
                                        </div>
                                        {session?.user?.name}
                                    </u>
                                    <br />
                                    Write an awesome blog
                                </Dialog.Title>

                                <div className="mt-4">

                                    <form>
                                        <div class="mb-6">
                                            <label for="bio" class="block mb-2 text-sm font-medium text-gray-900 ">Look cool with a cool bio!</label>
                                            <input type="text" id="bio" class="bg-blue-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Bio..." required />
                                        </div>

                                        <div class="mb-6">
                                            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 ">A catchy title</label>
                                            <input type="text" id="title" class="bg-blue-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title..." required />
                                        </div>

                                        <div class="mb-6">
                                            <label for="excerpt" class="block mb-2 text-sm font-medium text-gray-900 ">Concise Excerpt</label>
                                            <input type="text" id="excerpt" class="bg-blue-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Excerpt..." required />
                                        </div>
                                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                                            <div>
                                                <label for="image" class="block mb-2 text-xs font-medium text-gray-900 ">Get your blog a good face 📸</label>
                                                <input type="text" id="image" class="bg-blue-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Image..." required />
                                            </div>
                                            <div>
                                                <label for="category" class="block mb-2 text-xs font-medium text-gray-900 ">Wanna create a new category?</label>
                                                <input type="text" id="category" class="bg-blue-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Woah!..." required />
                                            </div>
                                        </div>

                                        <div class="mb-6">
                                            <label for="content" class="block mb-2 text-sm font-medium text-gray-900 ">Unleash your creativity here 👇</label>
                                            {/* <input type="text" id="content" class="bg-blue-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Rock on..." required /> */}
                                            {/* <SlateEditor /> */}
                                        </div>
                                    </form>

                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={handleAuthorSubmission}
                                    >
                                        Let&apos;s Go 🚀
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default RichTextModal;