import { enableCopyrightCopy } from "./copyright-copy";
import { enableImageProtection } from "./image-protection";
import { enableImageGalleryLightbox } from "./image-gallery-lightbox";

document.addEventListener("astro:page-load", () => {
    enableImageProtection();
    enableImageGalleryLightbox();

    if (window.location.pathname.startsWith("/blog/")) {
        enableCopyrightCopy();
    }
});
