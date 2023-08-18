// @ts-ignore
import palette from "@/templates/palette.html";
import "@/styles/style.css"

const form = document.querySelector('body');

if (form) {
    const divElement = document.createElement('div');
    divElement.innerHTML = palette;
    form.insertAdjacentElement("afterend", divElement);
}
