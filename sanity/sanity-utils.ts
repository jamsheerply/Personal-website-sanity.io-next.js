import { Page } from "@/types/Page";
import clientConfig from "./config/client-config";
import { Project } from "@/types/Project";
import { createClient, groq } from "next-sanity";

export async function getProjects(): Promise<Project[]> {
  const query = groq`
    *[_type == "project"] {
      _id,
      _createdAt,
      name,
      'slug': slug.current,
      'image': image.asset->url,
      url,
      content
    }
  `;

  return createClient(clientConfig).fetch(query);
}

export async function getProject(slug: string): Promise<Project | null> {
  const query = groq`
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      _createdAt,
      name,
      'slug': slug.current,
      'image': image.asset->url,
      url,
      content
    }
  `;

  const project = await createClient(clientConfig).fetch(query, { slug });
  return project || null;
}

export async function getPages(): Promise<Page[]> {
  const query = groq`*[_type=='page']{
    _id,
    _createdAt,
    title,
    'slug': slug.current
  }`;

  return await createClient(clientConfig).fetch(query);
}
export async function getPage(slug: string): Promise<Page> {
  const query = groq`*[_type=='page'&& slug.current==$slug][0]{
 _id,
 _createdAt,
 title,
 'slug':slug.current,
 content
 }`;
  const page = await createClient(clientConfig).fetch(query, { slug });
  return page || null;
}
