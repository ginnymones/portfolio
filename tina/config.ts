import { defineConfig } from "tinacms";

// Background fields shared across all page content types
const backgroundFields = [
  {
    type: "string" as const,
    name: "backgroundType",
    label: "Background Type",
    options: [
      { value: "none", label: "None (default)" },
      { value: "image", label: "Still Image" },
      { value: "video", label: "Video (MP4)" },
      { value: "color", label: "Solid Color" },
      { value: "gradient", label: "Gradient" },
    ],
  },
  {
    type: "image" as const,
    name: "backgroundImage",
    label: "Background Image",
    description: "Upload or select a background image (used when type is 'Still Image')",
  },
  {
    type: "string" as const,
    name: "backgroundVideo",
    label: "Background Video URL",
    description: "Path to MP4 video file in /public (e.g., /videos/bg.mp4)",
  },
  {
    type: "string" as const,
    name: "backgroundColor",
    label: "Background Color",
    description: "Hex color value (e.g., #D26D1F). Used when type is 'Solid Color'",
  },
  {
    type: "string" as const,
    name: "gradientFrom",
    label: "Gradient From",
    description: "Starting color for gradient (e.g., #D26D1F)",
  },
  {
    type: "string" as const,
    name: "gradientTo",
    label: "Gradient To",
    description: "Ending color for gradient (e.g., #F3C041)",
  },
  {
    type: "string" as const,
    name: "gradientDirection",
    label: "Gradient Direction",
    options: [
      { value: "to bottom", label: "Top to Bottom" },
      { value: "to right", label: "Left to Right" },
      { value: "to bottom right", label: "Diagonal (↘)" },
      { value: "to bottom left", label: "Diagonal (↙)" },
    ],
  },
  {
    type: "number" as const,
    name: "overlayOpacity",
    label: "Overlay Opacity",
    description: "0 = no overlay, 100 = fully opaque. Recommended: 40-60 for readability.",
  },
  {
    type: "string" as const,
    name: "overlayColor",
    label: "Overlay Color",
    description: "Hex color for the overlay (default: #FFFDF9 to match your background)",
  },
];

export default defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
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
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            required: true,
          },
          ...backgroundFields,
          {
            type: "string",
            name: "heading",
            label: "Heading",
          },
          {
            type: "string",
            name: "headingAccent",
            label: "Heading Accent (colored word)",
          },
          {
            type: "string",
            name: "subtitle",
            label: "Subtitle",
          },
          {
            type: "string",
            name: "tagline",
            label: "Tagline",
          },
          {
            type: "string",
            name: "ctaPrimaryLabel",
            label: "Primary CTA Label",
          },
          {
            type: "string",
            name: "ctaPrimaryLink",
            label: "Primary CTA Link",
          },
          {
            type: "string",
            name: "ctaSecondaryLabel",
            label: "Secondary CTA Label",
          },
          {
            type: "string",
            name: "ctaSecondaryLink",
            label: "Secondary CTA Link",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Page Body",
            isBody: false,
          },
          // About page specific fields
          {
            type: "rich-text",
            name: "bio",
            label: "Bio",
            description: "Your personal bio / introduction text (About page)",
          },
          {
            type: "object",
            name: "experience",
            label: "Work Experience",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.role ? `${item.role} — ${item.company}` : "New Experience",
              }),
            },
            fields: [
              {
                type: "string",
                name: "role",
                label: "Role / Job Title",
                required: true,
              },
              {
                type: "string",
                name: "company",
                label: "Company",
                required: true,
              },
              {
                type: "string",
                name: "period",
                label: "Time Period",
                description: "e.g., 2024 — Present",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          {
            type: "object",
            name: "socialLinks",
            label: "Social Links",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label || "New Link",
              }),
            },
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
                required: true,
              },
              {
                type: "string",
                name: "url",
                label: "URL",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "toolsAndSkills",
            label: "Tools & Skills",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name || "New Skill",
              }),
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Tool / Skill Name",
                required: true,
              },
              {
                type: "string",
                name: "category",
                label: "Category",
                description: "e.g., Design, Research, Development, Collaboration",
              },
              {
                type: "string",
                name: "proficiency",
                label: "Proficiency",
                options: [
                  { value: "expert", label: "Expert" },
                  { value: "advanced", label: "Advanced" },
                  { value: "intermediate", label: "Intermediate" },
                  { value: "beginner", label: "Beginner" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "siteSettings",
        label: "Site Settings",
        path: "src/content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          global: true,
        },
        match: {
          include: "site-settings",
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Site Name",
            required: true,
          },
          {
            type: "string",
            name: "email",
            label: "Contact Email",
            required: true,
          },
          {
            type: "string",
            name: "copyright",
            label: "Copyright Text",
          },
          {
            type: "string",
            name: "footerHeading",
            label: "Footer Heading",
            description: "The heading shown in the footer section",
          },
          {
            type: "string",
            name: "footerDescription",
            label: "Footer Description",
            ui: {
              component: "textarea",
            },
            description: "The paragraph text below the footer heading",
          },
          {
            type: "object",
            name: "socialLinks",
            label: "Social Links",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label || "New Link",
              }),
            },
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
                required: true,
              },
              {
                type: "string",
                name: "url",
                label: "URL",
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "caseStudy",
        label: "Case Studies",
        path: "src/content/case-studies",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              return (values?.title || "")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "status",
            label: "Status",
            options: [
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" },
            ],
            required: true,
          },
          {
            type: "image",
            name: "thumbnail",
            label: "Thumbnail (4:3 ratio)",
            required: true,
          },
          {
            type: "image",
            name: "headerImage",
            label: "Header Image (16:9 ratio)",
            required: true,
          },
          {
            type: "string",
            name: "summary",
            label: "Summary",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "string",
            name: "client",
            label: "Client",
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "liveUrl",
            label: "Live URL",
          },
          ...backgroundFields,
          {
            type: "rich-text",
            name: "body",
            label: "Case Study Content",
            isBody: true,
          },
        ],
      },
    ],
  },
});
