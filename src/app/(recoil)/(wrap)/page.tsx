import Link from "next/link";

export default function Home() {

  return (
    <div className="grid place-items-center">
      <div className="max-w-screen-xl w-full grid place-items-center p-10">
        <h1 className="font-bold text-4xl">자바스크립트를 쉽고 빠르게 사용해보세요!</h1>
        <p className="mt-6 text-gray-600 dark:text-gray-300">기본 문법부터 내장 함수의 활용까지 당신에게 도움이 될 수 있는 모든 것을 지원하려고 합니다.</p>
        <p className="mt-6 text-gray-600 dark:text-gray-300">개발시 자주 사용하는 내장함수를 즐겨찾기해서 빠르게 사용할 수 있어요!</p>
        <Link className="rounded-lg text-base px-7 py-3 bg-neutral-950 text-white mt-10 hover:bg-neutral-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-100" href="/docs/string">
          시작하기
        </Link>
      </div>
    </div>
  );
}