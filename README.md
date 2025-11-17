# Inkspired Blog

<div align="center">
    <a href="CONTRIBUTING.md#creating-a-pull-request"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
    <a href="https://github.com/prettier/prettier"><img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg"></a>
    <a href="#license"><img src="https://img.shields.io/github/license/sourcerer-io/hall-of-fame.svg?colorB=ff0000"></a>
    <a href="https://vitest.dev/"><img src="https://img.shields.io/badge/tested_with-vitest-6E511F.svg" alt="Tested with Vitest"></a>
    <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmakecolour%2FInkspired"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>
</div>

A modern, bilingual blog platform built with Next.js, Tailwind CSS, and MDX. Perfect for creators, developers, and writers
who want a lightweight, customizable blogging solution with Vietnamese and English language support.

Write your blog in Markdown with bilingual content support and ship it to everyone on the internet! ✨

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Content**: MDX with metadata
- **Languages**: Vietnamese & English with dynamic switching
- **Package Manager**: [pnpm](https://pnpm.io/)

<div align="center">
    <img src="https://github.com/user-attachments/assets/82d9f7c9-17e9-4754-96e6-d88b52745818" alt="Dark Mode" width="49%">
    <img src="https://github.com/user-attachments/assets/a7a47347-54aa-4ce0-9c06-0c94b439579e" alt="Light Mode" width="49%">
</div>

## Features

- 📝 Write posts in MDX format with YAML frontmatter
- 🌐 **Bilingual support** - Vietnamese and English with language switcher
- 🔄 **Smart language detection** - Auto-detects browser language preference
- 💾 **Language persistence** - Saves language choice to localStorage
- 📄 **Multilingual blog posts** - Support for tagged bilingual content in a single file
- ⚡ Fast performance with Next.js - all static HTML files, **100% Core Web Vitals**
- 🖼️ Dynamic Open Graph image generation
- 📰 Auto-generated RSS and Atom feeds
- 🗺️ Automatically generated sitemap
- 🔍 SEO-friendly with structured data (JSON-LD) and semantic HTML
- ♿ WCAG 2.2 accessibility compliant with proper semantic markup
- 🎨 Customizable author branding and social links
- 📱 Responsive lightweight design with system-based dark mode

## Getting Started

### Prerequisites

- Node.js v18.17 or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/open-blog.git
   cd open-blog
   ```

2. Copy the environment template and fill in your details:

   ```bash
   cp .env.example .env.local
   ```

3. Edit `.env.local` with your personal information:

   ```env
   NEXT_PUBLIC_SITE_URL=https://yourblog.com/
   NEXT_PUBLIC_SITE_NAME=Your Blog Name
   NEXT_PUBLIC_SITE_DESCRIPTION=Your blog description
   NEXT_PUBLIC_AUTHOR_NAME=Your Name
   NEXT_PUBLIC_AUTHOR_EMAIL=your.email@example.com
   NEXT_PUBLIC_AUTHOR_IMAGE_URL=https://github.com/yourusername.png
   NEXT_PUBLIC_GITHUB_URL=https://github.com/yourusername/
   NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/yourprofile/
   NEXT_PUBLIC_TWITTER_HANDLE=@yourhandle
   NEXT_PUBLIC_COPYRIGHT_YEAR=2025
   ```

4. Install dependencies:

   ```bash
   pnpm install
   ```

5. Start the development server:

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view your blog.

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Format code
pnpm format
pnpm format:check
```

## Project Structure

```
Inkspired/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── blog/              # Blog posts directory
│   │   │   ├── [slug]/        # Dynamic blog post folders
│   │   │   │   └── page.mdx   # Individual blog post content
│   │   │   ├── layout.tsx     # Blog layout wrapper
│   │   │   └── page.tsx       # Blog index page
│   │   ├── layout.tsx         # Root layout with LanguageProvider
│   │   ├── page.tsx           # Homepage
│   │   └── not-found.tsx      # 404 page
│   ├── components/            # React components
│   │   ├── bilingual-content.tsx   # Bilingual content components
│   │   ├── blog-post-layout.tsx    # Blog post wrapper with "Back" link
│   │   ├── footer.tsx              # Footer with translations
│   │   ├── header.tsx              # Header with language switcher
│   │   ├── language-switcher.tsx   # Language toggle button
│   │   └── ...                     # Other components
│   ├── contexts/              # React contexts
│   │   └── language-context.tsx    # Language state management
│   ├── locales/               # Translation files
│   │   ├── en.json            # English UI translations
│   │   └── vi.json            # Vietnamese UI translations
│   ├── lib/                   # Utility functions
│   │   ├── blog.ts            # Blog metadata helpers
│   │   └── utils.ts           # Common utilities
│   └── styles/                # Global styles
│       └── globals.css        # Tailwind CSS imports
├── mdx-components.tsx         # MDX component overrides
└── .env.local                 # Environment variables
```

## Language System Architecture

### UI Translations

All UI strings are stored in JSON files (`src/locales/en.json` and `src/locales/vi.json`). Components use the `useLanguage()` hook to access translations:

```tsx
import { useLanguage } from "@/contexts/language-context";

function MyComponent() {
  const { t } = useLanguage();
  return <button>{t.nav.home}</button>;
}
```

### Language Context

The `LanguageProvider` wraps the entire app and provides:
- Current language state (`en` | `vi`)
- Language switcher function
- Translations object
- Auto-detection of browser language
- LocalStorage persistence

### Bilingual Blog Content

Blog posts can include content in both languages using tagged components. The content automatically switches based on the selected language without page reload.

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Format code
pnpm format

### Single-Language Posts

1. Create a new directory in `src/app/blog/`:

   ```bash
   mkdir src/app/blog/my-first-post
   ```

2. Add a `page.mdx` file with frontmatter:

   ```mdx
   ---
   title: "My First Post"
   description: "A brief description of the post"
   date: 2024-01-15
   ---

   Your content here...
   ```

3. The post will automatically appear on your blog at `/blog/my-first-post/`

### Bilingual Posts

For posts with Vietnamese and English content, use the bilingual components:

1. Add Vietnamese metadata to frontmatter:

   ```mdx
   ---
   title: "My First Post"
   titleVi: "Bài viết đầu tiên của tôi"
   description: "A brief description of the post"
   descriptionVi: "Mô tả ngắn gọn về bài viết"
   date: 2024-01-15
   ---
   ```

2. Import bilingual components:

   ```mdx
   import { T, P, H2, H3, Bilingual } from "@/components/bilingual-content";
   ```

3. Use components for bilingual content:

   ```mdx
   <H2 en="Introduction" vi="Giới thiệu" />

   <P
     en={<p>This is English content.</p>}
     vi={<p>Đây là nội dung tiếng Việt.</p>}
   />

   <Bilingual
     en={<ul><li>English list item</li></ul>}
     vi={<ul><li>Mục danh sách tiếng Việt</li></ul>}
   />
   ```

> **📚 Check out the [bilingual example post](/blog/welcome-to-inkspired-bilingual/) for a complete demonstration!**

### Bilingual Components Reference

- `<T>` - Inline bilingual text
- `<P>` - Bilingual paragraphs
- `<H2>`, `<H3>`, `<H4>` - Bilingual headings
- `<Bilingual>` - Generic bilingual wrapper for any content
- `<BilingualSection>` - For complex multi-element sections

### Syntax Highlighting

The blog uses **Shiki** for beautiful code syntax highlighting. Here are the features you can use in your code blocks:

#### Basic Code Block

````mdx
```javascript
console.log("Hello World");
```
````

#### Highlight a Single Line

Use `// [!code highlight]` comment to highlight the line:

````mdx
```javascript
function hello() {
  console.log("This line is highlighted"); // [!code highlight]
  console.log("Normal");
}
```
````

#### Highlight Multiple Lines

Use `// [!code highlight:N]` where N is the number of lines to highlight:

````mdx
```javascript
function hello() {
  console.log("Start highlighting"); // [!code highlight:3]
  console.log("This is highlighted");
  console.log("This is also highlighted");
  console.log("Normal");
}
```
````

#### Focus on Lines

Use `// [!code focus]` for a single line or `// [!code focus:N]` for multiple lines:

````mdx
```typescript
const [count, setCount] = useState(0); // [!code focus:2]
const [step, setStep] = useState(1);

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { // [!code focus:3]
    year: "numeric",
    month: "short",
  });
}
```
````

#### Inline Code

Use backticks for inline code: `` `const x = 10;` ``

## License

MIT License - feel free to use this project for any purpose. Attribution is appreciated!

## Support

For issues, feature requests, or questions, please open an issue on GitHub.
