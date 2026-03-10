import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";

import lightIcon from "../assets/light.svg";
import darkIcon from "../assets/dark.svg";
import useSignOut from "../hooks/useSignOut";

export default function Navbar() {
    let [search, setSearch] = useState("");
    let navigate = useNavigate();

    let handleSearch = (e) => {
        navigate("/?search=" + search);
    };

    let { signOutFunc } = useSignOut();

    let signOutUser = async () => {
        signOutFunc();
        navigate("/login");
    };

    let { changeTheme, isDark } = useTheme();

    return (
        <nav
            className={`border border-b-1 ${isDark ? "bg-dbg border-b-primary" : "bg-white border-b-dark"}`}
        >
            <ul className="flex justify-between items-center p-3 max-w-6xl mx-auto">
                <li className="flex items-center gap-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="search books.."
                        className="outline-none px-2 py-1 rounded-lg bg-white"
                    />
                    <button
                        onClick={handleSearch}
                        className="text-white bg-primary px-3 py-1 rounded-2xl flex items-center gap-2"
                    >
                        <span className="hidden md:block">Search</span>
                    </button>
                </li>

                <Link
                    to="/"
                    className="flex items-center gap-3 md:-ml-32 cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                        />
                    </svg>

                    <span className="text-2xl font-bold text-primary hidden md:block">
                        Book Store
                    </span>
                </Link>

                <li className="flex gap-3 items-center list-none">
                    {/* create book */}
                    <Link
                        to="/create"
                        className="text-white bg-primary px-3 py-2 rounded-2xl flex items-center gap-2 cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>

                        <span className="hidden md:block">Create book</span>
                    </Link>
                    {/* profile image */}
                    <div>
                        {(isDark && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="white"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                />
                            </svg>
                        )) || (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="black"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                />
                            </svg>
                        )}
                    </div>
                    <div className="cursor-pointer">
                        {isDark && (
                            <img
                                src={lightIcon}
                                className="w-8"
                                onClick={() => changeTheme("light")}
                            />
                        )}
                        {!isDark && (
                            <img
                                src={darkIcon}
                                className="w-8"
                                onClick={() => changeTheme("dark")}
                            />
                        )}
                    </div>
                    <div>
                        <button
                            onClick={signOutUser}
                            className="bg-red-600 text-white rounded-xl px-2 py-2 text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </li>
            </ul>
        </nav>
    );
}
