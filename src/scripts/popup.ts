import {HelloExtensions} from '@/components/hello';
import "@/styles/style.css";


const element = document.querySelector("#hello");

if (element !== null) {
    element.innerHTML = HelloExtensions();
}
