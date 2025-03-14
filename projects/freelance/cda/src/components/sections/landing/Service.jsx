import Link from "next/link";

function Service({ img, title, content, url }) {
  return (
    <figure className="w-full rounded-2xl bg-cda-gray-300 mt-12 items-center flex flex-col pb-8 px-8 md:w-2/5 lg:w-full max-w-[24rem]">
      <img src={img} alt={title} className="max-h-24 -mt-12"/>
      <h3 className="text-2xl font-semibold mt-8 text-center">{title}</h3>
      <p className="mt-4 text-center text-lg text-black/50">{content}</p>
      <Link href={url} className="button bg-cda-green-500 text-2xl font-semibold mt-8">Ver mas</Link>
    </figure>
  );
}

export default Service;
