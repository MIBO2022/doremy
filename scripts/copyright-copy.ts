export function enableCopyrightCopy() {

    document.addEventListener("copy", (event: ClipboardEvent) => {

        const selection = window.getSelection()?.toString() ?? "";

        if (!selection) return;

        // 超過 30 個字
        if (selection.trim().length > 30) {

            event.preventDefault();

            // 覆蓋所有常見格式
            event.clipboardData?.setData(
                "text/plain",
                "請分享文章網址閱讀完整內容：https://rose-lab.com"
            );

            event.clipboardData?.setData(
                "text/html",
                "請分享文章網址閱讀完整內容：https://rose-lab.com"
            );

            alert("為尊重原創內容，不允許複製超過 30 個字。");

        }

    });

}
