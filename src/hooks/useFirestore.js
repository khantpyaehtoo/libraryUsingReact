import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";

export default function useFirestore() {
    // get collection
    let getCollection = (colName) => {
        let [error, setError] = useState("");
        let [data, setData] = useState([]);
        let [loading, setLoading] = useState(false);

        useEffect(function () {
            setLoading(true);
            let ref = collection(db, colName);
            let q = query(ref, orderBy("date", "desc"));
            onSnapshot(q, (docs) => {
                if (docs.empty) {
                    setError("no documents found");
                    setLoading(false);
                } else {
                    let collectionDatas = [];
                    docs.forEach((doc) => {
                        let document = { id: doc.id, ...doc.data() };
                        collectionDatas.push(document);
                    });
                    setData(collectionDatas);
                    setLoading(false);
                    setError("");
                }
            });
        }, []);

        return { error, data, loading };
    };

    let getDocument = (colName, id) => {
        let [error, setError] = useState("");
        let [data, setData] = useState(null);
        let [loading, setLoading] = useState(false);

        useEffect(() => {
            setLoading(true);
            let ref = doc(db, colName, id);
            onSnapshot(ref, (doc) => {
                if (doc.exists()) {
                    let document = { id: doc.id, ...doc.data() };
                    setData(document);
                    setLoading(false);
                    setError("");
                } else {
                    setError("no document found");
                    setLoading(false);
                }
            });
        }, [id]);

        return { error, data, loading };
    };

    // add collection
    let addCollection = () => {};

    // delete document
    let deleteDocument = () => {};

    // update document
    let updateDocument = () => {};

    return {
        getCollection,
        getDocument,
        addCollection,
        deleteDocument,
        updateDocument,
    };
}
