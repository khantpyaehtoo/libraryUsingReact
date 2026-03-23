import trashIcon from "../assets/trash.svg";
import useFirestore from "../hooks/useFirestore";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function NoteList() {
    let { id } = useParams();
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
                        <div onClick={() => deleteNote(note.id)}>
                            <img
                                className="cursor-pointer"
                                src={trashIcon}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="mt-3">{note.body}</div>
                </div>
            </div>
        ))
    );
}
