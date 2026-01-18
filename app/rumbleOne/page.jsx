"use client";

import { useRef } from "react";
import { useState, useEffect } from "react";
import { getUserInfoFromRumble1 } from "@/lib/actions";
import TextBoxes from "@/components/TextBoxes";

const DEFAULT_ELIMINATION_SOUND = "/sounds/hbk.m4a";
const SEAN_ELIMINATION_SOUND = "/sounds/sean.m4a";
const WINNER_SOUND = "/sounds/winner.m4a";
const RumbleOne = () => {
  // 🔹 All hooks first
  
  const [userList, setUserList] = useState({});
  const [loading, setLoading] = useState(true);
  const [eliminatedNumbers, setEliminatedNumbers] = useState([]);
  const [enteredNumbers, setEnteredNumbers] = useState([]);
  const [muted, setMuted] = useState(false);
  const [showEliminated, setShowEliminated] = useState(true);

  const eliminatedUsersRef = useRef(new Set());
  const audioRef = useRef(null);
  const winnerPlayedRef = useRef(false);

useEffect(() => {
  audioRef.current = new Audio();
}, []);

  // 🔹 Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfoFromRumble1("1");
      setLoading(false);
      if (data?.users) {
        setUserList(data.users);
      }
    };
    fetchData();
  }, []);

  // 🔹 Detect full elimination and play sound
  useEffect(() => {
  if (!userList || eliminatedNumbers.length === 0) return;

  const newlyEliminatedUsers = [];

  Object.entries(userList).forEach(([userName, userData]) => {
    const allPicksEliminated = userData.picks.every((pick) =>
      eliminatedNumbers.includes(Number(pick))
    );

    if (
      allPicksEliminated &&
      !eliminatedUsersRef.current.has(userName)
    ) {
      eliminatedUsersRef.current.add(userName);
      newlyEliminatedUsers.push(userName);
    }
  });

  newlyEliminatedUsers.forEach((userName, index) => {
    setTimeout(() => {
      const isSean = userName.toLowerCase() === "sean";

      audioRef.current.src = isSean
        ? SEAN_ELIMINATION_SOUND
        : DEFAULT_ELIMINATION_SOUND;

      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }, index * 600);
  });
}, [eliminatedNumbers, userList]);

useEffect(() => {
  if (!userList || winnerPlayedRef.current) return;

  const totalUsers = Object.keys(userList).length;

  const eliminatedCount = Object.entries(userList).filter(
    ([_, userData]) =>
      userData.picks.every((pick) =>
        eliminatedNumbers.includes(Number(pick))
      )
  ).length;

  // When only ONE player remains
  if (eliminatedCount === totalUsers - 1) {
    winnerPlayedRef.current = true;

    setTimeout(() => {
      audioRef.current.src = WINNER_SOUND;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }, 800); // small dramatic delay
  }
}, [eliminatedNumbers, userList]);



  // 🔹 Early return after hooks
  if (loading) return <p>Loading...</p>;
  if (!userList || Object.keys(userList).length === 0) return <p>No data found.</p>;

  // 🔹 Normal variables
  const numberToColors = {};
  Object.entries(userList).forEach(([userName, userData]) => {
    userData.picks.forEach((num) => {
      if (!numberToColors[num]) numberToColors[num] = [];
      if (userData.colors?.bg) numberToColors[num].push(userData.colors.bg);
    });
  });

  const activeNumbers = enteredNumbers.map((_, index) => index + 1);

  const visibleUsers = Object.entries(userList).filter(
  ([_, userData]) => {
    const hasActivePick = userData.picks.some(
      (pick) =>
        activeNumbers.includes(Number(pick)) &&
        (!eliminatedNumbers.includes(Number(pick)) || showEliminated)
    );

    if (showEliminated) return hasActivePick;

    // hide player ONLY if ALL picks are eliminated
    const allEliminated = userData.picks.every((pick) =>
      eliminatedNumbers.includes(Number(pick))
    );

    return !allEliminated && hasActivePick;
  }
);


  // 🔹 Render JSX
  return (
    <div className="mt-8 bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('wwe-ring.jpg')] bg-cover bg-center bg-no-repeat min-h-screen p-8 pb-20">
      <div className="flex justify-center mb-4">
  <button
    onClick={() => setShowEliminated((prev) => !prev)}
    className="px-4 py-2 bg-black text-white rounded"
  >
    {showEliminated ? "Hide Eliminated" : "Show Eliminated"}
  </button>
</div>

      <div>
        {visibleUsers.length > 0 && (
          <ul className="flex flex-wrap gap-x-5 justify-center">
            {visibleUsers.map(([userName, userData]) => (
              <li
                key={userName}
                style={{
                  backgroundColor: userData.colors?.bg || "#fff",
                  color: userData.colors?.text || "#000",
                  padding: "5px",
                  marginBottom: "5px",
                  borderRadius: "5px",
                }}
                className="text-center text-[26px] w-[165px] opacity-80 border-white border-2"
              >
                <strong className="block text-[30px]">{userName}</strong>
                {userData.picks
  .map(Number)
  .filter((num) => activeNumbers.includes(num))
  .map((num, index) => {
    const isEliminated = eliminatedNumbers.includes(num);

    return (
      <span
        key={`${userName}-${num}`}
        className={
          isEliminated
            ? "line-through opacity-30"
            : "bg-black text-white text-[32px]"
        }
      >
        {index > 0 ? ", " : ""}
        {num}
      </span>
    );
  })}


              </li>
            ))}
          </ul>
        )}
      </div>

      <TextBoxes
        numberToColors={numberToColors}
        eliminatedNumbers={eliminatedNumbers}
        setEliminatedNumbers={setEliminatedNumbers}
        enteredNumbers={enteredNumbers}
        setEnteredNumbers={setEnteredNumbers}
        showEliminated={showEliminated}
      />

    </div>
  );
};


export default RumbleOne;
