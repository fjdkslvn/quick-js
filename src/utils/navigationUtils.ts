// 해시 업데이트
export const updateHash = (hash: string) => {
  history.pushState(null, "", hash);
  const hashChangeEvent = new Event("hashchange");
  window.dispatchEvent(hashChangeEvent);
};
