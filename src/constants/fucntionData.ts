export interface FuncData {
  [key: string] : (data: any) => void;
}

export const functionData: FuncData = {
  // func1: (data: any[]) => { return data.map((obj, idx) => ({...obj, index : idx})) },
  // func2: (data: any[]) => { return data.map((obj) => (obj.id === 1 ? {...obj, name:'박철수'} : obj)) },
  // func3: (data: any[]) => { return data.filter((obj) => obj.id !== 1) },
  func1: (data: any) => { return data.includes('Hello') },
  func2: (data: any) => { return data.includes('Hello', 5) },
  func3: (data: any) => { return data.indexOf('world') },
  func4: (data: any) => { return data.indexOf('Hello', 5) },
  func5: (data: any) => { return data.split(' ') },
  func6: (data: any) => { return data.split(/[,!?]/) },
  func7: (data: any) => { return data.split('',4) },
  func8: (data: any) => { return data.slice(7) },
  func9: (data: any) => { return data.slice(7, 12) },
  func10: (data: any) => { return data.slice(-6) },
  func11: (data: any) => { return data.toUpperCase() },
  func12: (data: any) => { return data.toLowerCase() },
  func13: (data: any) => { return data.trim() },
  func14: (data: any) => { return data.trimLeft() },
  func15: (data: any) => { return data.trimRight() },
  func16: (data: any) => { return Object.keys(data) },
  func17: (data: any) => { return Object.values(data) },
  func18: (data: any) => { return Object.entries(data) },
};