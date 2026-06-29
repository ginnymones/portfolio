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
          },
          // About page specific fields
          {
            type: "rich-text",
            name: "bio",
            label: "Bio",
            description: "Your personal bio / introduction text (About page)"
          },
          {
            type: "object",
            name: "experience",
            label: "Work Experience",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.role ? `${item.role} \u2014 ${item.company}` : "New Experience"
              })
            },
            fields: [
              {
                type: "string",
                name: "role",
                label: "Role / Job Title",
                required: true
              },
              {
                type: "string",
                name: "company",
                label: "Company",
                required: true
              },
              {
                type: "string",
                name: "period",
                label: "Time Period",
                description: "e.g., 2024 \u2014 Present",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea"
                }
              }
            ]
          },
          {
            type: "object",
            name: "socialLinks",
            label: "Social Links",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label || "New Link"
              })
            },
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
                required: true
              },
              {
                type: "string",
                name: "url",
                label: "URL",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "toolsAndSkills",
            label: "Tools & Skills",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name || "New Skill"
              })
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Tool / Skill Name",
                required: true
              },
              {
                type: "string",
                name: "category",
                label: "Category",
                description: "e.g., Design, Research, Development, Collaboration"
              },
              {
                type: "string",
                name: "proficiency",
                label: "Proficiency",
                options: [
                  { value: "expert", label: "Expert" },
                  { value: "advanced", label: "Advanced" },
                  { value: "intermediate", label: "Intermediate" },
                  { value: "beginner", label: "Beginner" }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "siteSettings",
        label: "Site Settings",
        path: "src/content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          },
          global: true
        },
        match: {
          include: "site-settings"
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Site Name",
            required: true
          },
          {
            type: "string",
            name: "email",
            label: "Contact Email",
            required: true
          },
          {
            type: "string",
            name: "copyright",
            label: "Copyright Text"
          },
          {
            type: "string",
            name: "footerHeading",
            label: "Footer Heading",
            description: "The heading shown in the footer section"
          },
          {
            type: "string",
            name: "footerDescription",
            label: "Footer Description",
            ui: {
              component: "textarea"
            },
            description: "The paragraph text below the footer heading"
          },
          {
            type: "string",
            name: "workTags",
            label: "Work Tags",
            list: true,
            description: "Tags available for filtering case studies on the Works page. Add/remove/reorder as needed."
          },
          {
            type: "object",
            name: "socialLinks",
            label: "Social Links",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label || "New Link"
              })
            },
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
                required: true
              },
              {
                type: "string",
                name: "url",
                label: "URL",
                required: true
              }
            ]
          }
        ]
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
              return (values?.title || "").toLowerCase().replace(/[—–]/g, "-").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/(^-|-$)/g, "");
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "string",
            name: "status",
            label: "Status",
            options: [
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" }
            ],
            required: true
          },
          {
            type: "image",
            name: "thumbnail",
            label: "Thumbnail (4:3 ratio)",
            required: true
          },
          {
            type: "string",
            name: "thumbnailAlt",
            label: "Thumbnail Alt Text",
            description: "Accessible description of the thumbnail image"
          },
          {
            type: "image",
            name: "headerImage",
            label: "Header Image (16:9 ratio)",
            required: true
          },
          {
            type: "string",
            name: "headerImageAlt",
            label: "Header Image Alt Text",
            description: "Accessible description of the header image"
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
          {
            type: "object",
            name: "links",
            label: "Relevant Links",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label || "New Link"
              })
            },
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
                required: true
              },
              {
                type: "string",
                name: "url",
                label: "URL",
                required: true
              },
              {
                type: "string",
                name: "icon",
                label: "Icon",
                options: [
                  { value: "github", label: "GitHub" },
                  { value: "figma", label: "Figma" },
                  { value: "dribbble", label: "Dribbble" },
                  { value: "behance", label: "Behance" },
                  { value: "npm", label: "npm" },
                  { value: "globe", label: "Website" },
                  { value: "play", label: "Demo / Video" },
                  { value: "link", label: "Generic Link" }
                ]
              }
            ]
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
