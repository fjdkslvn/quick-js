const ResultBlock: React.FC<{ resultData: string }> = ({resultData}) => {

  return (
    <>
      <div className="w-full mt-4">
        <div className="bg-slate-700 w-full h-9 rounded-t-lg px-4 py-2 text-sm text-slate-300 font-medium">return</div>
        <p className="break-all bg-slate-800 w-full min-h-24 rounded-b-lg px-6 pt-4 pb-6 text-sm text-slate-50 font-medium">
          {resultData}
        </p>
      </div>
    </>
  );
};

export default ResultBlock;