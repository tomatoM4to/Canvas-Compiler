import {HelloExtensions} from '@/components/hello';

const element = document.querySelector("#hello");

if (element !== null) {
    element.innerHTML = HelloExtensions();
}
