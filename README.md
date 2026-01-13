# TechForward Consulting Website

A clean, modern static website for an IT consulting business. Built with pure HTML and CSS—no frameworks, no build tools required.

## 📁 Project Structure

```
jack-site/
├── index.html      # Homepage - services overview and hero section
├── about.html      # About page - bio, experience timeline, certifications
├── contact.html    # Contact page - form and contact details
├── styles.css      # All styles for the site
├── tests/          # Test suite
│   └── test.js     # HTML validation and link checking tests
├── package.json    # Node.js dependencies (for testing only)
└── README.md       # This file
```

## 🚀 Getting Started

### View Locally

Simply open `index.html` in your browser:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

Or use a local server for a more realistic experience:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js (if installed)
npx serve .
```

Then visit `http://localhost:8000`

## ✏️ Customization

### Update Content

All content is in plain HTML files. To customize:

1. **Business Name**: Search and replace "TechForward" across all HTML files
2. **Personal Info**: Update the name "Alex Morgan" in `about.html`
3. **Contact Details**: Edit email, phone, and location in `contact.html`
4. **Services**: Modify the service cards in `index.html`
5. **Experience**: Update the timeline in `about.html`

### Add Your Photo

In `about.html`, replace the placeholder:

```html
<div class="about-image__placeholder">[Your Photo Here]</div>
```

With an actual image:

```html
<img src="your-photo.jpg" alt="Your Name" class="about-image__photo" />
```

### Customize Colors

Edit the CSS variables in `styles.css`:

```css
:root {
  --color-bg: #0a0f1a; /* Main background */
  --color-accent: #00d4aa; /* Accent color (teal) */
  --color-text: #e8eaed; /* Primary text */
  --color-text-muted: #9ca3af; /* Secondary text */
}
```

### Change Fonts

Update the Google Fonts link in each HTML file's `<head>` and the CSS variables:

```css
:root {
  --font-heading: "Cormorant Garamond", Georgia, serif;
  --font-body: "IBM Plex Sans", system-ui, sans-serif;
}
```

## 🧪 Testing

Run the test suite to validate HTML structure and check for broken links:

```bash
# Install dependencies (first time only)
npm install

# Run tests
npm test
```

Tests include:

- HTML file existence and structure validation
- Required meta tags verification
- Internal link validation
- Navigation consistency checks
- Form element validation

## 🌐 Deployment

This is a static site—deploy it anywhere that serves HTML:

### Vercel

```bash
npx vercel
```

### Netlify

Drag and drop the folder to [netlify.com/drop](https://netlify.com/drop)

### GitHub Pages

1. Push to a GitHub repository
2. Go to Settings → Pages
3. Select your branch and save

### Traditional Hosting

Upload all files via FTP to your web host's `public_html` directory.

## 📱 Responsive Design

The site is fully responsive with breakpoints at:

- **768px**: Tablet layout adjustments
- **480px**: Mobile-optimized layout

## ♿ Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Form labels and required field indicators
- Sufficient color contrast
- Keyboard-navigable interface

## 📄 License

This project is available for personal and commercial use.
