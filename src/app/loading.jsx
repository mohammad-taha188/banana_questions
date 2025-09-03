export default function Loading() {
  return (
    <div className="flex my-6 justify-center min-h-screen">
      <div className="relative">
        <div className="relative w-32 h-32">
          <div className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#0ff] border-b-[#0ff] animate-spin animation-duration: 3s;"></div>

          <div className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-[#0ff] animate-spin animation-duration: 2s; animation-direction: reverse;"></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-tr from-[#0ff]/10 via-transparent to-[#0ff]/5 animate-pulse rounded-full blur-sm"></div>
      </div>
    </div>
  );
}
