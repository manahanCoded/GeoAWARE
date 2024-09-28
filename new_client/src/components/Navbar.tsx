"use client";

import { useEffect, useState } from "react";

import { uploadReportDB } from "@/configure/inputReports";

const Navbar = () => {
  const [crimeData, setCrimeData] = useState<uploadReportDB[]>([]);
  const [crimeName, setCrimeName] = useState<string>();
  const [sumData, setSumData] = useState<number>();
  useEffect(() => {
    async function getCrimeSum() {
      const res = await fetch("http://localhost:5000/api/map/crime-layout");
      if (!res) {
        alert("Error no data found");
        throw new Error("Error fetching Data");
      }
      const data = await res.json();
      setCrimeData(data);
    }
    getCrimeSum();
  });

  function showSum(e: React.MouseEvent<HTMLButtonElement>) {
    const checkSum = crimeData.filter(
      (crime) => crime.crime === e.currentTarget.id
    );
    setCrimeName(e.currentTarget.id)
    setSumData(checkSum.length);
  }

  return (
    <nav className="relative md:top-3">
      <div className="flex sticky h-0 w-full inset-x-0  z-[1] transition-all pl-20">
        <div className="flex items-center w-full flex-row flex-wrap md:mt-0  md:pl-80 mt-14 px-3">
          <div className="mr-4 mb-2">
            <button
              id="robbery"
              onClick={showSum}
              className="bg-white rounded px-4 py-1 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
            >
              Robbery
            </button>
            <div className="absolute lg:top-10 md:top-20 top-36">
              {!sumData ? (
                <div className=" bg-white rounded px-4 py-1 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                Total  {crimeName}: {sumData}
              </div>
              ) : (
                <div className=" bg-white rounded px-4 py-1 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                Total {crimeName}: {sumData}
                </div>
              )}
            </div>
          </div>
          <div className="mr-4 mb-2">
            <button
              id="assault"
              onClick={showSum}
              className="bg-white rounded px-4 py-1 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
            >
              Assault
            </button>
          </div>
          <div className="mr-4 mb-2">
            <button
              id="theft"
              onClick={showSum}
              className="bg-white rounded px-4 py-1 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
            >
              Theft
            </button>
          </div>
          <div className="mr-4 mb-2">
            <button
              id="vandalism"
              onClick={showSum}
              className="bg-white rounded px-4 py-1 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
            >
              Vandalism
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
