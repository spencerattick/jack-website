/**
 * Test Suite for TechForward Consulting Website
 *
 * Validates HTML structure, links, and required elements
 * Run with: npm test
 */

const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

// Test configuration
const ROOT_DIR = path.join(__dirname, "..");
const HTML_FILES = ["index.html", "about.html", "contact.html"];
const REQUIRED_META_TAGS = ["charset", "viewport"];
const NAV_LINKS = ["index.html", "about.html", "contact.html"];

// Test results tracking
let passed = 0;
let failed = 0;
const errors = [];

// Helper functions
function test(name, condition, errorMsg = "") {
  if (condition) {
    console.log(`  ✓ ${name}`);
    passed++;
  } else {
    console.log(`  ✗ ${name}`);
    if (errorMsg) console.log(`    → ${errorMsg}`);
    failed++;
    errors.push({ test: name, error: errorMsg });
  }
}

function loadHTML(filename) {
  const filepath = path.join(ROOT_DIR, filename);
  if (!fs.existsSync(filepath)) {
    return null;
  }
  const content = fs.readFileSync(filepath, "utf-8");
  return cheerio.load(content);
}

// Test suites
function testFileExistence() {
  console.log("\n📁 File Existence Tests");

  HTML_FILES.forEach((file) => {
    const filepath = path.join(ROOT_DIR, file);
    test(
      `${file} exists`,
      fs.existsSync(filepath),
      `File not found: ${filepath}`
    );
  });

  const cssPath = path.join(ROOT_DIR, "styles.css");
  test("styles.css exists", fs.existsSync(cssPath), "Stylesheet not found");
}

function testHTMLStructure() {
  console.log("\n🏗️  HTML Structure Tests");

  HTML_FILES.forEach((file) => {
    const $ = loadHTML(file);
    if (!$) return;

    console.log(`\n  [${file}]`);

    // DOCTYPE
    const html = fs.readFileSync(path.join(ROOT_DIR, file), "utf-8");
    test("Has DOCTYPE", html.toLowerCase().includes("<!doctype html>"));

    // HTML lang attribute
    test("HTML has lang attribute", $("html").attr("lang") !== undefined);

    // Head elements
    test("Has <head> element", $("head").length > 0);
    test(
      "Has <title> element",
      $("title").length > 0 && $("title").text().length > 0
    );

    // Meta tags
    REQUIRED_META_TAGS.forEach((meta) => {
      if (meta === "charset") {
        test(`Has charset meta`, $("meta[charset]").length > 0);
      } else if (meta === "viewport") {
        test(`Has viewport meta`, $('meta[name="viewport"]').length > 0);
      }
    });

    // Body
    test("Has <body> element", $("body").length > 0);

    // Stylesheet link
    test("Links to styles.css", $('link[href="styles.css"]').length > 0);
  });
}

function testNavigation() {
  console.log("\n🧭 Navigation Tests");

  HTML_FILES.forEach((file) => {
    const $ = loadHTML(file);
    if (!$) return;

    console.log(`\n  [${file}]`);

    // Navigation exists
    test("Has <nav> element", $("nav").length > 0);

    // All nav links present
    NAV_LINKS.forEach((link) => {
      const hasLink = $(`nav a[href="${link}"]`).length > 0;
      test(`Nav includes link to ${link}`, hasLink);
    });

    // Active state on current page
    const expectedActive = file;
    const activeLink = $("nav .nav__link.active").attr("href");
    test(
      "Current page has active nav state",
      activeLink === expectedActive,
      `Expected ${expectedActive}, got ${activeLink}`
    );
  });
}

function testInternalLinks() {
  console.log("\n🔗 Internal Link Tests");

  HTML_FILES.forEach((file) => {
    const $ = loadHTML(file);
    if (!$) return;

    console.log(`\n  [${file}]`);

    // Get all internal links (not starting with http/https/#)
    const links = [];
    $("a[href]").each((_, el) => {
      const href = $(el).attr("href");
      if (
        href &&
        !href.startsWith("http") &&
        !href.startsWith("#") &&
        !href.startsWith("mailto:")
      ) {
        links.push(href);
      }
    });

    // Check each internal link exists
    const uniqueLinks = [...new Set(links)];
    uniqueLinks.forEach((link) => {
      const linkPath = path.join(ROOT_DIR, link);
      test(`Link "${link}" target exists`, fs.existsSync(linkPath));
    });
  });
}

