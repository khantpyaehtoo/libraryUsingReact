import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/config";

export default function useSignOut() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signOutFunc = async () => {
        try {
            setLoading(true);
            let res = await signOut(auth);
            setError("");
            setLoading(false);
            return res.user;
        } catch (e) {
            setLoading(false);
            setError(e.message);
        }
    };

    return { error, loading, signOutFunc };
}
