// 날짜를 yyyy.MM.dd 형식으로 포맷하는 함수
export function formatDateDot(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}
  
// 날짜를 MM/dd/yyyy 형식으로 포맷하는 함수
export function formatDateSlash(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
  
// 날짜를 dd/MM/yyyy 형식으로 포맷하는 함수
export function formatDateSlashReverse(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}