# Canvas-Compiler 디자인 패턴 분석

## 프로젝트 개요
Canvas-Compiler는 Konva.js를 기반으로 한 웹 확장 프로그램 그래픽 에디터입니다. 이 프로젝트에서는 **Singleton 패턴**과 **Command 패턴**을 효과적으로 활용하여 상태 관리와 사용자 인터랙션을 처리합니다.

---

## 1. Singleton 패턴

### 1.1 개념
Singleton 패턴은 클래스의 인스턴스가 오직 하나만 생성되도록 보장하고, 전역적인 접근점을 제공하는 디자인 패턴입니다.

### 1.2 적용된 클래스

#### 1.2.1 CanvasElements (src/components/Canvas.ts)

```typescript
export class CanvasElements {
    private static instance: CanvasElements;

    private constructor() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        // ...초기화 로직
    }

    public static getInstance(): CanvasElements {
        if (!CanvasElements.instance) {
            CanvasElements.instance = new CanvasElements();
        }
        return CanvasElements.instance
    }
}
```

**사용 목적:**
- 캔버스 요소의 DOM 참조와 크기 정보를 애플리케이션 전체에서 일관되게 관리
- 캔버스 리사이징, 템플릿 주입 등의 기능을 중앙에서 관리

**사용 예시:**
```typescript
// content.ts에서 사용
export const canvas: CanvasElements = CanvasElements.getInstance();

// KonvaState.ts에서 사용
width: CanvasElements.getInstance().width * 0.8,
height: CanvasElements.getInstance().height,
```

---

#### 1.2.2 PaletteElements (src/components/Pallete.ts)

```typescript
export class PaletteElements {
    private static instance: PaletteElements;

    private constructor() {
        this.body = document.querySelector('body');
        this.palette = document.createElement('div');
        this._color = "#fffff";
        // ...초기화 로직
    }

    public static getInstance(): PaletteElements {
        if (!PaletteElements.instance) {
            PaletteElements.instance = new PaletteElements();
        }
        return PaletteElements.instance
    }
}
```

**사용 목적:**
- 팔레트 UI 요소와 현재 선택된 색상을 전역적으로 관리
- 도구 버튼(커서, 레이아웃, 텍스트, 이미지) 이벤트 핸들링 중앙화

**사용 예시:**
```typescript
// content.ts에서 사용
export const palette: PaletteElements = PaletteElements.getInstance();

// Component.ts에서 색상 가져오기
fill: PaletteElements.getInstance().color,
```

---

### 1.3 Singleton 패턴의 장점 (이 프로젝트에서)

| 장점 | 설명 |
|------|------|
| **전역 상태 관리** | 캔버스와 팔레트의 상태를 애플리케이션 전체에서 일관되게 접근 |
| **메모리 효율성** | DOM 요소 참조를 한 번만 생성하여 중복 방지 |
| **일관성 보장** | 여러 모듈에서 동일한 인스턴스를 공유하여 데이터 일관성 유지 |

---

## 2. Command 패턴

### 2.1 개념
Command 패턴은 요청을 객체로 캡슐화하여 요청의 매개변수화, 큐잉, 로깅 및 실행 취소를 가능하게 합니다.

### 2.2 구조

#### 2.2.1 Command 인터페이스 (src/global/Toolbar.ts)

```typescript
export interface Command {
    addEvent(): void;
    removeEvent(): void;
}
```

이 인터페이스는 모든 Command 클래스가 구현해야 하는 계약을 정의합니다.

---

#### 2.2.2 Invoker - Toolbar 클래스 (src/global/Toolbar.ts)

```typescript
export class Toolbar {
    private command: Command;

    constructor(command: Command) {
        this.command = command;
    }

    setCommand(command: Command) {
        this.command = command;
    }

    addEvent() {
        konvaState.transfomer.moveToTop();
        this.command.addEvent();
    }

    removeEvent() {
        this.command.removeEvent();
    }
}
```

**역할:** Command 객체를 저장하고 실행하는 Invoker 역할

---

#### 2.2.3 Concrete Commands

| Command 클래스 | Receiver 클래스 | 기능 |
|---------------|-----------------|------|
| `ComponentCommand` | `Component` | 사각형 도형 그리기 |
| `CursorCommand` | `Cursor` | 선택 및 드래그 기능 |
| `TextCommand` | `Text` | 텍스트 추가 및 편집 |
| `ImageCommand` | `Image` | 이미지 삽입 |
| `SnapCommand` | `Snap` | 스냅 가이드라인 기능 |
| `ContextCommand` | `Context` | 컨텍스트 메뉴 |

---

### 2.3 Command 패턴 구현 예시

#### ComponentCommand (src/components/command/Component.ts)

