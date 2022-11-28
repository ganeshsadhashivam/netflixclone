import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import profileImage from "../../public/netflixprofile.jpg";
import { useAuth } from "../common/auth";

import {
  useProfilesContext,
  useProfilesDispatchContext,
} from "../common/profiles-context";
import { UserProfile } from "../common/types";

export default function ProfileMenu() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  const userProfiles = useProfilesContext();
  const dispatch = useProfilesDispatchContext();

  const currentProfile = userProfiles?.profiles.find(
    (profile) => profile.id === userProfiles.selectedProfileId
  );

  const [showMenu, setShowMenu] = useState(false);
  const profileMenuContainer = useRef<HTMLElement>(null);
  const timerId = useRef(0);
  function onMouseEnter() {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    setShowMenu(true);
  }

  function onMouseExit() {
    timerId.current = setTimeout(() => {
      setShowMenu(false);
    }, 300);
  }

  useEffect(() => {
    profileMenuContainer.current?.addEventListener("mouseenter", onMouseEnter);
    profileMenuContainer.current?.addEventListener("mouseleave", onMouseExit);
    return () => {
      profileMenuContainer.current?.removeEventListener(
        "mouseenter",
        onMouseEnter
      );
      profileMenuContainer.current?.removeEventListener(
        "mouseleave",
        onMouseExit
      );
    };
  }, []);

  async function signOutOfNetflix() {
    await signOut();
    dispatch({ type: "load", payload: null });
    navigate("/login");
  }

  function loadProfile(profile: UserProfile) {
    dispatch({ type: "current", payload: profile });
    window.location.reload();
  }

  return (
    <section ref={profileMenuContainer} className="relative">
      <section className="flex items-center gap-2">
        <img
          className="h-10 w-10 rounded-md"
          src={currentProfile?.imageUrl}
          alt=""
        />
        <ChevronDownIcon
          style={{ strokeWidth: ".2rem" }}
          className={`h-6 w-6 transition-transform duration-200 ${
            showMenu ? "rotate-180" : ""
          }`}
        />
      </section>
      {showMenu ? (
        <ul className="absolute  top-[60px] -left-24 flex w-[200px] flex-col gap-4 bg-dark px-4 py-2">
          {userProfiles?.profiles
            .filter((profile) => profile.id !== currentProfile?.id)
            ?.map((profile) => (
              <li
                className="flex cursor-pointer items-center gap-2 hover:underline"
                key={profile.id}
                onClick={() => loadProfile(profile)}
              >
                <img
                  className="h-8 w-8"
                  src={profile.imageUrl}
                  alt={profile.name}
                />
                {profile.name}
              </li>
            ))}

          <li
            className={
              userProfiles?.profiles.length ?? 0 > 1
                ? "-mx-4 border-t border-t-gray-500 px-4 py-2"
                : ""
            }
          >
            <Link className="hover:underline" to="/ManageProfiles">
              Manage Profile
            </Link>
          </li>
          <li>Transfer Profile</li>
          <li>Account</li>
          <li>Help Center</li>
          <li
            onClick={signOutOfNetflix}
            className="-mx-4 cursor-pointer border-t border-t-gray-500 px-4 py-2 hover:underline"
          >
            Sign out of Netflix
          </li>
        </ul>
      ) : null}
    </section>
  );
}
