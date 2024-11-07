import { defineConfig } from "sanity";
import schemaTypes from "./sanity/schemaTypes";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

const config = defineConfig({
  projectId: "abmes2pc",
  dataset: "production",
  title: "my personal website",
  apiVersion: "2024-11-06",
  basePath: "/admin",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});

export default config;
