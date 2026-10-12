# 🚀 Modern Developer Portfolio Website

A clean, minimalist developer portfolio website inspired by modern engineering portfolios (e.g. `abusaid.netlify.app`), built with pure semantic HTML5, custom CSS3, and vanilla JavaScript. Ready for instant deployment to **GitHub Pages**.

---

## ✨ Features & Highlights

- **🎨 Violet Accent Theme**: Engineered with deep violet accents (`#7C3AED` / `#6D28D9`), pure white background, light gray card containers, and dark charcoal text for optimal readability.
- **🌓 Interactive Dark Mode Toggle**: Instant switch to a violet-and-dark-slate theme with state persistence in `localStorage` and OS system preference fallback (`prefers-color-scheme`).
- **💻 Hero Section with Code Window**: Interactive developer configuration terminal card featuring syntax-highlighted code and macOS window accents.
- **🏷️ Programming Languages Showcase**: Clean badge grid featuring **C#**, **C++**, **Java**, **JavaScript**, **HTML**, **CSS**, **MySQL**, and **Python**.
- **🛠️ Primary IDE Spotlight**: Dedicated card highlighting **Visual Studio Code** and its embedded / multi-language workflows.
- **🤖 Interactive AI Developer Tools**: Interactive branded cards for **ChatGPT**, **Gemini**, **GitHub Copilot**, and **Claude AI** with responsive hover tooltips revealing full tool descriptions.
- **📦 Projects Showcase & Categorized Filters**:
  - **MediBox**: Smart Medication Reminder System (*ESP32, C++, MySQL, Sensor Integration*)
  - **Smart Food Scale**: Precision Kitchen Scale (*ESP32, Sensor Integration, MySQL, HX711*)
  - Placeholder cards for ongoing / upcoming projects.
- **📬 Contact Section**: Interactive contact form with validation, email copy-to-clipboard button, and social media handles (GitHub, LinkedIn).
- **📱 Fully Responsive**: Mobile-first architecture with mobile hamburger drawer and smooth transitions.

---

## 📂 File Structure

```text
developer-portfolio/
│
├── index.html        # Semantic HTML5 structure & content
├── style.css         # CSS design tokens, responsive layout & dark mode
├── script.js         # Vanilla JS (theme persistence, tooltips, filters, forms)
└── README.md         # Deployment & customization guide
```

---

## 🌐 Deploy to GitHub Pages (Step-by-Step)

### Option 1: Using GitHub Web UI (Easiest)

1. Create a new repository on [GitHub](https://github.com/new), named e.g. `portfolio` or `<your-username>.github.io`.
2. Upload the 3 project files (`index.html`, `style.css`, `script.js`) to the root of the repository.
3. Navigate to **Settings** > **Pages** (under "Code and automation").
4. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (or `master`), Folder: `/(root)`
5. Click **Save**. Your website will be live in 1–2 minutes at:
   ```text
   https://<your-username>.github.io/<repository-name>/
   ```

### Option 2: Using Git CLI

```bash
# Navigate to the project directory
cd "C:\Users\Admin\.gemini\antigravity\scratch\developer-portfolio"

# Initialize Git and commit files
git init
git add .
git commit -m "Initial portfolio commit"

# Link to your remote GitHub repository
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

Then enable GitHub Pages from repository settings.

---

## ⚙️ Customization Guide

1. **Personal Information**:
   - Update your name, title, and bio in `index.html` (inside `<section class="hero-section">` and the terminal code block).
2. **Email & Social Links**:
   - Change `developer.contact@domain.com` in `index.html` to your actual email address.
   - Replace `https://github.com` and `https://linkedin.com` with your actual profile URLs.
3. **Projects**:
   - Replace the repository links (`href="#contact"`) on MediBox and Smart Food Scale with your GitHub repository URLs.
   - Customize or add more project cards inside `<div class="projects-grid">`.
