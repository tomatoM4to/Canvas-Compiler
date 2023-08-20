export function dragPalette(element: HTMLElement, dragzone: HTMLElement) {
    let beforeX = 0;
    let beforeY = 0;
    let dx = 0;
    let dy = 0;
    let ny = 0;
    let nx = 0;

    function dragMouseUp() {
        document.removeEventListener("mouseup", dragMouseUp);
        document.removeEventListener("mousemove", dragMouseMove);

        element.classList.remove("cc-palette-container-moving")
    }

    function dragMouseMove(event: any) {
        event.preventDefault();
        dx = beforeX - event.clientX;
        dy = beforeY - event.clientY;
        beforeX = event.clientX;
        beforeY = event.clientY;

        ny = element.offsetTop - dy < 0 ? 0 : element.offsetTop - dy;
        ny = window.innerHeight - element.offsetHeight < ny ? window.innerHeight - element.offsetHeight : ny;

        nx = window.innerWidth - (element.offsetLeft + element.offsetWidth) + dx < 0 ? 0 : window.innerWidth - (element.offsetLeft + element.offsetWidth) + dx;
        nx = element.offsetLeft < 0 ? window.innerWidth - element.offsetWidth : nx;

        element.style.top = `${ny}px`;
        element.style.right = `${nx}px`;
    }

    function dragMouseDown(event: any) {
        event.preventDefault();

        beforeX = event.clientX;
        beforeY = event.clientY;

        element.classList.add("cc-palette-container-moving")
        document.addEventListener("mouseup", dragMouseUp);
        document.addEventListener("mousemove", dragMouseMove);
    }

    dragzone.addEventListener("mousedown", dragMouseDown);
}
