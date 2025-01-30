'use client'
import User from "@/components/User";
import { useRef, useState } from "react";
import { addUserInfoToRumble1 } from "@/lib/actions";

const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap
  }
  return shuffled;
};

export default function Home() {
  const formRef = useRef(null); // Reference to form

  const handleSubmit = async (collection) => {
    if (!formRef.current) return;
    try {
      const formData = new FormData(formRef.current);
      await addUserInfoToRumble1(formData, collection);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const [people, setPeople] = useState(()=> shuffleArray(['Kasey','Jo','Matt','Becca','Peter','Rachael','Parker','Luke','Tyler','Nick','Dan','Hannah','Kyle','Sean','Jeff','Josh','Danny','AJ','Kelton','Someone']));
  const [num1, setNum1] = useState(1)
  const [num2, setNum2] = useState(2)
  const [num3, setNum3] = useState(3)
  const numOfPeople = 20
  const colors = [['#ffffff', '#000000'],
  ['#000000', '#ffffff'],
  ['#ff0000', '#ffffff'],
  ['#00ff00', '#000000'],
  ['#0000ff', '#ffffff'],['#ff00ff', '#000000'],['#ffff00', '#000000'],['#00ffff', '#000000'],['#3333FF', '#000000'],['#33FF33', '#000000'],['#33A1FF', '#000000'],['#8CFF33', '#000000'],['#FF8C33', '#000000'],['#F5FF33', '#000000'],['#33FFF5', '#000000'],['#A133FF', '#000000'],['#FF33A1', '#000000'],['#3357FF', '#000000'],['#33FF57', '#000000'],['#FF5733', '#000000'],]
  
  return (
  <form 
    ref={formRef} 
    className="mt-8 bg-[url('bgimg.png')] bg-cover bg-center bg-no-repeat min-h-screen p-8 pb-20"
  >
    {/* Ensure grid can expand dynamically */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-[500px] items-center">
      {Array.from({ length: numOfPeople }, (_, index) => {
        const person = people[index];
        const incrementedNum1 = num1 + index * 3;
        const incrementedNum2 = num2 + index * 3;
        const incrementedNum3 = num3 + index * 3;
        return (
          <User 
            key={index} 
            userNumber={index + 1} 
            person={person} 
            num1={incrementedNum1} 
            num2={incrementedNum2} 
            num3={incrementedNum3} 
            colors={colors[index]} 
          />
        );
      })}
    </div>

    {/* Buttons Section */}
    <div className="flex flex-col md:flex-row justify-around gap-4 w-full mt-10">
      <button 
        type="button" 
        className="border-8 p-5 border-black w-full md:w-96 rounded-[100px] text-[50px] font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
        onClick={() => handleSubmit("1")}
      >
        Rumble 1
      </button>
      <button 
        type="button" 
        className="border-8 p-5 border-black w-full md:w-96 rounded-[100px] text-[50px] font-bold bg-gradient-to-r from-red-500 to-purple-500 text-white"
        onClick={() => handleSubmit("2")}
      >
        Rumble 2
      </button>
    </div>
  </form>
);

}
