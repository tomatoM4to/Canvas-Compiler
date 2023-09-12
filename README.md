# Canvas Compiler
그래픽 데이터를 LLM이 이해할 수 있는 자연어로 변환하는 크롬 확장 프로그램입니다.

***
### 💻프로젝트 소개
Canvas Compiler는 Konva.js를 기반으로 한 그래픽 에디터를 통해 Chat GPT, Bard와 같은 LLM에게 그래픽 명령어를 전달할 수 있는 도구입니다.

***
### 🏁프로젝트 실행

1. 저장소를 클론합니다:  `git clone https://github.com/tomatoM4to/Canvas-Compiler.git`
   
2. 빌드를 실행합니다:  `npm run build`
   
3. 크롬에서 확장 프로그램 페이지를 열고 개발자 모드를 활성화합니다.

4. 빌드된 파일을 크롬 확장에 로드합니다.

***
### 🌠개발배경 및 목적
Chat GPT와 같은 LLM을 사용하면서 텍스트를 통해 명령을 주는 방식이 추상적이라는 느낌을 받았습니다. Chat GPT의 높은 능력을 생각하면, 그래픽을 통한 데이터 시각화가 더 직관적이고 효율적일 것이라고 판단하였습니다. 이러한 생각에 기반하여, 그래픽 데이터를 자연어로 변환하여 LLM에게 명령을 전달하는 프로젝트를 개발하게 되었습니다.


***
### 🪧 개발 환경 및 개발 언어
- **개발 언어:** TypeScript (^5.1.6)
- **패키지 관리:** NPM
- **번들러:** Web Pack (^5.88.2) with Webpack CLI (^5.1.4)
- **플랫폼 API:** Chrome API (@types/chrome ^0.0.243)
- **프론트엔드:** HTML (html-loader ^4.2.0), CSS (css-loader ^6.8.1, style-loader ^3.3.3) 
- **그래픽 라이브러리:** Konva (^9.2.0)
- **TypeScript 로더:** ts-loader (^9.4.4)
- **플러그인 및 기타 의존성:**
  - copy-webpack-plugin (^11.0.0)
  - html-webpack-plugin (^5.5.3)



***
### 🛖시스템 구성 및 아키텍처

![diagram](https://github.com/tomatoM4to/Canvas-Compiler/assets/106623315/707f19be-4779-4695-b5ca-feb9ab69a59d)


***
### 🚀기대효과 및 활용 분야
이 프로젝트를 통해 LLM에게 더 직관적이고 효율적으로 명령을 전달하는 방법을 탐색합니다.
복잡한 텍스트 명령의 필요 없이 LLM을 사용할 수 있게 되어, 코드 작성 경험이 부족한 사람들도 LLM을 더 손쉽게 활용할 수 있을 것입니다.


***
### ✨프로젝트의 주요 기능

#### Graphic Editor
- [x] **Object 수정:** 그래픽 오브젝트의 속성 및 위치를 편집: [가이드](https://github.com/tomatoM4to/Canvas-Compiler/wiki/Grapic-Editor#object-%EC%88%98%EC%A0%95)
- [x] **다중 셀렉팅:** 여러 그래픽 오브젝트를 동시에 선택: [가이드](https://github.com/tomatoM4to/Canvas-Compiler/wiki/Grapic-Editor#%EB%8B%A4%EC%A4%91-%EC%85%80%EB%A0%89%ED%8C%85-%EA%B8%B0%EB%8A%A5)
- [x] **단일 셀렉팅:** 특정 그래픽 오브젝트를 단독으로 선택: [가이드](https://github.com/tomatoM4to/Canvas-Compiler/wiki/Grapic-Editor#%EB%8B%A8%EC%9D%BC-%EC%85%80%EB%A0%89%ED%8C%85-%EA%B8%B0%EB%8A%A5)
- [x] **삭제:** 선택한 그래픽 오브젝트(들)을 삭제: [가이드](https://github.com/tomatoM4to/Canvas-Compiler/wiki/Grapic-Editor#%EC%82%AD%EC%A0%9C)
- [x] **프롬프팅:** 선택한 오브젝트에 대한 상세한 명령어 부여
- [x] **단일 drag & drop snap:** 오브젝트를 드래그 앤 드롭할 때 주변 오브젝트 위치에 맞춰 자동으로 정렬: [OpenAI]([https://www.openai.com/](https://github.com/tomatoM4to/Canvas-Compiler/wiki/Grapic-Editor#%EC%8A%A4%EB%83%85-%EA%B8%B0%EB%8A%A5))
- [ ] **다중 drag & drop snap:** 여러 오브젝트를 동시에 드래그 앤 드롭할 때 주변 오브젝트 위치에 맞춰 자동으로 정렬
- [x] **resize:** 선택한 오브젝트의 크기 조정
- [ ] **resize snap:** 다른 오브젝트에 맞추어 크기 조정

#### Compiler
- [x] **JSON 데이터를 자연어로 생성:** 그래픽 데이터를 JSON 형식에서 자연어 형식으로 변환: [가이드](https://github.com/tomatoM4to/Canvas-Compiler/wiki/Compiler#json-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%9E%90%EC%97%B0%EC%96%B4-%EC%83%9D%EC%84%B1)
- [ ] **다국어 지원:** 다양한 언어로 자연어 변환 지원

#### 기타
- [x] **Dynamic Content:** 그래픽 에디터의 동적 데이터 삽입: [가이드](https://github.com/tomatoM4to/Canvas-Compiler/wiki/%EA%B8%B0%ED%83%80#%EB%8F%99%EC%A0%81-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%82%BD%EC%9E%85)
- [ ] **이전 그림 기록 세이브:** 그래픽 에디터의 작업 내역 및 이전 상태 저장
