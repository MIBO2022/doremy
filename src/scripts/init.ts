import { enableCopyrightCopy } from "./copyright-copy";
import { enableImageProtection } from "./image-protection";
import { enableImageGalleryLightbox } from "./image-gallery-lightbox";
import './platform-comparison-filter';

document.addEventListener("astro:page-load", () => {
    enableImageProtection();
    enableImageGalleryLightbox();

    if (window.location.pathname.startsWith("/blog/")) {
        enableCopyrightCopy();
    }
});
