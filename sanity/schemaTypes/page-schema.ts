import { defineType } from "sanity";
import { Rule as SanityRule } from "@sanity/types";

const page = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: SanityRule) =>
        Rule.required()
          .min(5)
          .max(50)
          .error("Title should be between 5 and 50 characters."),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: SanityRule) =>
        Rule.required().error(
          "Slug is required and should be auto-generated from the title."
        ),
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
      validation: (Rule: SanityRule) =>
        Rule.required()
          .min(1)
          .error("Content must contain at least one block."),
    },
  ],
});

export default page;
