"use client";
import { RecoilRoot } from "recoil"; // Import RecoilRoot

function RecoilContextProvider({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

export default RecoilContextProvider;
