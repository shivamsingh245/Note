import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const [noteList, setNoteList] = useState([]);
    const [pending, setPending] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const [selectedColors, setSelectedColors] = useState({});

    return <GlobalContext.Provider value={{ formData, setFormData, noteList, setNoteList, pending, setPending, isEdit, setIsEdit, selectedColors, setSelectedColors }}>{children}</GlobalContext.Provider>
}