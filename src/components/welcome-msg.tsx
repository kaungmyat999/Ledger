"use client";
import { useUser } from "@clerk/nextjs";

export default function WelcomeMsg() {
  const { user, isLoaded } = useUser();
  return (
    <div className="mb-4 space-y-2 text-white">
      <h2 className="text-2xl font-medium lg:text-4xl">
        Welcome Back{isLoaded ? ", " : " "}
        {user?.firstName}👋
      </h2>
      <p className="text-sm text-slate-300 lg:text-base">
        This is your Financial Overview Report
      </p>
    </div>
  );
}
