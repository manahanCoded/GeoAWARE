import HistoryIcon from "@mui/icons-material/History";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TuneIcon from "@mui/icons-material/Tune";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";

import { useEffect, useState } from "react";
import { uploadReportDB } from "@/configure/inputReports";
import { user_loggedin } from "@/configure/user_loggedin";

import { useRecoilValue } from "recoil";
import userAtom from "@/atoms/userAtom";
import LogoutButton from "./LogoutButton";

interface BarState {
  display: string;
  profile?: string;
  help?: string;
  history?: string;
  color: string;
}

const Sidebar = () => {
  //Open Sidebar
  const [recentBar, setRecentBar] = useState<{
    settings: BarState;
    help: BarState;
    recent: BarState;
  }>({
    settings: {
      color: "black",
      display: "none",
      profile: "PROFILE",
    },
    help: { color: "black", display: "none", help: "HELP" },
    recent: { color: "black", display: "none", history: "HISTORY" },
  });

  const [reportedCrime, setReportedCrime] = useState<uploadReportDB[]>([]);

  const user: user_loggedin | null = useRecoilValue(userAtom);

  useEffect(() => {
    const getData = async () => {
      const url = "http://localhost:5000/api/map/crime-layout";
      try {
        const resp = await fetch(url);
        const data = await resp.json();
        setReportedCrime(data);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  const toggleRecentBar = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id as keyof typeof recentBar;

    setRecentBar((prevState) => {
      const isAlreadyOpen = prevState[id].display === "block";
      const updatedState = Object.keys(prevState).reduce((acc, key) => {
        acc[key as keyof typeof recentBar] = {
          ...prevState[key as keyof typeof recentBar],
          display: isAlreadyOpen ? "none" : key === id ? "block" : "none",
        };
        return acc;
      }, {} as typeof prevState);
      return updatedState;
    });
  };

  return (
    <>
      <div className="fixed w-20 h-full bg-zinc-100 z-[12] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
        <div className=" flex justify-center items-center h-16 border-b-2">
          <img className="" src="/img/logo.png" alt="" />
        </div>

        <div
          id="settings"
          className="mt-4 py-2 text-sm flex justify-center items-center flex-col cursor-pointer hover:bg-red-200 transition-colors"
          style={
            recentBar.settings.display == "none"
              ? { color: "black" }
              : { color: "white", backgroundColor: "red" }
          }
          onClick={toggleRecentBar}
        >
          <TuneIcon />
          <h1>Settings</h1>
        </div>
        <div
          id="help"
          className="mt-4 py-2 text-sm flex justify-center items-center flex-col cursor-pointer hover:bg-red-200 transition-colors"
          style={
            recentBar.help.display == "none"
              ? { color: "black" }
              : { color: "white", backgroundColor: "red" }
          }
          onClick={toggleRecentBar}
        >
          <HelpOutlineIcon />
          <h1>Help</h1>
        </div>
        <div
          id="recent"
          className="mt-4 py-2 text-sm flex justify-center items-center flex-col cursor-pointer hover:bg-red-200 transition-colors border-b-2"
          style={
            recentBar.recent.display == "none"
              ? { color: "black" }
              : { color: "white", backgroundColor: "red" }
          }
          onClick={toggleRecentBar}
        >
          <HistoryIcon />
          <h1>Recent</h1>
        </div>
      </div>

      {/*Options of SIDEBAR */}
      <div
        style={{ display: recentBar.settings.display }}
        className="fixed w-96 h-full  bg-zinc-100 z-[11] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] "
      >
        <div className="ml-16  px-12 pb-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          <div className="flex justify-around items-end h-28 ">
            <h1 className="text-2xl font-semibold border-red-600 border-b-4 transition-colors ">
              {recentBar.settings.profile}
            </h1>
          </div>
        </div>
        <div className="ml-16 px-12 py-4 ">
          <div className="flex flex-row justify-between items-center">
            <div className="h-[40%] w-[40%] rounded-full overflow-hidden border-2 border-red-600">
              <img src="/img/user.png" alt="" />
            </div>
            <h1>{user?.username ?? "Guest"}</h1>
          </div>
          <div className="mt-6">
            <p>
              <EmailIcon /> {user?.email}
            </p>
          </div>
          <div className="absolute right-10 bottom-10 ">
            <LogoutButton />
          </div>
        </div>
      </div>

      <div
        style={{ display: recentBar.help.display }}
        className="fixed w-96 h-full bg-zinc-100 z-[11] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] "
      >
        <div className="ml-16  px-12 pb-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          <div className="flex justify-center items-end h-28 ">
            <p className="border-red-600 border-b-4 text-2xl font-semibold ">
              {recentBar.help.help}
            </p>
          </div>
        </div>
        <div className="ml-16 px-12 mt-12">
            <h1 className="text-slate-500">Sorry Help Section is underwork. Send email to manahandionell1@gmail.com for assistance, Thank you.</h1>
        </div>
      </div>

      <div
        style={{ display: recentBar.recent.display }}
        className="fixed w-96 h-full pb-32 bg-zinc-100 z-[11] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
      >
        <div className=" ml-16 px-12 pb-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          <div className="flex justify-center items-end h-28 ">
            <p className="border-red-600 border-b-4 text-2xl font-semibold ">
              {recentBar.recent.history}
            </p>
          </div>
        </div>
        <div className=" h-full overflow-y-auto">
          {reportedCrime.map((report, index) => {
            return (
              <div className="ml-16 border-b-2 " key={index}>
                <div className="pl-12 pr-4 mt-1 py-8 bg-white rounded hover:bg-red-200">
                  <div className="flex justify-between ">
                    <h2 className="text-xl font-bold">
                      {report.capitalized_crime}
                    </h2>
                    <p className="text-xs text-zinc-400">
                      {new Date(report.event_date).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">
                      {report.lastname}, {report.firstname}
                    </p>
                  </div>

                  <p>{report.capitalized_location}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
