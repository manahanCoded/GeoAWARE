import userAtom from "@/atoms/userAtom";
import { useSetRecoilState } from "recoil";

function LogoutButton() {
  const setUser = useSetRecoilState(userAtom);

  const handleLagout = async ()=> {
    try {
      
      const res = await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", 
        });
      
      if (!res.ok) {
        console.error("Logout request failed with status:", res.status);
        throw new Error("Logout request failed");
      }

      const data = await res.json();

      if (data.error) {
        alert("Error logging out");
        console.error("Logout error:", data.error);
      } else {
        
        localStorage.removeItem("userInfo");
        setUser(null);
        alert("Logout successful");
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <button className="bg-red-600 py-1 px-4 text-white rounded" onClick={handleLagout}>
      Logout
    </button>
  );
}

export default LogoutButton;
