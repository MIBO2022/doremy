declare global {
    interface Window {
        __roseGalleryLightboxInitialized?: boolean;
    }
}

let previousFocus: HTMLElement | null = null;

function prepareGalleryImages() {
    document
        .querySelectorAll<HTMLImageElement>(".img-gallery img")
        .forEach((image) => {
            image.tabIndex = 0;
            image.setAttribute("role", "button");

            const caption = image
                .closest("figure")
                ?.querySelector("figcaption")
                ?.textContent
                ?.trim();

            const name =
                image.alt.trim() ||
                caption ||
                "圖片";

            image.setAttribute(
                "aria-label",
                `放大查看：${name}`
            );
        });
}

function getLightbox() {
    let lightbox =
        document.querySelector<HTMLElement>("#gallery-lightbox");

    if (lightbox) return lightbox;

    lightbox = document.createElement("div");
    lightbox.id = "gallery-lightbox";
    lightbox.className = "gallery-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.setAttribute("aria-label", "圖片放大預覽");

    lightbox.innerHTML = `
        <button
            class="gallery-lightbox__close"
            type="button"
            aria-label="關閉圖片預覽"
        >
            ×
        </button>

        <div class="gallery-lightbox__content">
            <img
                class="gallery-lightbox__image"
                src=""
                alt=""
            >
            <p class="gallery-lightbox__caption"></p>
        </div>
    `;

    document.body.appendChild(lightbox);

    return lightbox;
}

function openLightbox(image: HTMLImageElement) {
    const lightbox = getLightbox();

    const enlargedImage =
        lightbox.querySelector<HTMLImageElement>(
            ".gallery-lightbox__image"
        );

    const caption =
        lightbox.querySelector<HTMLElement>(
            ".gallery-lightbox__caption"
        );

    if (!enlargedImage || !caption) return;

    previousFocus =
        document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;

    const figureCaption = image
        .closest("figure")
        ?.querySelector("figcaption")
        ?.textContent
        ?.trim();

    enlargedImage.src =
        image.dataset.fullSrc ||
        image.currentSrc ||
        image.src;

    enlargedImage.alt = image.alt || "";

    caption.textContent =
        figureCaption ||
        image.alt ||
        "";

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("gallery-lightbox-open");

    lightbox
        .querySelector<HTMLButtonElement>(
            ".gallery-lightbox__close"
        )
        ?.focus();
}

function closeLightbox() {
    const lightbox =
        document.querySelector<HTMLElement>("#gallery-lightbox");

    if (!lightbox) return;

    const image =
        lightbox.querySelector<HTMLImageElement>(
            ".gallery-lightbox__image"
        );

    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("gallery-lightbox-open");

    if (image) {
        image.src = "";
    }

    previousFocus?.focus();
    previousFocus = null;
}

export function enableImageGalleryLightbox() {
    prepareGalleryImages();

    if (window.__roseGalleryLightboxInitialized) return;

    window.__roseGalleryLightboxInitialized = true;

    document.addEventListener("click", (event) => {
        const target = event.target;

        if (!(target instanceof Element)) return;

        const galleryImage =
            target.closest<HTMLImageElement>(
                ".img-gallery img"
            );

        if (galleryImage) {
            event.preventDefault();
            openLightbox(galleryImage);
            return;
        }

        if (
            target.closest(".gallery-lightbox__close") ||
            target.matches(".gallery-lightbox")
        ) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        const target = event.target;

        if (
            target instanceof HTMLImageElement &&
            target.matches(".img-gallery img") &&
            (event.key === "Enter" || event.key === " ")
        ) {
            event.preventDefault();
            openLightbox(target);
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }
    });
}

function initializeGallery() {
    enableImageGalleryLightbox();
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initializeGallery,
        { once: true }
    );
} else {
    initializeGallery();
}

/* 如果網站使用Astro頁面轉場，換頁後重新辨識圖片 */
document.addEventListener(
    "astro:page-load",
    initializeGallery
);
