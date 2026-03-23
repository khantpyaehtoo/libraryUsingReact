import { useParams } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import useFirestore from "../hooks/useFirestore";
import NoteForm from "../components/NoteForm";

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
                        <div className="border-2 shadow-md p-3 my-3">
                            <div className="flex space-x-3">
                                <img
                                    src=""
                                    alt=""
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <h3>Eric Rebillet</h3>
                                    <div className="text-gray-400">
                                        20.6.2001
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                Lorem Ipsum is placeholder or "dummy" text used
                                in design and publishing to showcase graphic
                                elements (fonts, layout) without using
                                meaningful content. Derived from Cicero’s 45 BC
                                Latin text, it is scrambled to appear as natural
                                English-like text, ensuring focus remains on
                                design, not text content.
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
