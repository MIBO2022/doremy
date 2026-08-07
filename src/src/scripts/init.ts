import { enableCopyrightCopy } from "./copyright-copy";
import { enableImageProtection } from "./image-protection";

console.log("init.ts loaded");

enableImageProtection();

if (window.location.pathname.startsWith("/blog/")) {

    console.log("blog page");

    enableCopyrightCopy();

}
