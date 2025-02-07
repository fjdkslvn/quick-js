// export interface FuncData {
//   [key: string]: (data: any) => void;
// }
// export interface FuncString {
//   [key: string]: string;
// }

// export const functionData: FuncData = {
//   string_common_1: (data: any) => {
//     let str1 = " Let's study javascript.";
//     return data + str1;
//   },
//   string_common_2: (data: any) => {
//     return `${data} Let's study javascript.`;
//   },
//   string_common_3: (data: any) => {
//     let str1 = " Let's study javascript.";
//     return data.concat(str1);
//   },
//   string_common_4: (data: any) => {
//     return data.length;
//   },
//   string_includes_1: (data: any) => {
//     return data.includes("Hello");
//   },
//   string_includes_2: (data: any) => {
//     return data.includes("Hello", 5);
//   },
//   string_indexOf_1: (data: any) => {
//     return data.indexOf("world");
//   },
//   string_indexOf_2: (data: any) => {
//     return data.indexOf("Hello", 5);
//   },
//   string_split_1: (data: any) => {
//     return data.split(" ");
//   },
//   string_split_2: (data: any) => {
//     return data.split(/[,!?]/);
//   },
//   string_split_3: (data: any) => {
//     return data.split("", 4);
//   },
//   string_slice_1: (data: any) => {
//     return data.slice(7);
//   },
//   string_slice_2: (data: any) => {
//     return data.slice(7, 12);
//   },
//   string_slice_3: (data: any) => {
//     return data.slice(-6);
//   },
//   string_replace_1: (data: any) => {
//     return data.replace("world", "developer");
//   },
//   string_replace_2: (data: any) => {
//     return data.replaceAll("H", "@");
//   },
//   string_replace_3: (data: any) => {
//     return data.replace(/world|you/g, "??");
//   },
//   string_letterCase_1: (data: any) => {
//     return data.toUpperCase();
//   },
//   string_letterCase_2: (data: any) => {
//     return data.toLowerCase();
//   },
//   string_trim_1: (data: any) => {
//     return data.trim();
//   },
//   string_trim_2: (data: any) => {
//     return data.trimLeft();
//   },
//   string_trim_3: (data: any) => {
//     return data.trimRight();
//   },
//   object_common_1: (data: any) => {
//     data.study = "javascript";
//     return data;
//   },
//   object_common_2: (data: any) => {
//     delete data.age;
//     return data;
//   },
//   object_common_3: (data: any) => {
//     let additionalData = { study: "javascript", hobby: "exercise" };
//     return Object.assign(data, additionalData);
//   },
//   object_common_4: (data: any) => {
//     let additionalData = { study: "javascript", hobby: "exercise" };
//     return { ...data, ...additionalData };
//   },
//   object_key_1: (data: any) => {
//     return Object.keys(data);
//   },
//   object_values_1: (data: any) => {
//     return Object.values(data);
//   },
//   object_entries_1: (data: any) => {
//     return Object.entries(data);
//   },
// };

// export const functionString: FuncString = {
//   string_common_1: `let str1 = " Let's study javascript.";

//   // 더하기 연산자 사용
//   return data + str1;`,
//   string_common_2: `// 템플릿 리터럴 사용
//   return \`\${data} Let's study javascript.\`;`,
//   string_common_3: `let str1 = " Let's study javascript.";

//   // concat() 함수 사용
//   return data.concat(str1);`,
//   string_common_4: `return data.length;`,
//   string_includes_1: `return data.includes('Hello');`,
//   string_includes_2: `return data.includes('Hello', 5);`,
//   string_indexOf_1: `return data.indexOf('world');`,
//   string_indexOf_2: `return data.indexOf('Hello', 5);`,
//   string_split_1: `return data.split(' ');`,
//   string_split_2: `return data.split(/[,!?]/);`,
//   string_split_3: `return data.split('',4);`,
//   string_slice_1: `return data.slice(7);`,
//   string_slice_2: `return data.slice(7, 12);`,
//   string_slice_3: `return data.slice(-6);`,
//   string_replace_1: `// replace는 첫번째로 일치되는 항목만 교체합니다.
//   return data.replace('world','developer');`,
//   string_replace_2: `// replceAll은 일치되는 항목 모두를 교체합니다.
//   return data.replaceAll('H','@');`,
//   string_replace_3: `// world와 you와 일치되는 항목 모두를 교체합니다.
//   return data.replace(/world|you/g, "??");`,
//   string_letterCase_1: `return data.toUpperCase();`,
//   string_letterCase_2: `return data.toLowerCase();`,
//   string_trim_1: `return data.trim();`,
//   string_trim_2: `return data.trimLeft();`,
//   string_trim_3: `return data.trimRight();`,
//   object_common_1: `// 공부 속성 추가
//   data.study = 'javascript';

//   return data;`,
//   object_common_2: `// 나이 속성 제거
//   delete data.age;

//   return data;`,
//   object_common_3: `// 합쳐질 데이터
//   let additionalData = { study: "javascript", hobby: "exercise" };

//   return Object.assign(data, additionalData);`,
//   object_common_4: `// 합쳐질 데이터
//   let additionalData = { study: "javascript", hobby: "exercise" };

//   return { ...data, ...additionalData };`,
//   object_key_1: `return Object.keys(data);`,
//   object_values_1: `return Object.values(data);`,
//   object_entries_1: `return Object.entries(data);`,
// };