```typescript
export class ComponentCommand implements Command {
    private component: Component;

    constructor(component: Component) {
        this.component = component;
    }

    addEvent() {
        this.component.addEvent();
    }

    removeEvent() {
        this.component.removeEvent();
    }
}

export class Component {
    addEvent() {
        konvaState.stage.on("mousedown", this.mousedownHandler);
        konvaState.stage.on("mousemove", this.mousemoveHandler)
        konvaState.stage.on("mouseup", this.mouseupHandler)
    }

    removeEvent() {
        konvaState.stage.off("mousedown");
        konvaState.stage.off("mousemove");
        konvaState.stage.off("mouseup");
    }
}
```

---

### 2.4 Command 패턴 사용 흐름

```
┌─────────────────────────────────────────────────────────────┐
│                        content.ts                           │
│  toolbar.setCommand(cusorCommand);  // Command 설정         │
│  toolbar.addEvent();                // Command 실행         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Toolbar (Invoker)                        │
│  setCommand(command: Command)                               │
│  addEvent() → this.command.addEvent()                       │
│  removeEvent() → this.command.removeEvent()                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              CursorCommand (Concrete Command)               │
│  addEvent() → this.cursor.addEvent()                        │
│  removeEvent() → this.cursor.removeEvent()                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Cursor (Receiver)                        │
│  addEvent() → stage 이벤트 리스너 등록                       │
│  removeEvent() → stage 이벤트 리스너 제거                    │
└─────────────────────────────────────────────────────────────┘
```

---

### 2.5 도구 전환 예시 (Pallete.ts)

```typescript
// 커서 버튼 클릭 시
this.cursorButton?.addEventListener("click", () => {
    toolbar.removeEvent();           // 현재 Command 이벤트 제거
    toolbar.setCommand(cusorCommand); // 새 Command 설정
    toolbar.addEvent();              // 새 Command 이벤트 추가
})

// 레이아웃(도형) 버튼 클릭 시
this.layoutButton?.addEventListener("click", () => {
    toolbar.removeEvent();
    toolbar.setCommand(componentCommand);
    toolbar.addEvent();
})
```

---

### 2.6 Command 패턴의 장점 (이 프로젝트에서)

| 장점 | 설명 |
|------|------|
| **도구 전환 용이성** | 새 Command 객체를 설정하기만 하면 도구 전환이 가능 |
| **확장성** | 새 도구 추가 시 Command 인터페이스만 구현하면 됨 |
| **관심사 분리** | Toolbar(Invoker)는 구체적인 동작을 알 필요 없음 |
| **이벤트 관리** | addEvent/removeEvent로 이벤트 리스너 충돌 방지 |

---

## 3. 패턴 간의 상호작용

```
┌──────────────────────────────────────────────────────────────────┐
│                      애플리케이션 초기화                          │
│                        (content.ts)                              │
└──────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  Singleton    │    │  Singleton    │    │   일반 객체    │
│ CanvasElements│    │PaletteElements│    │   KonvaState  │
│ getInstance() │    │ getInstance() │    │               │
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │     Toolbar       │
                    │    (Invoker)      │
                    │  setCommand()     │
                    │  addEvent()       │
                    │  removeEvent()    │
                    └───────────────────┘
                              │
        ┌─────────┬─────────┬─┴─────────┬─────────┐
        ▼         ▼         ▼           ▼         ▼
    ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐
    │Cursor │ │Compo- │ │ Text  │ │ Image │ │ Snap  │
    │Command│ │nent   │ │Command│ │Command│ │Command│
    │       │ │Command│ │       │ │       │ │       │
    └───────┘ └───────┘ └───────┘ └───────┘ └───────┘
```

---

## 4. 결론

### 4.1 Singleton 패턴 요약
- **CanvasElements**: 캔버스 DOM 요소와 크기 정보의 전역 관리
- **PaletteElements**: 팔레트 UI와 색상 상태의 전역 관리
- `private constructor`와 `static getInstance()` 메서드로 구현

### 4.2 Command 패턴 요약
- **Command 인터페이스**: `addEvent()`, `removeEvent()` 메서드 정의
- **Toolbar (Invoker)**: Command 실행 및 전환 담당
- **6개의 Concrete Command**: 각각의 도구 기능 캡슐화
- 도구 전환 시 이벤트 충돌 없이 깔끔하게 처리

### 4.3 설계 효과
1. **유지보수성**: 각 도구의 로직이 독립적으로 관리됨
2. **확장성**: 새 도구 추가가 기존 코드 수정 없이 가능
3. **일관성**: Singleton으로 전역 상태의 일관성 보장
4. **모듈성**: Command 패턴으로 도구 간 결합도 감소
