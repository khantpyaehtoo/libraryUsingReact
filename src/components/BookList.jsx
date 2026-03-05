import React, { useEffect, useState } from "react";
import book from "../assets/book.png";
import { Link, useLocation } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { db } from "../firebase";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";

import edit from "../assets/edit.svg";
import trash from "../assets/trash.svg";

export default function BookList() {
    let [error, setError] = useState("");
    let [books, setBooks] = useState([]);
    let [loading, setLoading] = useState(false);

    useEffect(function () {
        setLoading(true);
        let ref = collection(db, "books");
        let q = query(ref, orderBy("date", "desc"));
        getDocs(q).then((docs) => {
            if (docs.empty) {
                setError("no documents found");
                setLoading(false);
            } else {
                let books = [];
                // console.log(docs);
                docs.forEach((doc) => {
                    let book = { id: doc.id, ...doc.data() };
                    books.push(book);
                });
                // console.log(books);
                setBooks(books);
                setLoading(false);
                setError("");
            }
        });
    }, []);

    const deleteBook = async (e, id) => {
        e.preventDefault();
        console.log("book id" + id);
        // delete firestore doc
        let ref = doc(db, "books", id);
        // backend delete
        await deleteDoc(ref);
        // frontend delete
        setBooks((prev) => prev.filter((b) => b.id !== id));
    };

    if (error) {
        return <p>{error}</p>;
    }

    let { isDark } = useTheme();

    return (
        <div>
            {loading && <p>loading ... </p>}
            {/* bookList */}
            {!!books && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-3">
                    {books.map((b) => (
                        <Link to={`/books/${b.id}`} key={b.id}>
                            <div
                                className={`p-4 border border-1 min-h-[420px] ${isDark ? "bg-dcard border-primary text-white" : ""}`}
                            >
                                <img src={book} alt="" />

                                <div className="text-center space-y-2 mt-3">
                                    <h1>{b.title}</h1>
                                    <p>{b.description}</p>

                                    {/* genres */}
                                    <div className="flex flex-wrap">
                                        {b.categories.map((c) => (
                                            <span
                                                key={c}
                                                className="mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-primary"
                                            >
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex space-x-5 justify-end">
                                        <Link to={`/edit/${b.id}`}>
                                            <img src={edit} alt="" />
                                        </Link>
                                        <img
                                            src={trash}
                                            alt=""
                                            onClick={(e) => deleteBook(e, b.id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            {books && !books.length && (
                <p className="text-center text-2xl text-gray-500">
                    No Search Result Found!
                </p>
            )}
        </div>
    );
}
