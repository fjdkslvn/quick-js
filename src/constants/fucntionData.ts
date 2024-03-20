export const linkData = [
  {
    href: '/function/array',
    label :'array',
    funcList: [
      { href: '/function/array/map', label: 'map' },
      { href: '/function/array/filter', label: 'filter' },
      { href: '/function/array/find', label: 'find' },
    ]
  }
];

export interface FuncInfo {
  title : string,
  description : string,
  func: (data: any[]) => void;
  funcText : string;
  funcType : string,
}

export interface FuncData {
  [key: string] : {[key: string]: FuncInfo[]};
}

export const functionData: FuncData = {
  array: {
    map: [
      {
        title : '객체에 요소 추가하기',
        description : '리스트 속 객체에 동일한 타입의 요소를 추가합니다.',
        func : (data: any[]) => { return data.map((obj, idx) => ({...obj, index : idx})) },
        funcText : "data.map((obj, idx) => ({...obj, index : idx}))",
        funcType : "map/addIndex",
      },{
        title : '특정 객체 수정',
        description : '리스트 속 특정 객체의 정보를 수정합니다.',
        func : (data: any[]) => { return data.map((obj) => (obj.id === 1 ? {...obj, name:'박철수'} : obj)) },
        funcText : `data.map((obj) => (obj.id === 1 ? {...obj, name:'박철수'} : obj))`,
        funcType : "map/modified",
      }
    ],
    filter: [
      {
        title : '특정 객체 제거',
        description : '리스트 속 특정 객체를 제거합니다.',
        func : (data: any[]) => { return data.filter((obj) => obj.id !== 1) },
        funcText : "data.filter((obj) => obj.id !== 1)",
        funcType : "filter/delData",
      }
    ],
    find: [
      {
        title : '특정 객체 추출',
        description : '리스트 속 특정 객체를 추출합니다.',
        func : (data: any[]) => { return data.find((obj) => obj.id === 1) },
        funcText : "data.find((obj) => obj.id === 1)",
        funcType : "find/findData",
      }
    ],
  }
};