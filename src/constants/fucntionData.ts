export interface FuncData {
  [key: string] : (data: any) => void;
}

export const functionData: FuncData = {
  func1: (data: any) => {
    const result = data.includes('Hello');
    return result;
  },
  func2: (data: any) => {
    const result = data.includes('Hello', 5);
    return result;
  },
  func3: (data: any) => {
    const result = data.indexOf('world');
    return result;
  },
  func4: (data: any) => {
    const result = data.indexOf('Hello', 5);
    return result;
  },
  func5: (data: any) => {
    const result = data.split(' ');
    return result;
  },
  func6: (data: any) => {
    const result = data.split(/[,!?]/);
    return result;
  },
  func7: (data: any) => {
    const result = data.split('',4);
    return result;
  },
  func8: (data: any) => {
    const result = data.slice(7);
    return result;
  },
  func9: (data: any) => {
    const result = data.slice(7, 12);
    return result;
  },
  func10: (data: any) => {
    const result = data.slice(-6);
    return result;
  },
  func11: (data: any) => {
    const result = data.toUpperCase();
    return result;
  },
  func12: (data: any) => {
    const result = data.toLowerCase();
    return result;
  },
  func13: (data: any) => {
    const result = data.trim();
    return result;
  },
  func14: (data: any) => {
    const result = data.trimLeft();
    return result;
  },
  func15: (data: any) => {
    const result = data.trimRight()
    return result;
  },
  func16: (data: any) => {
    const result = Object.keys(data);
    return result;
  },
  func17: (data: any) => {
    const result = Object.values(data);
    return result;
  },
  func18: (data: any) => {
    const result = Object.entries(data);
    return result;
  },
};