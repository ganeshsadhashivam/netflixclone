import React, { FormEvent, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import netflixLogo from "../assets/Netflix_Logo_PMS.png";
import { useAuth } from "../common/auth";
export default function Registration() {
  const { signUp, user } = useAuth();
  const navigate = useNavigate();

  async function registerUser(event: React.SyntheticEvent) {
    const { email, password } = event.target as typeof event.target & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };
    event.preventDefault();
    const user = await signUp(email.value, password.value);
    if (user) {
      navigate("/login");
    }

    console.log(email.value, password.value);
  }

  return (
    <>
      <header className="relative z-[1] w-56">
        <img className="h-full w-full" src={netflixLogo} alt="Netflix Logo" />
      </header>
      <main>
        <section
          className={`absolute top-0 -z-[1] min-h-screen w-full bg-[url("../../public/netflixxbg.jpg")] bg-cover`}
        ></section>
        <section className="from absolute inset-0 bg-gradient-to-b from-zinc-900/50"></section>
        <form
          onSubmit={registerUser}
          className="relative mx-auto  w-[350px] rounded-r-lg bg-black/75 p-16"
        >
          <article className="text-gray-300">
            <h1 className="mb-4 text-4xl text-white">Sign Up</h1>
            <section className="flex flex-col gap-4">
              <input
                className="rounded-md bg-zinc-500 p-2  outline-none"
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
              />
              <input
                className="rounded-md bg-zinc-500 p-2  outline-none"
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
              />
              <button className=" my-8 rounded-md bg-netflixRed p-2 font-semibold text-white outline-none">
                Sign Up
              </button>
            </section>
            <p>
              Already have an account?{" "}
              <Link className="text-white" to="/login">
                Sign in now
              </Link>
            </p>
          </article>
        </form>
      </main>
    </>
  );
}
