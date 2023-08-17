const form = document.querySelector('form');

if (form) {
    const btn = document.createElement("button");
    btn.innerHTML = "test";
    btn.addEventListener("click", () => alert("success"))
    form.insertAdjacentElement("afterend", btn);
}
