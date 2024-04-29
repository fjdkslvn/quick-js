import { useQuery } from 'react-query';
import { getSideToDocs } from "@/services/sideMenu";

const fetchSideToDocs = async () => {
  try {
    const data = await getSideToDocs();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch side to docs');
  }
};

export const useSideToDocs = () => {
  return useQuery(["sideToDocs"], fetchSideToDocs, {
    staleTime: 600000, // 데이터가 10분 동안 캐시됨
    cacheTime: 600000, // 데이터가 캐시에 유지되는 시간: 10분
    refetchOnMount: false, // 컴포넌트 마운트 시에는 데이터를 다시 불러오지 않음
    refetchOnWindowFocus: false, // 창 포커스 시에는 데이터를 다시 불러오지 않음
    refetchInterval: false // 주기적으로 데이터를 다시 불러오지 않음
  });
};
