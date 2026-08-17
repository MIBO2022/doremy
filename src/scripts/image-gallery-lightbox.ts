export function enableImageGalleryLightbox() {
    const galleryImages = document.querySelectorAll<HTMLImageElement>(
        ".img-gallery img"
    );

    if (!galleryImages.length) return;

    const lightbox = document.createElement("div");

    lightbox.className = "gallery-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "圖片放大預覽");
    lightbox.setAttribute("aria-hidden", "true");

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

    const enlargedImage =
        lightbox.querySelector<HTMLImageElement>(".gallery-lightbox__image");

    const caption =
        lightbox.querySelector<HTMLElement>(".gallery-lightbox__caption");

    const closeButton =
        lightbox.querySelector<HTMLButtonElement>(".gallery-lightbox__close");

    if (!enlargedImage || !caption || !closeButton) return;

    let previouslyFocusedElement: HTMLElement | null = null;

    function openLightbox(image: HTMLImageElement) {
        previouslyFocusedElement =
            document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null;

        const figure = image.closest("figure");
        const figcaption = figure?.querySelector("figcaption");

        enlargedImage.src =
            image.currentSrc ||
            image.getAttribute("src") ||
            "";

        enlargedImage.alt =
            image.getAttribute("alt") ||
            "";

        caption.textContent =
            figcaption?.textContent?.trim() ||
            image.getAttribute("alt") ||
            "";

        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.classList.add("gallery-lightbox-open");

        closeButton.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.classList.remove("gallery-lightbox-open");

        enlargedImage.src = "";
        caption.textContent = "";

        previouslyFocusedElement?.focus();
    }

    galleryImages.forEach((image) => {
        image.tabIndex = 0;
        image.setAttribute("role", "button");

        const accessibleName =
            image.getAttribute("alt")?.trim() ||
            image.closest("figure")
                ?.querySelector("figcaption")
                ?.textContent
                ?.trim() ||
            "圖片";

        image.setAttribute(
            "aria-label",
            `放大查看：${accessibleName}`
        );

        image.addEventListener("click", () => {
            openLightbox(image);
        });

        image.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLightbox(image);
            }
        });
    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            lightbox.classList.contains("is-open")
        ) {
            closeLightbox();
        }
    });
}
