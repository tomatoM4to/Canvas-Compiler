export default function chatGPT(prompt: string) {
    let konvaData = JSON.parse(prompt);
    let newPrompt = "넌 지금 내가 주는 데이터를 가지고 코드를 작성하는 역할을 맡았어 만약 명령하는 정보의 값이 undefined일시 디폴트 옵션으로 코드를 작성해 \n";
    console.log(prompt);
    if (konvaData.attrs && konvaData.attrs.id) {
        newPrompt += konvaData.attrs.id;
    }

    if (!konvaData.children || !(konvaData.children.length > 0)) return;

    let idx = 1
    konvaData.children.forEach((child: any) => {
        if (child.children && child.children.length > 0) {
            child.children.forEach((node: any) => {
                if (node.attrs.name === 'rect') {
                    if (node.className === 'Rect') {
                        newPrompt += `${idx++}번째 컴포넌트는 
                        ${Math.round(node.attrs.x) || 0}, ${Math.round(node.attrs.y) || 0} 에서 시작하고 width는 ${Math.round(node.attrs.width) || 0}, height는 ${Math.round(node.attrs.height) || 0}야, 
                        배경색은 ${node.attrs.fill || "undefined"}야, radius 속성은 top-left: ${node.attrs.cornerRadius ? node.attrs.cornerRadius[0] : 0}, top-right: ${node.attrs.cornerRadius ? node.attrs.cornerRadius[1] : 0}, bottom-right: ${node.attrs.cornerRadius ? node.attrs.cornerRadius[2] : 0}, bottom-left: ${node.attrs.cornerRadius ? node.attrs.cornerRadius[3] : 0} 야,
                        border의 두께는 ${node.attrs.strokeWidth || "undefined"}고 색상은 ${node.attrs.stroke || "undefined"} 야
                        컴포넌트 의 추가적인 효과는 ${node.attrs.id || "undefined"} 입니다.\n`;
                    }

                    if (node.className === 'Text') {
                        newPrompt += `${idx++} 해당 컴포넌트는 "${node.attrs.text || "undefined"}" 라는 Text 컴포넌트야
                        해당 Text의 위치는 ${Math.round(node.attrs.x) || 0}, ${Math.round(node.attrs.y) || 0} 에서 시작해
                        텍스트의 색상은 ${node.attrs.fill || "undefined"}야
                        텍스트의 style는 ${node.attrs.fontStyle || "기본 스타일"}야
                        컴포넌트 의 추가적인 효과는 ${node.attrs.id || "undefined"} 입니다.\n`
                    }

                    if (node.className === "Image") {
                        newPrompt += `${idx++}번째 컴포넌트는 
                        ${Math.round(node.attrs.x) || 0}, ${Math.round(node.attrs.y) || 0} 에서 시작하고 width는 ${Math.round(node.attrs.width) || 0}, height는 ${Math.round(node.attrs.height) || 0}야, 
                        배경색은 ${node.attrs.fill || "undefined"}야, radius 속성은 top-left: ${node.attrs.cornerRadius ? node.attrs.cornerRadius[0] : 0}, top-right: ${node.attrs.cornerRadius ? node.attrs.cornerRadius[1] : 0}, bottom-right: ${node.attrs.cornerRadius ? node.attrs.cornerRadius[2] : 0}, bottom-left: ${node.attrs.cornerRadius ? node.attrs.cornerRadius[3] : 0} 야,
                        border의 두께는 ${node.attrs.strokeWidth || "undefined"}고 색상은 ${node.attrs.stroke || "undefined"} 야
                        컴포넌트 의 추가적인 효과는 ${node.attrs.id || "undefined"} 입니다.\n`;
                    }
                }
            });
        }
    });

    let textArea: HTMLTextAreaElement | null = document.querySelector("#prompt-textarea");
    if (textArea) {
        textArea.value = newPrompt;
    }
}

