import { atom } from "recoil";
import { SideMenu } from "sideMenuType";

export const sideMenuData = atom<SideMenu[]>({
  key: "sideMenuData",
  default: [
    {
      name: "string",
      description:
        "자바스크립트에서 문자열에 적용되는 내장 함수들을 사용할 수 있습니다.",
      side_submenu: [
        {
          name: "common",
          description: "문자열의 기본 사용법을 안내합니다.",
          docs: [
            {
              id: 1,
              title: "문자열 합치기",
              description: "더하기 연산자로 문자열을 연결합니다.",
              favorites_title: "문자열 합치기(+ 연산자)",
              func_data: (data: any) => {
                let str1 = " Let's study javascript.";
                return data + str1;
              },
              code_example: `let str1 = " Let's study javascript.";

  // 더하기 연산자 사용
  return data + str1;`,
            },
            {
              id: 2,
              favorites_title: "문자열 합치기(템플릿 리터럴)",
              description: "템플릿 리터럴 방식으로 문자열을 연결합니다.",
              func_data: (data: any) => {
                return `${data} Let's study javascript.`;
              },
              code_example: `// 템플릿 리터럴 사용
  return \`\${data} Let's study javascript.\`;`,
            },
            {
              id: 3,
              favorites_title: "문자열 합치기(concat)",
              description: "concat 함수를 사용하여 문자열을 연결합니다.",
              func_data: (data: any) => {
                let str1 = " Let's study javascript.";
                return data.concat(str1);
              },
              code_example: `let str1 = " Let's study javascript.";

  // concat() 함수 사용
  return data.concat(str1);`,
            },
            {
              id: 4,
              title: "문자열 길이 반환",
              description: "문자열의 길이를 반환합니다.",
              func_data: (data: any) => {
                return data.length;
              },
              code_example: `return data.length;`,
            },
          ],
        },
        {
          name: "includes",
          description:
            "특정 부분 문자열을 포함하고 있는지를 boolean 값으로 반환합니다.",
          docs: [
            {
              id: 1,
              title: "특정 문자 존재 여부 확인",
              description:
                "문자열 속에 특정 문자가 존재하는지 확인할 수 있습니다.",
              func_data: (data: any) => {
                return data.includes("Hello");
              },
              code_example: `return data.includes('Hello');`,
            },
            {
              id: 2,
              title: "특정 위치 이후 확인",
              description:
                "문자열 속에 특정 위치 이후에 특정 문자가 존재하는지 확인할 수 있습니다.",
              func_data: (data: any) => {
                return data.includes("Hello", 5);
              },
              code_example: `return data.includes('Hello', 5);`,
            },
          ],
        },
        {
          name: "indexOf",
          description:
            "지정된 부분 문자열이 처음으로 등장하는 인덱스를 반환합니다.",
          docs: [
            {
              id: 1,
              title: "특정 문자 위치 찾기",
              description:
                "문자열 속에 특정 문자가 존재하는 위치를 반환합니다. 특정 문자를 발견하지 못하면 '-1'을 반환합니다.",
              func_data: (data: any) => {
                return data.indexOf("world");
              },
              code_example: `return data.indexOf('world');`,
            },
            {
              id: 2,
              title: "특정 위치 이후 확인",
              description:
                "시작 위치 이후에 특정 문자가 존재하는 위치를 반환합니다. 특정 문자를 발견하지 못하면 '-1'을 반환합니다.",
              func_data: (data: any) => {
                return data.indexOf("Hello", 5);
              },
              code_example: `return data.indexOf('Hello', 5);`,
            },
          ],
        },
        {
          name: "split",
          description:
            "문자열을 지정된 구분자를 기준으로 분할하여 배열로 반환합니다.",
          docs: [
            {
              id: 1,
              title: "문자열 분리",
              favorites_title: "공백을 기준으로 분리",
              description: "문자열 속 공백을 기준으로 단어를 분리합니다.",
              func_data: (data: any) => {
                return data.split(" ");
              },
              code_example: `return data.split(' ');`,
            },
            {
              id: 2,
              favorites_title: "여러 기준으로 분리",
              description:
                "정규 표현식을 사용하여, 여러 기준으로 단어를 분리합니다.",
              func_data: (data: any) => {
                return data.split(/[,!?]/);
              },
              code_example: `return data.split(/[,!?]/);`,
            },
            {
              id: 3,
              favorites_title: "특정 위치 이내로 분리",
              description: "특정 위치 이내로 기준에 따라 단어를 분리합니다.",
              func_data: (data: any) => {
                return data.split("", 4);
              },
              code_example: `return data.split('',4);`,
            },
          ],
        },
        {
          name: "slice",
          description: "문자열의 범위를 지정하여 추출하고 반환합니다.",
          docs: [
            {
              id: 1,
              title: "처음부터 특정 인덱스 이전까지 반환",
              description:
                "문자열에서 처음부터 특정 인덱스 이전 위치까지 반환합니다.",
              func_data: (data: any) => {
                return data.slice(0, 5);
              },
              code_example: `return data.slice(0, 5);`,
            },
            {
              id: 2,
              title: "특정 위치부터 끝까지 반환",
              description:
                "문자열에서 특정 인덱스를 시작으로 문자열 끝까지 반환합니다.",
              func_data: (data: any) => {
                return data.slice(7);
              },
              code_example: `return data.slice(7);`,
            },
            {
              id: 3,
              title: "시작과 끝 위치 지정후 반환",
              description:
                "문자열에서 시작과 끝 인덱스를 지정하여 문자열을 반환합니다. 끝 인덱스는 반환 데이터에 포함되지 않습니다.",
              func_data: (data: any) => {
                return data.slice(7, 12);
              },
              code_example: `return data.slice(7, 12);`,
            },
            {
              id: 4,
              title: "마지막 문자를 제외하고 반환",
              description: "문자열에서 맨 마지막 문자만 제외하여 반환합니다.",
              func_data: (data: any) => {
                return data.slice(0, -1);
              },
              code_example: `return data.slice(0, -1);`,
            },
            {
              id: 5,
              title: "뒤에서부터 반환",
              description: "인덱스 만큼 문자열의 뒤에서부터 반환합니다.",
              func_data: (data: any) => {
                return data.slice(-6);
              },
              code_example: `return data.slice(-6);`,
            },
          ],
        },
        {
          name: "replace",
          description: "문자열을 다른 문자열로 교체합니다.",
          docs: [
            {
              id: 1,
              title: "문자열 교체",
              favorites_title: "문자열 교체",
              description: "문자열을 다른 문자열로 교체합니다.",
              func_data: (data: any) => {
                return data.replace("world", "developer");
              },
              code_example: `// replace는 첫번째로 일치되는 항목만 교체합니다.
  return data.replace('world','developer');`,
            },
            {
              id: 2,
              favorites_title: "특정 문자열 모두 교체",
              description: "특정 문자열 모두를 다른 문자열로 교체합니다.",
              func_data: (data: any) => {
                return data.replaceAll("H", "@");
              },
              code_example: `// replceAll은 일치되는 항목 모두를 교체합니다.
  return data.replaceAll('H','@');`,
            },
            {
              id: 3,
              favorites_title: "여러 종류의 문자열을 동일하게 교체",
              description: "여러 종류의 문자열을 동일한 문자열로 교체합니다.",
              func_data: (data: any) => {
                return data.replace(/world|you/g, "??");
              },
              code_example: `// world와 you와 일치되는 항목 모두를 교체합니다.
  return data.replace(/world|you/g, "??");`,
            },
          ],
        },
        {
          name: "letterCase",
          description: "문자열의 대소문자를 변환합니다.",
          docs: [
            {
              id: 1,
              title: "대문자로 변환",
              description: "문자열을 모두 대문자로 반환합니다.",
              func_data: (data: any) => {
                return data.toUpperCase();
              },
              code_example: `return data.toUpperCase();`,
            },
            {
              id: 2,
              title: "소문자로 변환",
              description: "문자열을 모두 소문자로 반환합니다.",
              func_data: (data: any) => {
                return data.toLowerCase();
              },
              code_example: `return data.toLowerCase();`,
            },
          ],
        },
        {
          name: "trim",
          description: "문자열의 공백을 제거한 후 반환합니다.",
          docs: [
            {
              id: 1,
              title: "양쪽 공백 제거",
              description:
                "문자열 양쪽 공백을 제거합니다. 문자 중간 공백은 유지됩니다.",
              func_data: (data: any) => {
                return data.trim();
              },
              code_example: `return data.trim();`,
            },
            {
              id: 2,
              title: "왼쪽 공백 제거",
              description: "문자열 왼쪽 공백을 제거합니다.",
              func_data: (data: any) => {
                return data.trimLeft();
              },
              code_example: `return data.trimLeft();`,
            },
            {
              id: 3,
              title: "오른쪽 공백 제거",
              description: "문자열 오른쪽 공백을 제거합니다.",
              func_data: (data: any) => {
                return data.trimRight();
              },
              code_example: `return data.trimRight();`,
            },
          ],
        },
      ],
    },
    {
      name: "number",
      description:
        "자바스크립트에서 숫자에 적용되는 내장 함수들을 사용할 수 있습니다.",
      side_submenu: [
        {
          name: "common",
          description: "숫자의 기본 사용법을 안내합니다.",
          docs: [
            {
              id: 1,
              title: "숫자 반올림",
              description: "소수점을 반올림하여 가장 가까운 정수로 변환합니다.",
              favorites_title: "숫자 반올림(Math.round)",
              func_data: (data: any) => {
                return Math.round(data);
              },
              code_example: `return Math.round(data);`,
            },
            {
              id: 2,
              title: "숫자 올림",
              description: "숫자를 항상 더 큰 정수로 올림합니다.",
              favorites_title: "숫자 올림(Math.ceil)",
              func_data: (data: any) => {
                return Math.ceil(data);
              },
              code_example: `return Math.ceil(data);`,
            },
            {
              id: 3,
              title: "숫자 내림",
              description: "숫자를 항상 더 작은 정수로 내림합니다.",
              favorites_title: "숫자 내림(Math.floor)",
              func_data: (data: any) => {
                return Math.floor(data);
              },
              code_example: `return Math.floor(data);`,
            },
            {
              id: 4,
              title: "숫자 절대값",
              description: "숫자의 절대값을 반환합니다.",
              favorites_title: "숫자 절대값(Math.abs)",
              func_data: (data: any) => {
                return Math.abs(data);
              },
              code_example: `return Math.abs(data);`,
            },
            // {
            //   id: 5,
            //   title: "숫자 최대값",
            //   description: "주어진 숫자들 중에서 최대값을 반환합니다.",
            //   favorites_title: "숫자 최대값(Math.max)",
            //   func_data: (data: any) => {
            //     return Math.max(...data);
            //   },
            //   code_example: `return Math.max(...data);`,
            // },
            // {
            //   id: 6,
            //   title: "숫자 최소값",
            //   description: "주어진 숫자들 중에서 최소값을 반환합니다.",
            //   favorites_title: "숫자 최소값(Math.min)",
            //   func_data: (data: any) => {
            //     return Math.min(...data);
            //   },
            //   code_example: `return Math.min(...data);`,
            // },
          ],
        },
        {
          name: "random",
          description: "난수를 생성합니다.",
          docs: [
            {
              id: 1,
              title: "0과 1 사이의 랜덤 숫자",
              description: "0 이상 1 미만의 랜덤 숫자를 생성합니다.",
              favorites_title: "랜덤 숫자(Math.random)",
              func_data: () => {
                return Math.random();
              },
              code_example: `return Math.random();`,
            },
            // {
            //   id: 2,
            //   title: "특정 범위 내의 랜덤 숫자",
            //   description: "특정 범위 내의 랜덤 숫자를 생성합니다.",
            //   favorites_title: "범위 내 랜덤 숫자(Math.random)",
            //   func_data: (min: number, max: number) => {
            //     return Math.floor(Math.random() * (max - min + 1)) + min;
            //   },
            //   code_example: `return Math.floor(Math.random() * (max - min + 1)) + min;`,
            // },
          ],
        },
        {
          name: "conversion",
          description: "숫자 타입 변환과 관련된 함수들입니다.",
          docs: [
            {
              id: 1,
              title: "숫자를 문자열로 변환",
              description: "숫자 타입을 문자열로 변환합니다.",
              favorites_title: "숫자를 문자열로 변환(String)",
              func_data: (data: any) => {
                return String(data);
              },
              code_example: `return String(data);`,
            },
            {
              id: 2,
              title: "문자열을 숫자로 변환",
              description: "문자열을 숫자 타입으로 변환합니다.",
              favorites_title: "문자열을 숫자로 변환(Number)",
              func_data: (data: any) => {
                return Number(data);
              },
              code_example: `return Number(data);`,
            },
            {
              id: 3,
              title: "문자열을 실수로 변환",
              description: "문자열을 실수 타입으로 변환합니다.",
              favorites_title: "문자열을 실수로 변환(parseFloat)",
              func_data: (data: any) => {
                return parseFloat(data);
              },
              code_example: `return parseFloat(data);`,
            },
            {
              id: 4,
              title: "문자열을 정수로 변환",
              description: "문자열을 정수 타입으로 변환합니다.",
              favorites_title: "문자열을 정수로 변환(parseInt)",
              func_data: (data: any) => {
                return parseInt(data);
              },
              code_example: `return parseInt(data);`,
            },
          ],
        },
        {
          name: "rounding",
          description: "숫자 반올림 및 소수점 처리와 관련된 함수들입니다.",
          docs: [
            {
              id: 1,
              title: "소수점 이하 반올림",
              description: "소수점 이하를 지정된 자리까지 반올림합니다.",
              favorites_title: "소수점 반올림(toFixed)",
              func_data: (data: any) => {
                return data.toFixed(2);
              },
              code_example: `return data.toFixed(2);`,
            },
            {
              id: 2,
              title: "소수점 반올림 후 숫자로 반환",
              description: "소수점 반올림 후 숫자 타입으로 반환합니다.",
              favorites_title: "소수점 반올림(Number)",
              func_data: (data: any) => {
                return Number(data.toFixed(2));
              },
              code_example: `return Number(data.toFixed(2));`,
            },
          ],
        },
      ],
    },
    {
      name: "object",
      description:
        "자바스크립트에서 객체 타입에 적용되는 내장 함수들을 사용할 수 있습니다.",
      side_submenu: [
        {
          name: "common",
          description: "객체의 기본 사용법을 안내합니다.",
          docs: [
            {
              id: 1,
              title: "객체 속성 추가",
              description: "객체에 새로운 속성을 추가합니다.",
              func_data: (data: any) => {
                data.study = "javascript";
                return data;
              },
              code_example: `// 공부 속성 추가
  data.study = 'javascript';
  
  return data;`,
            },
            {
              id: 2,
              title: "객체 속성 제거",
              description: "객체의 속성을 제거합니다.",
              func_data: (data: any) => {
                delete data.age;
                return data;
              },
              code_example: `// 나이 속성 제거
  delete data.age;

  return data;`,
            },
            {
              id: 3,
              title: "여러 객체 합치기",
              favorites_title: "여러 객체 합치기(Object.assign)",
              description:
                "Object.assign() 메서드를 사용하여 각각의 객체 속성을 복사할 수 있습니다.",
              func_data: (data: any) => {
                let additionalData = { study: "javascript", hobby: "exercise" };
                return Object.assign(data, additionalData);
              },
              code_example: `// 합쳐질 데이터
  let additionalData = { study: "javascript", hobby: "exercise" };
  
  return Object.assign(data, additionalData);`,
            },
            {
              id: 4,
              favorites_title: "여러 객체 합치기(Spread)",
              description:
                "Spread 연산자를 사용하여 객체 속성을 복사할 수 있습니다.",
              func_data: (data: any) => {
                let additionalData = { study: "javascript", hobby: "exercise" };
                return { ...data, ...additionalData };
              },
              code_example: `// 합쳐질 데이터
  let additionalData = { study: "javascript", hobby: "exercise" };

  return { ...data, ...additionalData };`,
            },
          ],
        },
        {
          name: "key",
          description: "객체의 속성 이름들을 배열로 반환합니다.",
          docs: [
            {
              id: 1,
              title: "객체 속성 이름 리스트 반환",
              description: "객체의 속성 이름들을 배열로 반환합니다.",
              func_data: (data: any) => {
                return Object.keys(data);
              },
              code_example: `return Object.keys(data);`,
            },
          ],
        },
        {
          name: "values",
          description: "객체의 속성 값들을 배열로 반환합니다.",
          docs: [
            {
              id: 1,
              title: "객체 속성 값 리스트 반환",
              description: "객체의 속성 값들을 배열로 반환합니다.",
              func_data: (data: any) => {
                return Object.values(data);
              },
              code_example: `return Object.values(data);`,
            },
          ],
        },
        {
          name: "entries",
          description: "객체의 키와 값의 쌍을 담은 배열을 반환합니다.",
          docs: [
            {
              id: 1,
              title: "객체 이름 및 값 리스트 반환",
              description: "객체의 키와 값의 쌍을 담은 배열을 반환합니다.",
              func_data: (data: any) => {
                return Object.entries(data);
              },
              code_example: `return Object.entries(data);`,
            },
          ],
        },
      ],
    },
    {
      name: "array",
      description: "자바스크립트에서 배열을 다루는 다양한 방법을 안내합니다.",
      side_submenu: [
        {
          name: "common",
          description: "배열을 다루는 기본적인 방법들입니다.",
          docs: [
            {
              id: 1,
              title: "배열 생성",
              description:
                "배열을 생성하는 다양한 방법입니다. `[]` 또는 `Array` 생성자를 사용할 수 있습니다.",
              favorites_title: "배열 생성",
              func_data: () => {
                return [1, 2, 3, 4];
              },
              code_example: `return [1, 2, 3, 4];`,
            },
            {
              id: 2,
              title: "배열의 길이 확인",
              description:
                "배열의 길이를 확인하려면 `length` 속성을 사용합니다.",
              favorites_title: "배열 길이 확인",
              func_data: (data: any) => {
                return data.length;
              },
              code_example: `return data.length;`,
            },
            {
              id: 3,
              title: "배열 요소 접근",
              description:
                "배열에서 특정 요소에 접근하려면 인덱스를 사용합니다.",
              favorites_title: "배열 요소 접근",
              func_data: (data: any) => {
                return data[2];
              },
              code_example: `return data[2];`,
            },
            {
              id: 4,
              title: "배열 결합",
              description: "배열을 결합할 때 `concat()` 메서드를 사용합니다.",
              favorites_title: "배열 결합",
              func_data: (data: any) => {
                return data.concat([5, 6, 7]);
              },
              code_example: `return data.concat([5,6,7]);`,
            },
            {
              id: 5,
              title: "배열 뒤집기",
              description:
                "`reverse()` 메서드를 사용하여 배열의 순서를 뒤집습니다.",
              favorites_title: "배열 뒤집기",
              func_data: (data: any) => {
                return data.reverse();
              },
              code_example: `return data.reverse();`,
            },
          ],
        },
        {
          name: "methods",
          description: "배열에서 제공하는 다양한 메서드를 다룹니다.",
          docs: [
            {
              id: 1,
              title: "push",
              description: "배열의 끝에 새로운 요소를 추가합니다.",
              favorites_title: "배열 끝에 요소 추가",
              func_data: (data: any) => {
                data.push(5);
                return data;
              },
              code_example: `data.push(5);
  return data;`,
            },
            {
              id: 2,
              title: "pop",
              description: "배열의 마지막 요소를 제거하고 반환합니다.",
              favorites_title: "배열 끝에서 요소 제거",
              func_data: (data: any) => {
                return data.pop();
              },
              code_example: `return data.pop();`,
            },
            {
              id: 3,
              title: "shift",
              description: "배열의 첫 번째 요소를 제거하고 반환합니다.",
              favorites_title: "배열 첫 번째 요소 제거",
              func_data: (data: any) => {
                return data.shift();
              },
              code_example: `return data.shift();`,
            },
            {
              id: 4,
              title: "unshift",
              description: "배열의 앞에 새로운 요소를 추가합니다.",
              favorites_title: "배열 앞에 요소 추가",
              func_data: (data: any) => {
                data.unshift(0);
                return data;
              },
              code_example: `data.unshift(0);
  return data;`,
            },
            //         {
            //           "id": 5,
            //           "title": "splice",
            //           "description": "배열에서 요소를 추가하거나 제거합니다. 지정된 인덱스에서 시작하여 몇 개의 요소를 삭제할지 정의합니다.",
            //           "favorites_title": "배열에서 요소 추가/제거",
            //           "func_data": (data: any, start: number, deleteCount: number, newItems: any) => {
            //             data.splice(start, deleteCount, ...newItems);
            //             return data;
            //           },
            //           "code_example": `data.splice(start, deleteCount, ...newItems);
            // return data;`,
            //         }
          ],
        },
        {
          name: "iteration",
          description: "배열을 순회하는 방법을 다룹니다.",
          docs: [
            //         {
            //           id: 1,
            //           title: "forEach",
            //           description:
            //             "`forEach()` 메서드를 사용하여 배열의 각 요소를 처리합니다.",
            //           favorites_title: "배열 순회 (forEach)",
            //           func_data: (data: any) => {
            //             data.forEach((element: any) => {
            //               console.log(element);
            //             });
            //           },
            //           code_example: `data.forEach((element) => {
            //   console.log(element);
            // });`,
            //         },
            {
              id: 1,
              title: "map",
              description:
                "`map()` 메서드를 사용하여 배열의 각 요소에 대해 변형된 새로운 배열을 반환합니다.",
              favorites_title: "배열 순회 (map)",
              func_data: (data: any) => {
                return data.map((element: any) => element * 2);
              },
              code_example: `return data.map((element) => element * 2);`,
            },
            {
              id: 2,
              title: "filter",
              description:
                "`filter()` 메서드를 사용하여 조건을 만족하는 요소만 포함된 새로운 배열을 반환합니다.",
              favorites_title: "배열 필터링 (filter)",
              func_data: (data: any) => {
                return data.filter((element: any) => element > 3);
              },
              code_example: `return data.filter((element) => element > 3);`,
            },
            {
              id: 3,
              title: "reduce",
              description:
                "`reduce()` 메서드를 사용하여 배열의 값을 하나의 결과값으로 누적합니다.",
              favorites_title: "배열 축소 (reduce)",
              func_data: (data: any) => {
                return data.reduce((acc: any, curr: any) => acc + curr, 0);
              },
              code_example: `return data.reduce((acc, curr) => acc + curr, 0);`,
            },
          ],
        },
      ],
    },
    {
      name: "date",
      description:
        "자바스크립트에서 Date 객체를 사용하여 날짜와 시간을 처리하는 방법을 안내합니다.",
      side_submenu: [
        {
          name: "common",
          description: "Date 객체의 기본적인 사용법을 안내합니다.",
          docs: [
            {
              id: 1,
              title: "현재 날짜와 시간 가져오기",
              description:
                "현재 날짜와 시간을 가져오는 방법입니다. `new Date()`를 사용하면 현재 날짜와 시간이 포함된 `Date` 객체가 생성됩니다.",
              favorites_title: "현재 날짜와 시간",
              func_data: () => {
                return new Date();
              },
              code_example: `return new Date();`,
            },
            {
              id: 2,
              title: "특정 날짜 생성하기",
              description:
                "특정 날짜를 생성하려면 `Date` 객체에 연도, 월, 일 등을 인수로 전달합니다.",
              favorites_title: "특정 날짜 생성",
              func_data: () => {
                return new Date(2025, 0, 5); // 2025년 1월 5일
              },
              code_example: `return new Date(2025, 0, 5);`,
            },
            {
              id: 3,
              title: "날짜와 시간 포맷팅",
              description:
                "날짜를 원하는 형식으로 변환하려면 `Date` 객체의 메서드를 사용할 수 있습니다.",
              favorites_title: "날짜 포맷팅",
              func_data: () => {
                const date = new Date();
                return date.toLocaleDateString(); // 날짜를 지역화된 문자열로 반환
              },
              code_example: `const date = new Date();
  return date.toLocaleDateString();`,
            },
          ],
        },
        {
          name: "methods",
          description: "Date 객체에서 제공하는 다양한 메서드들을 다룹니다.",
          docs: [
            {
              id: 1,
              title: "getFullYear",
              description: "날짜에서 연도를 반환합니다.",
              favorites_title: "연도 가져오기",
              func_data: (data: any) => {
                const sampleDate = new Date(data);
                return sampleDate.getFullYear();
              },
              code_example: `const sampleDate = new Date(data);
  return sampleDate.getFullYear();`,
            },
            {
              id: 2,
              title: "getMonth",
              description: "날짜에서 월을 반환합니다. (0은 1월, 11은 12월)",
              favorites_title: "월 가져오기",
              func_data: (data: any) => {
                const sampleDate = new Date(data);
                return sampleDate.getMonth();
              },
              code_example: `const sampleDate = new Date(data);
  return sampleDate.getMonth();`,
            },
            {
              id: 3,
              title: "getDate",
              description: "날짜에서 일을 반환합니다.",
              favorites_title: "일 가져오기",
              func_data: (data: any) => {
                const sampleDate = new Date(data);
                return sampleDate.getDate();
              },
              code_example: `const sampleDate = new Date(data);
  return sampleDate.getDate();`,
            },
            {
              id: 4,
              title: "getDay",
              description: "요일을 반환합니다. (0은 일요일, 6은 토요일)",
              favorites_title: "요일 가져오기",
              func_data: (data: any) => {
                const sampleDate = new Date(data);
                return sampleDate.getDay();
              },
              code_example: `const sampleDate = new Date(data);
  return sampleDate.getDay();`,
            },
            {
              id: 5,
              title: "getTime",
              description: "날짜의 타임스탬프를 반환합니다. (밀리초 단위)",
              favorites_title: "타임스탬프 가져오기",
              func_data: (data: any) => {
                const sampleDate = new Date(data);
                return sampleDate.getTime();
              },
              code_example: `const sampleDate = new Date(data);
  return sampleDate.getTime();`,
            },
          ],
        },
        {
          name: "set",
          description: "날짜를 수정하는 메서드를 다룹니다.",
          docs: [
            {
              id: 1,
              title: "setFullYear",
              description: "날짜의 연도를 설정합니다.",
              favorites_title: "연도 설정",
              func_data: (data: any) => {
                const sampleDate = new Date(data);
                sampleDate.setFullYear(2023);
                return sampleDate;
              },
              code_example: `const sampleDate = new Date(data);
  sampleDate.setFullYear(2023);
  return sampleDate;`,
            },
            {
              id: 2,
              title: "setMonth",
              description: "날짜의 월을 설정합니다.",
              favorites_title: "월 설정",
              func_data: (data: any) => {
                const sampleDate = new Date(data);
                sampleDate.setMonth(11); // 12월
                return sampleDate;
              },
              code_example: `const sampleDate = new Date(data);
  sampleDate.setMonth(11); // 12월
  return sampleDate;`,
            },
            {
              id: 3,
              title: "setDate",
              description: "날짜의 일을 설정합니다.",
              favorites_title: "일 설정",
              func_data: (data: any) => {
                const sampleDate = new Date(data);
                sampleDate.setDate(15);
                return sampleDate;
              },
              code_example: `const sampleDate = new Date(data);
  sampleDate.setDate(15);
  return sampleDate;`,
            },
            {
              id: 4,
              title: "setHours",
              description: "날짜의 시간을 설정합니다.",
              favorites_title: "시간 설정",
              func_data: (data: any) => {
                const sampleDate = new Date(data);
                sampleDate.setHours(14); // 오후 2시
                return sampleDate;
              },
              code_example: `const sampleDate = new Date(data);
  sampleDate.setHours(14);
  return sampleDate;`,
            },
          ],
        },
      ],
    },
  ],
});
