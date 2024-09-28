"use client";

import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import authScreenAtom from "@/atoms/authAtom";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import Maps from "@/components/Maps";

const Login = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const setAuthScreen = useSetRecoilState(authScreenAtom);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
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
        return;
      }

      if (data.error) {
        alert("Error, try again");
      }
      localStorage.setItem("userInfo", JSON.stringify(data));
      alert("Login Successful");
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

            <Typography variant="h5">Login</Typography>
            <Box sx={{ mt: 3 }}>
              <form onSubmit={handleLogin} method="POST">
                <Grid container spacing={2}>
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="error"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
              </form>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  Have no account?
                  <Link
                    href="/authentication"
                    onClick={() => setAuthScreen("signup")}
                    className="text-blue-600 hover:border-b-2 border-blue-600 "
                  >
                    {" "}
                    Register
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

export default Login;
