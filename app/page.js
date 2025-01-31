import Link from "next/link";

export default function Home() {
  return (
  <div

    className="mt-8 bg-[url('bgimg.png')] bg-cover bg-center bg-no-repeat min-h-screen p-8 pb-20"
  >
    <div className="flex flex-col md:flex-row justify-around gap-4 w-full mt-10">
      <Link href="/rumbleOne">
      <button 
        type="button" 
        className="border-8 p-5 border-black w-full md:w-96 rounded-[100px] text-[50px] font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
        
      >
        Rumble 1
      </button>
      </Link>
      <Link href="/rumbleOne">
      <button 
        type="button" 
        className="border-8 p-5 border-black w-full md:w-96 rounded-[100px] text-[50px] font-bold bg-gradient-to-r from-red-500 to-purple-500 text-white"
        
      >
        Rumble 2
      </button>
      </Link>
    </div>
  </div>
);

}
