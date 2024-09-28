"use client";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Maps from "../components/Maps";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import Navbar from "@/components/Navbar";

import userAtom from "@/atoms/userAtom";
import UploadReport from "@/components/UploadReport";

export default function Home() {
  const user = useRecoilValue(userAtom);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [uploadReport, setUploadReport] = useState(true);

  useEffect(() => {
    setMounted(true); // Mark that the component has mounted on the client
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      // Redirect if the user is not authenticated and the component is mounted
      router.push("/authentication");
    }
  }, [mounted, user, router]);

  if (!mounted) {
    // Avoid rendering anything until the component is mounted on the client
    return null;
  }

  function uploadStateReport() {
    setUploadReport(!uploadReport);
  }

  return (
    <div>
      <Navbar/>
      {user ? (
        <>
          <Sidebar />
          <div className="h-[100vh] pl-20">
            {uploadReport ? <Maps place="" /> : <UploadReport />}
          </div>
          <button
            className="fixed justify-center right-10 bottom-10 md:py-4 py-2 px-8 rounded bg-red-600 text-white"
            onClick={uploadStateReport}
          >
            {uploadReport ? "Report" : "Go back"}
          </button>
        </>
      ) : null}
    </div>
  );
}
