import trashIcon from "../assets/trash.svg";
import editIcon from "../assets/edit.svg";
import moment from "moment";

import { useParams } from "react-router-dom";
import { useState } from "react";

import useFirestore from "../hooks/useFirestore";
import NoteForm from "../components/NoteForm";

export default function NoteList() {
    let { id } = useParams();
    let [editNote, setEditNote] = useState(null);

    let { getCollection, deleteDocument } = useFirestore();
    let {
        error,
        data: notes,
        loading,
    } = getCollection("notes", ["bookUid", "==", id]);

    let deleteNote = async (id) => {
        await deleteDocument("notes", id);
    };

    return (
        !!notes.length &&
        notes.map((note) => (
            <div key={note.id} className="border-2 shadow-md p-3 my-3">
                <div className="flex space-x-3 justify-between">
                    <div>
                        <img src="" alt="" className="w-12 h-12 rounded-full" />
                        <div>
                            <h3>Eric Rebillet</h3>
                            <div className="text-gray-400">
                                {moment(note?.date?.seconds * 1000).fromNow()}
                            </div>
                        </div>
                        <div>
                            <img
                                onClick={() => deleteNote(note.id)}
                                className="cursor-pointer"
                                src={trashIcon}
                                alt=""
                            />
                            <img
                                onClick={() => setEditNote(note)}
                                className="cursor-pointer"
                                src={editIcon}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        {editNote?.id !== note.id && note.body}
                        {editNote?.id === note.id && (
                            <NoteForm
                                type="update"
                                setEditNote={setEditNote}
                                editNote={editNote}
                            />
                        )}
                    </div>
                </div>
            </div>
        ))
    );
}
