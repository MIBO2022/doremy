export function enableCopyrightCopy() {

    document.addEventListener("copy", (event: ClipboardEvent) => {

        const selection = window.getSelection()?.toString();

        if (!selection) return;

        // 太短就不要附版權
        if (selection.trim().length < 30) return;

        const copyright = `

────────────────────────
本文來源：Rose Lab
${window.location.href}

© ${new Date().getFullYear()} Rose Lab
https://rose-lab.com
────────────────────────`;

        event.preventDefault();

        event.clipboardData?.setData(
            "text/plain",
            selection + copyright
        );

    });

}
