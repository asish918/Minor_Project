import Image from "next/image"

const Author = ({ author }) => {
    return (
        <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20 w-full">
            <div className="absolute left-[45%] -top-14">
                <Image
                    alt="authorImage"
                    height='100'
                    width='100'
                    className="align-middle rounded-full h-24 w-24 object-cover"
                    src={author.photo.url}
                />
            </div>

            <h3 className="text-white my-4 text-xl font-bold">{author.name}</h3>
            <p className="text-white text-lg">{author.bio}</p>
        </div>
    )
}

export default Author