import { useParams } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import useFirestore from "../hooks/useFirestore";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

export default function BookDetail() {
    let { id } = useParams();
    let { getDocument } = useFirestore();
    let { error, data: book, loading } = getDocument("books", id);
    let { isDark } = useTheme();

    return (
        <div className="h-screen">
            {error && <p>{error}</p>}
            {loading && <p>loading ... </p>}
            {book && (
                <>
                    <div
                        className={`grid grid-cols-2 ${isDark ? "text-white" : ""}`}
                    >
                        <div>
                            <img src={book.cover} alt="" className="w-[80%]" />
                        </div>
                        <div className="space-y-4">
                            <h1 className="font-bold text-3xl">{book.title}</h1>
                            <div className="space-x-2">
                                {book.categories.map((category) => (
                                    <span
                                        className="bg-blue-500 text-white rounded-full text-sm px-2 py-1"
                                        key={category}
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                            <p>{book.description}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-primary my-3">
                            My Notes
                        </h3>
                        <NoteForm />
                        <NoteList />
                    </div>
                </>
            )}
        </div>
    );
}
