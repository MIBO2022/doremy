export function enableCopyrightCopy() {

    console.log("✅ enableCopyrightCopy 已載入");

    document.addEventListener("copy", (event: ClipboardEvent) => {

        console.log("✅ copy 事件觸發");

        const selection = window.getSelection()?.toString().trim();

        if (!selection) return;

        console.log("選取長度：", selection.length);

        if (selection.length <= 10) return;

        event.preventDefault();

        event.clipboardData?.setData(
            "text/plain",
            selection.slice(0, 10)
        );

        alert("測試成功");

    });

}
