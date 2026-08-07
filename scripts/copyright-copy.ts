export function enableCopyrightCopy() {

    document.addEventListener("copy", (event: ClipboardEvent) => {

        const selection = window.getSelection()?.toString().trim();

        if (!selection) return;

        // 10 字以內正常複製
        if (selection.length <= 10) return;

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
            selection.slice(0, 10) + copyright
        );

        alert("為尊重原創內容，長篇內容無法直接複製。");

    });

}
