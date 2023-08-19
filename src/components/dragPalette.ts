export function dragPalette(element: HTMLElement, dragzone: HTMLElement) {
    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;

    const dragMouseUp = () => {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    const dragMouseMove = (event: any) => {
        event.preventDefault();
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;
        element.style.top = `${element.offsetTop - pos2}px`;
        element.style.right = `${window.innerWidth - (element.offsetLeft + element.offsetWidth) + pos1}px`;
    };

    const dragMouseDown = (event: any) => {
        event.preventDefault();

        pos3 = event.clientX;
        pos4 = event.clientY;

        document.onmouseup = dragMouseUp;
        document.onmousemove = dragMouseMove;
    };
    dragzone.onmousedown = dragMouseDown;
}
