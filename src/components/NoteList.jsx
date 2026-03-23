import React from "react";
import useFirestore from "../hooks/useFirestore";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function NoteList() {
    let { id } = useParams();
    let { getCollection } = useFirestore();
    let {
        error,
        data: notes,
        loading,
    } = getCollection("notes", ["bookUid", "==", id]);

    return (
        !!notes.length &&
        notes.map((note) => (
            <div className="border-2 shadow-md p-3 my-3">
                <div className="flex space-x-3">
                    <img src="" alt="" className="w-12 h-12 rounded-full" />
                    <div>
                        <h3>Eric Rebillet</h3>
                        <div className="text-gray-400">
                            {moment(note?.date?.seconds * 1000).fromNow()}
                        </div>
                    </div>
                </div>
                <div className="mt-3">{note.body}</div>
            </div>
        ))
    );
}
