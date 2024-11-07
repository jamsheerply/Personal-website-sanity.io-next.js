import { defineType } from "sanity";
import { Rule as SanityRule } from "@sanity/types";

const project = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: SanityRule) =>
        Rule.required()
          .min(3)
          .max(50)
          .warning("A title should be between 3 and 50 characters"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule: SanityRule) =>
        Rule.required().error("Slug is required"),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
          validation: (Rule: SanityRule) =>
            Rule.required().error("Alt text is required for accessibility"),
        },
      ],
      validation: (Rule: SanityRule) =>
        Rule.required().error("An image is required"),
    },
    {
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule: SanityRule) =>
        Rule.uri({
          scheme: ["http", "https"],
        })
          .required()
          .error("A valid URL starting with http or https is required"),
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule: SanityRule) =>
        Rule.required().min(1).error("Content must contain at least one block"),
    },
  ],
});

export default project;
