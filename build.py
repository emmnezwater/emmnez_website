#!/usr/bin/env python3
"""
Regenerates the shared header/nav/mobile-menu/footer/WhatsApp-button markup
in every page below from partials/header.html and partials/footer.html.

The site still deploys as plain static HTML - this only saves you from
hand-editing the same nav link or phone number in five files. After
changing a partial, run:

    python3 build.py

Each page's own <head> and <main> content is left untouched.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent

# path -> nav label used to mark that page's link "active" in the header
PAGES = {
    "index.html": "Home",
    "services.html": "Services",
    "projects.html": "Projects",
    "about.html": "About",
    "contact.html": "Contact",
}

HEADER_TEMPLATE = (ROOT / "partials" / "header.html").read_text()
FOOTER = (ROOT / "partials" / "footer.html").read_text().strip("\n")


def build_page(html: str, page: str, label: str) -> str:
    header = HEADER_TEMPLATE.replace(
        f'<a href="{page}">{label}</a>',
        f'<a href="{page}" class="active">{label}</a>',
    ).strip("\n")

    body_open = html.index("<body>") + len("<body>")
    main_open = html.index("<main>")
    main_close = html.index("</main>") + len("</main>")
    body_close = html.index("</body>")

    return (
        html[:body_open]
        + "\n\n" + header + "\n\n    "
        + html[main_open:main_close]
        + "\n\n" + FOOTER + "\n"
        + html[body_close:]
    )


def main():
    for page, label in PAGES.items():
        path = ROOT / page
        html = path.read_text()
        rebuilt = build_page(html, page, label)
        path.write_text(rebuilt)
        print(f"rebuilt {page}")


if __name__ == "__main__":
    main()
