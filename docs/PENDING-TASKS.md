# Pending Tasks — Portfolio Site

## Content (You)

- [ ] Replace placeholder bio text with your actual bio in Tina admin
- [ ] Update work experience entries with your real roles/companies
- [ ] Update tools & skills with your actual tools and proficiency levels
- [ ] Update social links with your actual URLs (Site Settings in Tina)
- [ ] Update email address (Site Settings in Tina)
- [ ] Write and add your real case studies (replace the 3 sample ones)
- [ ] Upload actual thumbnail and header images for each case study
- [ ] Update the Home page heading/subtitle to your preferred copy
- [ ] Upload a background image or video for the Home page (or leave as-is)

## Configuration

- [x] ~~Set a custom domain in Vercel~~
- [x] ~~Add a favicon~~
- [ ] Add Open Graph / social sharing images (`public/og-image.jpg`)
- [ ] Update `metadata` in `layout.tsx` with final site title and description
- [ ] Add the custom domain to Tina Cloud project settings (if using custom domain)

## Completed ✓

- [x] Mobile hamburger menu
- [x] Back to top button
- [x] Image lightbox for case studies
- [x] Tools & Skills section on About page
- [x] Editorial workflow (draft/published)
- [x] Shared site settings JSON (social links, footer, email — single source)
- [x] Footer heading/description editable via Tina
- [x] Favicon (128x128 PNG)

## Nice-to-Haves (Future Improvements)

- [ ] Add page transition animations (fade-in on route change)
- [ ] Add SEO sitemap generation (`next-sitemap` package)
- [ ] Add analytics (Vercel Analytics or Google Analytics)
- [ ] Add a 404 page with custom design
- [ ] Add RSS feed for case studies if desired
- [ ] Add image alt text field to Tina for better accessibility

## Technical Debt

- [ ] `next-mdx-remote` is installed but not actively used (remark/remark-html handles rendering) — can remove if not needed
- [ ] The `public/images/case-studies/placeholder.jpg` is an empty file — remove or replace
- [ ] `contact.json` still exists in pages content (used by ContactSection) — keep it, but note it's not a page route anymore
