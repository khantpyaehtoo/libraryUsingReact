import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";

export default function NoteForm() {
    let { id } = useParams();
    let [body, setBody] = useState("");

    let { addCollection } = useFirestore();

    let addNote = async (e) => {
        e.preventDefault();
        let data = {
            body,
            bookUid: id,
        };
        await addCollection("notes", data);
        setBody("");
    };

    return (
        <form onSubmit={addNote}>
            <textarea
                className="bg-gray-50 w-full shadow-md border-2 p-3"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                cols="30"
                rows="5"
            ></textarea>
            <button
                type="submit"
                className="text-white bg-primary px-3 py-2 rounded-lg my-3 flex items-center gap-2 cursor-pointer"
            >
                <span>Add Note</span>
            </button>
        </form>
    );
}
