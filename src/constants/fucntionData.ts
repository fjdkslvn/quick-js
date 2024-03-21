export interface FuncData {
  [key: string] : (data: any[]) => void;
}

export const functionData: FuncData = {
  func1: (data: any[]) => { return data.map((obj, idx) => ({...obj, index : idx})) },
  func2: (data: any[]) => { return data.map((obj) => (obj.id === 1 ? {...obj, name:'박철수'} : obj)) },
  func3: (data: any[]) => { return data.filter((obj) => obj.id !== 1) },
  func4: (data: any[]) => { return data.find((obj) => obj.id === 1) },
};