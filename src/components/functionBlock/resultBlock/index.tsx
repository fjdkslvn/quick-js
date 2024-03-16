const ResultBlock: React.FC<{ resultData: string }> = ({resultData}) => {

  return (
    <>
      <div className="w-full mt-4">
        <div className="bg-slate-700 w-full h-9 rounded-t-lg px-4 py-2 text-sm text-slate-300 font-medium">console</div>
        <div className="bg-slate-800 w-full min-h-24 rounded-b-lg px-4 py-2 text-sm text-slate-50 font-medium">
          {resultData}
        </div>
      </div>
    </>
  );
};

export default ResultBlock;