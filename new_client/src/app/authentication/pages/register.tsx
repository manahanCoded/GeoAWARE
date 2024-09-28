"use client";

import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  duration,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "@/atoms/authAtom";
import { useRouter } from "next/navigation";
import Maps from "@/components/Maps";

const Register = () => {
  const router = useRouter();
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        console.error("Login failed with status:", res.status);
        alert("Register Email is already taken.")
        return;
      }

      if (data.error) {
        alert("Error, try again");
      }
      localStorage.setItem("userInfo", JSON.stringify(data));
      alert("Registered Successful");
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="h-screen ">
        <Maps place="" />
      </div>
      <div className="fixed inset-0 bg-transparent z-50">
        <div className=" md:w-1/2 lg:w-1/3 m-auto rounded-xl bg-slate-100">
          <CssBaseline />
          <Box
            sx={{
              borderRadius: "var(--radius)",
              background: "white",
              paddingX: "1rem",
              paddingTop: "1rem",
              paddingBottom: "2rem",
              marginTop: "2px",
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              mt: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="w-full  bg-white flex justify-center">
              <img className="h-32" src="/img/logo2.png" alt="" />
            </div>
            <Typography variant="h5">Register</Typography>
            <Box sx={{ mt: 3 }}>
              <form onSubmit={handleRegister} method="POST">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      className="bg-white rounded"
                      name="username"
                      required
                      fullWidth
                      label="Username"
                      autoFocus
                      value={inputs.username}
                      onChange={(e) =>
                        setInputs({ ...inputs, username: e.target.value })
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      className="bg-white rounded"
                      required
                      fullWidth
                      label="Email Address"
                      type="email"
                      name="email"
                      value={inputs.email}
                      onChange={(e) =>
                        setInputs({ ...inputs, email: e.target.value })
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      className="bg-white rounded"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      value={inputs.password}
                      onChange={(e) =>
                        setInputs({ ...inputs, password: e.target.value })
                      }
                    />
                  </Grid>
                </Grid>

                {/* Replace button with Material-UI Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="error"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
              </form>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  Already have an account?
                  <Link href="/authentication" passHref
                      onClick={() => setAuthScreen("login")}
                      className="text-blue-600 hover:border-b-2 border-blue-600 "
                    >
                      {" "}
                      Login

                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Register;
