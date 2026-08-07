export function enableImageProtection() {

    document.addEventListener("dragstart", (event) => {

        if (event.target instanceof HTMLImageElement) {

            event.preventDefault();

        }

    });

}
