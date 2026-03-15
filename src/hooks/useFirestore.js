import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
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

    // get Document
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
    let addCollection = async (colName, data) => {
        let ref = collection(db, colName);
        return addDoc(ref, data);
    };

    // delete document
    let deleteDocument = async (colName, id) => {
        let ref = doc(db, colName, id);
        return deleteDoc(ref);
    };

    // update document
    let updateDocument = (colName, id, data) => {
        let ref = doc(db, colName, id);
        return updateDoc(ref, data);
    };

    return {
        getCollection,
        getDocument,
        addCollection,
        deleteDocument,
        updateDocument,
    };
}
