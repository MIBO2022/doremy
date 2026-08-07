import { enableCopyrightCopy } from "./copyright-copy";
import { enableImageProtection } from "./image-protection";

document.addEventListener("astro:page-load", () => {

    enableImageProtection();

    if (window.location.pathname.startsWith("/blog/")) {
        enableCopyrightCopy();
    }

});
