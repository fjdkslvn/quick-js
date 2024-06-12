export interface FuncData {
  [key: string] : (data: any) => void;
}
export interface FuncString {
  [key: string] : string;
}

export const functionData: FuncData = {
  func1: (data: any) => {
    return data.includes('Hello');
  },
  func2: (data: any) => {
    return data.includes('Hello', 5);
  },
  func3: (data: any) => {
    return data.indexOf('world');
  },
  func4: (data: any) => {
    return data.indexOf('Hello', 5);
  },
  func5: (data: any) => {
    return data.split(' ');
  },
  func6: (data: any) => {
    return data.split(/[,!?]/);
  },
  func7: (data: any) => {
    return data.split('',4);
  },
  func8: (data: any) => {
    return data.slice(7);
  },
  func9: (data: any) => {
    return data.slice(7, 12);
  },
  func10: (data: any) => {
    return data.slice(-6);
  },
  func11: (data: any) => {
    return data.toUpperCase();
  },
  func12: (data: any) => {
    return data.toLowerCase();
  },
  func13: (data: any) => {
    return data.trim();
  },
  func14: (data: any) => {
    return data.trimLeft();
  },
  func15: (data: any) => {
    return data.trimRight();
  },
  func16: (data: any) => {
    return Object.keys(data);
  },
  func17: (data: any) => {
    return Object.values(data);
  },
  func18: (data: any) => {
    return Object.entries(data);
  },
  func19: (data: any) => {
    data.study = 'javascript';
    return data;
  },
  func20: (data: any) => {
    delete data.age;
    return data;
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
};