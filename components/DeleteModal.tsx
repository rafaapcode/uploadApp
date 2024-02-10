"use client";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";

export function DeleteModal() {
    const { user } = useUser();
    const [isDeleteModalOpen, setIsDeleteModalOpen, fileId] = useAppStore((state) => [
        state.isDeleteModalOpen,
        state.setIsDeleteModalOpen,
        state.fileId
    ]);

    async function deleteFile() {
        if (!user || !fileId) return;
        const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

        const toastId = toast.loading("Deletando arquivo");

        try {
            deleteObject(fileRef).then(async () => {
                deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
                    toast.success("Deletado com sucesso !!", {
                        id: toastId
                    });
                });
            }).finally(() => {
                setIsDeleteModalOpen(false);
            })
        } catch (error) {
            setIsDeleteModalOpen(false);
            toast.error("Erro ao deletar o arquivo", {
                id: toastId
            })
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
                    <DialogTitle>Excluir arquivo</DialogTitle>
                    <DialogDescription>
                        Deseja realmente excluir este arquivo ?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex space-x-2 py-3">
                    <Button size="sm" className="px-3 flex-1" variant={"ghost"} onClick={() => setIsDeleteModalOpen(false)}>
                        <span className="sr-only">Cancelar</span>
                        <span>Cancelar</span>
                    </Button>
                    <Button type="submit" size="sm" className="px-3 flex-1" variant={"destructive"} onClick={() => deleteFile()}>
                        <span className="sr-only">Excluir</span>
                        <span>Excluir</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
