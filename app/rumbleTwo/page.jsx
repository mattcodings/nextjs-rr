"use client";

import { useRef } from "react";
import { useState, useEffect } from "react";
import { getUserInfoFromRumble1 } from "@/lib/actions";
import TextBoxes from "@/components/TextBoxes";
const RumbleOne = () => {
  // 🔹 All hooks first
  const [userList, setUserList] = useState({});
  const [loading, setLoading] = useState(true);
  const [eliminatedNumbers, setEliminatedNumbers] = useState([]);
  const [enteredNumbers, setEnteredNumbers] = useState([]);
  const [muted, setMuted] = useState(false);

  const eliminatedUsersRef = useRef(new Set());
  const audioRef = useRef(new Audio("/sounds/hbk.m4a"));

  // 🔹 Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfoFromRumble1("2");
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
      if (allPicksEliminated && !eliminatedUsersRef.current.has(userName)) {
        eliminatedUsersRef.current.add(userName);
        newlyEliminatedUsers.push(userName);
      }
    });

    newlyEliminatedUsers.forEach((userName, index) => {
      setTimeout(() => {
        if (!muted) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }
      }, index * 500);
    });
  }, [eliminatedNumbers, userList, muted]);

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

  const visibleUsers = Object.entries(userList).filter(([_, userData]) =>
    userData.picks.some((pick) => activeNumbers.includes(Number(pick)))
  );

  // 🔹 Render JSX
  return (
    <div className="mt-8 bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('wwe-ring.jpg')] bg-cover bg-center bg-no-repeat min-h-screen p-8 pb-20">
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
                {userData.picks.map((num, index) => (
                  <span
                    key={`${userName}-${num}-${index}`}
                    className={
                      eliminatedNumbers.includes(Number(num))
                        ? "line-through opacity-30"
                        : "bg-black text-white text-[32px]"
                    }
                  >
                    {index > 0 ? ", " : ""}
                    {num}
                  </span>
                ))}
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
      />
    </div>
  );
};


export default RumbleOne;
