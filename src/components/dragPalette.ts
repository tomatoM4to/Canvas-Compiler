export function dragPalette(element: HTMLElement, dragzone: HTMLElement) {
    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;

    function dragMouseUp() {
        document.removeEventListener("mouseup", dragMouseUp);
        document.removeEventListener("mousemove", dragMouseMove);

        element.classList.remove("cc-palette-container-moving")
    }

    function dragMouseMove(event: any) {
        event.preventDefault();
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;
        element.style.top = `${element.offsetTop - pos2}px`;
        element.style.right = `${window.innerWidth - (element.offsetLeft + element.offsetWidth) + pos1}px`;
    }

    function dragMouseDown(event: any) {
        event.preventDefault();

        pos3 = event.clientX;
        pos4 = event.clientY;

        element.classList.add("cc-palette-container-moving")
        document.addEventListener("mouseup", dragMouseUp);
        document.addEventListener("mousemove", dragMouseMove);
    }

    dragzone.addEventListener("mousedown", dragMouseDown);
}
