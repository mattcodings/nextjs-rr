"use client";

import { useState, useEffect } from "react";
import { getUserInfoFromRumble1 } from "@/lib/actions";
import TextBoxes from "@/components/TextBoxes";

const RumbleTwo = () => {
  const [userList, setUserList] = useState({});
  const [loading, setLoading] = useState(true);
  const [eliminatedNumbers, setEliminatedNumbers] = useState([]); // Track eliminated numbers as an array

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfoFromRumble1('2');
      setLoading(false);
      if (data?.users) {
        setUserList(data.users);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!userList || Object.keys(userList).length === 0) return <p>No data found.</p>;

  // ✅ Create a mapping of numbers to associated colors
  const numberToColors = {};

  Object.entries(userList).forEach(([userName, userData]) => {
    userData.picks.forEach((num) => {
      if (!numberToColors[num]) {
        numberToColors[num] = [];
      }
      if (userData.colors?.bg) {
        numberToColors[num].push(userData.colors.bg);
      }
    });
  });

  console.log("Eliminated Numbers:", eliminatedNumbers); // Debugging log

  return (
    <div>
      <div>
        <ul className="flex flex-wrap gap-x-5 justify-center">
          {Object.entries(userList).map(([userName, userData]) => (
            <li
              key={userName}
              style={{
                backgroundColor: userData.colors?.bg || "#fff",
                color: userData.colors?.text || "#000",
                padding: "5px",
                marginBottom: "5px",
                borderRadius: "5px",
              }}
              className="text-center text-[26px] w-[165px]"
            >
              <strong className="block text-[30px]">{userName}</strong>
              {userData.picks.map((num, index) => (
                <span
                  key={`${userName}-${num}-${index}`} // Unique key
                  className={eliminatedNumbers.includes(Number(num)) ? "line-through opacity-30" : "text-[32px]"}
                >
                  {index > 0 ? ", " : ""}{num}
                </span>
              ))}
            </li>
          ))}
        </ul>
      </div>
      <TextBoxes numberToColors={numberToColors} eliminatedNumbers={eliminatedNumbers} setEliminatedNumbers={setEliminatedNumbers} />
    </div>
  );
};

export default RumbleTwo;
