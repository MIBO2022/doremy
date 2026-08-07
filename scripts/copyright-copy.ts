export function enableCopyrightCopy() {

    document.addEventListener("copy", (event: ClipboardEvent) => {

        const selection = window.getSelection()?.toString().trim() ?? "";

        if (!selection) return;

        // 30 個字以內正常複製
        if (selection.length <= 30) return;

        event.preventDefault();

        const message = `

為尊重原創內容，長篇內容請直接閱讀原文：

${window.location.href}

© ${new Date().getFullYear()} Rose Lab
https://rose-lab.com
`;

        // 純文字
        event.clipboardData?.setData(
            "text/plain",
            message
        );

        // HTML
        event.clipboardData?.setData(
            "text/html",
            `<p>為尊重原創內容，長篇內容請直接閱讀原文：</p>
             <p><a href="${window.location.href}">${window.location.href}</a></p>
             <p>© ${new Date().getFullYear()} Rose Lab</p>`
        );

        alert("為尊重原創內容，超過 30 個字請直接分享文章連結。");

    });

}
