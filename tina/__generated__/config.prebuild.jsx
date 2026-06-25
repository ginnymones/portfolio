// tina/config.ts
import { defineConfig } from "tinacms";
var backgroundFields = [
  {
    type: "string",
    name: "backgroundType",
    label: "Background Type",
    options: [
      { value: "none", label: "None (default)" },
      { value: "image", label: "Still Image" },
      { value: "video", label: "Video (MP4)" },
      { value: "color", label: "Solid Color" },
      { value: "gradient", label: "Gradient" }
    ]
  },
  {
    type: "image",
    name: "backgroundImage",
    label: "Background Image",
    description: "Upload or select a background image (used when type is 'Still Image')"
  },
  {
    type: "string",
    name: "backgroundVideo",
    label: "Background Video URL",
    description: "Path to MP4 video file in /public (e.g., /videos/bg.mp4)"
  },
  {
    type: "string",
    name: "backgroundColor",
    label: "Background Color",
    description: "Hex color value (e.g., #D26D1F). Used when type is 'Solid Color'"
  },
  {
    type: "string",
    name: "gradientFrom",
    label: "Gradient From",
    description: "Starting color for gradient (e.g., #D26D1F)"
  },
  {
    type: "string",
    name: "gradientTo",
    label: "Gradient To",
    description: "Ending color for gradient (e.g., #F3C041)"
  },
  {
    type: "string",
    name: "gradientDirection",
    label: "Gradient Direction",
    options: [
      { value: "to bottom", label: "Top to Bottom" },
      { value: "to right", label: "Left to Right" },
      { value: "to bottom right", label: "Diagonal (\u2198)" },
      { value: "to bottom left", label: "Diagonal (\u2199)" }
    ]
  },
  {
    type: "number",
    name: "overlayOpacity",
    label: "Overlay Opacity",
    description: "0 = no overlay, 100 = fully opaque. Recommended: 40-60 for readability."
  },
  {
    type: "string",
    name: "overlayColor",
    label: "Overlay Color",
    description: "Hex color for the overlay (default: #FFFDF9 to match your background)"
  }
];
var config_default = defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "src/content/pages",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            required: true
          },
          ...backgroundFields,
          {
            type: "string",
            name: "heading",
            label: "Heading"
          },
          {
            type: "string",
            name: "headingAccent",
            label: "Heading Accent (colored word)"
          },
          {
            type: "string",
            name: "subtitle",
            label: "Subtitle"
          },
          {
            type: "string",
            name: "tagline",
            label: "Tagline"
          },
          {
            type: "string",
            name: "ctaPrimaryLabel",
            label: "Primary CTA Label"
          },
          {
            type: "string",
            name: "ctaPrimaryLink",
            label: "Primary CTA Link"
          },
          {
            type: "string",
            name: "ctaSecondaryLabel",
            label: "Secondary CTA Label"
          },
          {
            type: "string",
            name: "ctaSecondaryLink",
            label: "Secondary CTA Link"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Page Body",
            isBody: false
          }
        ]
      },
      {
        name: "caseStudy",
        label: "Case Studies",
        path: "src/content/case-studies",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "image",
            name: "thumbnail",
            label: "Thumbnail (4:3 ratio)",
            required: true
          },
          {
            type: "image",
            name: "headerImage",
            label: "Header Image (16:9 ratio)",
            required: true
          },
          {
            type: "string",
            name: "summary",
            label: "Summary",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true
          },
          {
            type: "string",
            name: "client",
            label: "Client"
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true
          },
          {
            type: "string",
            name: "liveUrl",
            label: "Live URL"
          },
          ...backgroundFields,
          {
            type: "rich-text",
            name: "body",
            label: "Case Study Content",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
