import { enableCopyrightCopy } from "./copyright-copy";
import { enableImageProtection } from "./image-protection";

export function initializeSite() {

    enableImageProtection();

    if (window.location.pathname.startsWith("/blog/")) {

        enableCopyrightCopy();

    }

}
