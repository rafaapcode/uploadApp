"use client";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

export function DeleteModal() {
    const { user } = useUser();
    const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] = useAppStore((state) => [
        state.isDeleteModalOpen,
        state.setIsDeleteModalOpen,
        state.fileId,
        state.setFileId
    ]);

    async function deleteFile() {
        if (!user || !fileId) return;
        const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

        try {
            deleteObject(fileRef).then(async () => {
                console.log("Deleted File");

                deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
                    console.log("Deleted");
                });
            }).finally(() => {
                setIsDeleteModalOpen(false);
            })
        } catch (error) {
            console.error(error);
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <Dialog
            open={isDeleteModalOpen}
            onOpenChange={(isOpen) => {
                setIsDeleteModalOpen(isOpen);
            }}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex space-x-2 py-3">
                    <Button size="sm" className="px-3 flex-1" variant={"ghost"} onClick={() => setIsDeleteModalOpen(false)}>
                        <span className="sr-only">Cancelar</span>
                        <span>Cancelar</span>
                    </Button>
                    <Button type="submit" size="sm" className="px-3 flex-1" variant={"ghost"} onClick={() => deleteFile()}>
                        <span className="sr-only">Excluir</span>
                        <span>Excluir</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
