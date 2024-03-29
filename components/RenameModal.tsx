'use client';

import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "./ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import toast from "react-hot-toast";

export default function RenameModal() {
    const { user } = useUser();
    const [input, setInput] = useState("");

    const [isRenameModalOpen, setIsRenameModalOpen, fileId, setFileId, filename] = useAppStore((state) => [
        state.isRenameModalOpen,
        state.setIsRenameModalOpen,
        state.fileId,
        state.setFileId,
        state.filename
    ]);

    const renameFile = async () => {
        if(!user || !fileId) return;

        const toasId = toast.loading("Renomeando...");

        await updateDoc(doc(db, "users", user.id, "files", fileId), {
            filename: input
        })
        toast.success("Renomeado com Sucesso !", {
            id: toasId
        });
        setInput("");
        setIsRenameModalOpen(false);
    };

    return (
        <Dialog
            open={isRenameModalOpen}
            onOpenChange={(isOpen) => {
                setIsRenameModalOpen(isOpen);
            }}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="pb-2">Renomear arquivo</DialogTitle>
                    <Input id="link" defaultValue={filename} onChange={(e) => setInput(e.target.value)} onKeyDownCapture={(e) => {
                        if(e.key === "Enter") {
                            renameFile();
                        }
                    }}/>
                </DialogHeader>
                <div className="flex space-x-2 py-3">
                    <Button size="sm" className="px-3 flex-1" variant={"ghost"} onClick={() => setIsRenameModalOpen(false)}>
                        <span className="sr-only">Cancelar</span>
                        <span>Cancelar</span>
                    </Button>
                    <Button type="submit" size="sm" className="px-3 flex-1" variant={"ghost"} onClick={() => renameFile()}>
                        <span className="sr-only">Renomear</span>
                        <span>Renomear</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
};