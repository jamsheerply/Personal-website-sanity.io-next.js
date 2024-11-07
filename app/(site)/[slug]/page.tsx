// [slug]/page.tsx
import { getPage } from "@/sanity/sanity-utils";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return [];
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  try {
    const page = await getPage(slug);
    if (!page) {
      notFound();
    }

    return (
      <div>
        <h1 className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent text-5xl drop-shadow font-extrabold">
          {page.title}
        </h1>
        <div className="text-lg text-gray-700 mt-10">
          <PortableText value={page.content} />
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
}
