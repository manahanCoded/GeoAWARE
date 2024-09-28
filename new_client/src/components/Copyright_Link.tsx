import { Link } from "@nextui-org/react";
const Copyright_Link = () => {
  return (
    <Link href="/copyright" className="fixed bottom-0 left-1 z-[1000] h-10 ">
        <span className="flex text-xs p-1  bg-slate-100">&copy;DionDEV</span>
    </Link>
  );
};

export default Copyright_Link;
