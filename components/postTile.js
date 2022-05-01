import Link from "next/dist/client/link";
import Image from "next/image"

export const PostTile = ({post}) => {

    return(
        <div className="p-2 lg:w-1/3 md:w-1/2" key={post.node.id}>
          <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <Link
              key={post.node.sys.filename}
              href={`/` + post.node.sys.filename}
              passHref
              >
                <a key={post.id}>
                  <Image width={720} height={550} className="lg:h-48 md:h-36 w-full object-cover object-center" src={post.node.data.heroImg} alt="blog" />
              </a>
            </Link>
            <div className="p-6">
              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
              <Link
              key={post.node.sys.filename}
              href={`/` + post.node.sys.filename}
              passHref
              >
                  <a key={post.id}><h1 className="title-font text-lg font-medium text-gray-900 mb-3">{post.node.data.title}</h1></a>
              </Link>
              <div className="flex items-center flex-wrap ">
              <Link
              key={post.node.sys.filename}
              href={`/` + post.node.sys.filename}
              passHref
              >
                <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Czytaj</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
    )
}