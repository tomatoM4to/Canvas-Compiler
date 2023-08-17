// @ts-ignore
import palette from "@/templates/palette.html";

const form = document.querySelector('form');

if (form) {
    const divElement = document.createElement('div');
    divElement.innerHTML = palette;
    form.insertAdjacentElement("afterend", divElement);
}