function testSemanticStructure() {
  console.log("\n📐 Semantic Structure Tests");

  HTML_FILES.forEach((file) => {
    const $ = loadHTML(file);
    if (!$) return;

    console.log(`\n  [${file}]`);

    // Has main heading
    test("Has <h1> element", $("h1").length > 0);

    // Has footer
    test("Has <footer> element", $("footer").length > 0);

    // Has sections
    test("Has <section> elements", $("section").length > 0);
  });
}

function testContactForm() {
  console.log("\n📝 Contact Form Tests");

  const $ = loadHTML("contact.html");
  if (!$) {
    test("contact.html loaded", false, "Could not load contact.html");
    return;
  }

  // Form exists
  test("Has <form> element", $("form").length > 0);

  // Required form fields
  const requiredFields = [
    { selector: 'input[name="name"]', name: "Name field" },
    { selector: 'input[name="email"]', name: "Email field" },
    { selector: 'input[name="subject"]', name: "Subject field" },
    { selector: 'textarea[name="message"]', name: "Message field" },
  ];

  requiredFields.forEach(({ selector, name }) => {
    test(`Has ${name}`, $(selector).length > 0);
  });

  // Email field has correct type
  test(
    'Email field has type="email"',
    $('input[name="email"][type="email"]').length > 0
  );

  // Has submit button
  test("Has submit button", $('button[type="submit"]').length > 0);

  // Labels for form fields
  test("Form fields have labels", $("form label").length >= 4);
}

function testAccessibility() {
  console.log("\n♿ Accessibility Tests");

  HTML_FILES.forEach((file) => {
    const $ = loadHTML(file);
    if (!$) return;

    console.log(`\n  [${file}]`);

    // Images have alt attributes
    let imagesWithoutAlt = 0;
    $("img").each((_, el) => {
      if (!$(el).attr("alt")) imagesWithoutAlt++;
    });
    test(
      "All images have alt attributes",
      imagesWithoutAlt === 0,
      `${imagesWithoutAlt} images missing alt`
    );

    // Form inputs have labels or aria-labels
    if (file === "contact.html") {
      let inputsWithoutLabels = 0;
      $("input, textarea").each((_, el) => {
        const id = $(el).attr("id");
        const hasLabel = id && $(`label[for="${id}"]`).length > 0;
        const hasAriaLabel = $(el).attr("aria-label");
        if (!hasLabel && !hasAriaLabel) inputsWithoutLabels++;
      });
      test(
        "Form inputs have associated labels",
        inputsWithoutLabels === 0,
        `${inputsWithoutLabels} inputs missing labels`
      );
    }
  });
}

function testCSS() {
  console.log("\n🎨 CSS Tests");

  const cssPath = path.join(ROOT_DIR, "styles.css");
  if (!fs.existsSync(cssPath)) {
    test("styles.css exists", false);
    return;
  }

  const css = fs.readFileSync(cssPath, "utf-8");

  // Has CSS variables
  test(
    "Uses CSS custom properties",
    css.includes(":root") && css.includes("--")
  );

  // Has responsive styles
  test("Has media queries for responsiveness", css.includes("@media"));

  // Has animations
  test("Has CSS animations", css.includes("@keyframes"));
}

// Run all tests
function runTests() {
  console.log("═".repeat(50));
  console.log("  TechForward Consulting - Test Suite");
  console.log("═".repeat(50));

  testFileExistence();
  testHTMLStructure();
  testNavigation();
  testInternalLinks();
  testSemanticStructure();
  testContactForm();
  testAccessibility();
  testCSS();

  // Summary
  console.log("\n" + "═".repeat(50));
  console.log(`  Results: ${passed} passed, ${failed} failed`);
  console.log("═".repeat(50));

  if (failed > 0) {
    console.log("\n❌ Some tests failed:\n");
    errors.forEach(({ test, error }) => {
      console.log(`  • ${test}`);
      if (error) console.log(`    ${error}`);
    });
    process.exit(1);
  } else {
    console.log("\n✅ All tests passed!\n");
    process.exit(0);
  }
}

// Execute
runTests();
