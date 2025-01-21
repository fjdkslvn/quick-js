export interface FuncData {
  [key: string]: (data: any) => void;
}
export interface FuncString {
  [key: string]: string;
}

export const functionData: FuncData = {
  string_common_1: (data: any) => {
    let str1 = " Let's study javascript.";
    return data + str1;
  },
  string_common_2: (data: any) => {
    return `${data} Let's study javascript.`;
  },
  string_common_3: (data: any) => {
    let str1 = " Let's study javascript.";
    return data.concat(str1);
  },
  string_common_4: (data: any) => {
    return data.length;
  },
  string_includes_1: (data: any) => {
    return data.includes("Hello");
  },
  string_includes_2: (data: any) => {
    return data.includes("Hello", 5);
  },
  string_indexOf_1: (data: any) => {
    return data.indexOf("world");
  },
  string_indexOf_2: (data: any) => {
    return data.indexOf("Hello", 5);
  },
  string_split_1: (data: any) => {
    return data.split(" ");
  },
  string_split_2: (data: any) => {
    return data.split(/[,!?]/);
  },
  string_split_3: (data: any) => {
    return data.split("", 4);
  },
  string_slice_1: (data: any) => {
    return data.slice(7);
  },
  string_slice_2: (data: any) => {
    return data.slice(7, 12);
  },
  string_slice_3: (data: any) => {
    return data.slice(-6);
  },
  string_replace_1: (data: any) => {
    return data.replace("world", "developer");
  },
  string_replace_2: (data: any) => {
    return data.replaceAll("H", "@");
  },
  string_replace_3: (data: any) => {
    return data.replace(/world|you/g, "??");
  },
  string_letterCase_1: (data: any) => {
    return data.toUpperCase();
  },
  string_letterCase_2: (data: any) => {
    return data.toLowerCase();
  },
  string_trim_1: (data: any) => {
    return data.trim();
  },
  string_trim_2: (data: any) => {
    return data.trimLeft();
  },
  string_trim_3: (data: any) => {
    return data.trimRight();
  },
  object_common_1: (data: any) => {
    data.study = "javascript";
    return data;
  },
  object_common_2: (data: any) => {
    delete data.age;
    return data;
  },
  object_common_3: (data: any) => {
    let additionalData = { study: "javascript", hobby: "exercise" };
    return Object.assign(data, additionalData);
  },
  object_common_4: (data: any) => {
    let additionalData = { study: "javascript", hobby: "exercise" };
    return { ...data, ...additionalData };
  },
  object_key_1: (data: any) => {
    return Object.keys(data);
  },
  object_values_1: (data: any) => {
    return Object.values(data);
  },
  object_entries_1: (data: any) => {
    return Object.entries(data);
  },
};

export const functionString: FuncString = {
  func1: `return data.includes('Hello?');`,
  func2: `return data.includes('Hello', 5);`,
  func3: `return data.indexOf('world');`,
  func4: `return data.indexOf('Hello', 5);`,
  func5: `return data.split(' ');`,
  func6: `return data.split(/[,!?]/);`,
  func7: `return data.split('',4);`,
  func8: `return data.slice(7);`,
  func9: `return data.slice(7, 12);`,
  func10: `return data.slice(-6);`,
  func11: `return data.toUpperCase();`,
  func12: `return data.toLowerCase();`,
  func13: `return data.trim();`,
  func14: `return data.trimLeft();`,
  func15: `return data.trimRight();`,
  func16: `return Object.keys(data);`,
  func17: `return Object.values(data);`,
  func18: `return Object.entries(data);`,
  func19: `// 공부 속성 추가
  data.study = 'javascript';
  
  return data;`,
  func20: `// 나이 속성 제거
  delete data.age;

  return data;`,
  func21: `let str1 = " Let's study javascript.";

  // 더하기 연산자 사용
  return data + str1;`,
  func22: `// 템플릿 리터럴 사용
  return \`\${data} Let's study javascript.\`;`,
  func23: `let str1 = " Let's study javascript.";

  // concat() 함수 사용
  return data.concat(str1);`,
  func24: `return data.length;`,
  func25: `// replace는 첫번째로 일치되는 항목만 교체합니다.
  return data.replace('world','developer');`,
  func26: `// replceAll은 일치되는 항목 모두를 교체합니다.
  return data.replaceAll('H','@');`,
  func27: `// world와 you와 일치되는 항목 모두를 교체합니다.
  return data.replace(/world|you/g, "??");`,
  func28: `// 합쳐질 데이터
  let additionalData = { study: "javascript", hobby: "exercise" };
  
  return Object.assign(data, additionalData);`,
  func29: `// 합쳐질 데이터
  let additionalData = { study: "javascript", hobby: "exercise" };

  return { ...data, ...additionalData };`,
};
