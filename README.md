# Emmnez Water Solution Ltd Website

This repository contains the marketing website for **Emmnez Water Solution Ltd**, a company specializing in water treatment, factory installation, equipment supply, and expert support for homes, businesses, schools, and industries in Nigeria.

## Overview
The website serves as the company's primary digital presence and lead-generation platform. It is designed to be mobile-first, communicating trust, professionalism, simplicity, and expertise in water treatment and engineering solutions.

## Features
- Mobile-first, responsive design
- Clean, modern, and premium aesthetics
- Fast loading and performance optimized
- SEO-optimized for search visibility

## Pages
- **Home**: Overview of services, why choose Emmnez, featured projects, and contact CTA.
- **Services**: Detailed explanation of water treatment, factory installation, equipment supply, maintenance, and consultation.
- **Projects**: Showcase of completed projects to build credibility.
- **About**: Company mission, vision, and leadership.
- **Contact**: Multiple ways to reach out including contact form, WhatsApp, phone, email, and physical address.

## Tech Stack
- HTML5
- CSS3 (Vanilla)
- Vanilla JavaScript

## Editing the shared header/footer
The nav, mobile menu, footer, and floating WhatsApp button are identical
on every page. To avoid editing that in five files by hand, they're kept
in `partials/header.html` and `partials/footer.html`. After changing one:

```
python3 build.py
```

This regenerates the shared markup in `index.html`, `services.html`,
`projects.html`, `about.html`, and `contact.html`, leaving each page's
own `<head>` and `<main>` content untouched. The site still deploys as
plain static HTML - this is only a local convenience, no build step is
needed to serve the pages as-is.
