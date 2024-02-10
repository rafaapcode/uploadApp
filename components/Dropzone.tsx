"use client";
import { db, storage } from '@/firebase';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import DropzoneComponent from 'react-dropzone'
import toast from 'react-hot-toast';

export default function DropZone() {

    const [loading, setLoading] = useState<boolean>(false);
    const {isLoaded, isSignedIn, user} = useUser();

    const uploadPost = async (selectedFile: File) => {
        if(loading) return;
        if(!user) return;

        setLoading(true);
        const toastId = toast.loading("Enviando arquivo...");
        // Criando um Documento (tabela) dentro da coleção (banco de dados) chamada USERS
        // O nome do documento será FILES, onde o ID é gerado automaticamente e os arquivos são os que estão no OBJ.
        const docRef = await addDoc(collection(db, "users", user.id, "files"), {
            userId: user.id,
            filename: selectedFile.name,
            fullName: user.fullName,
            profileImg: user.imageUrl,
            timestamp: serverTimestamp(),
            type: selectedFile.type,
            size: selectedFile.size
        });

        // Criando uma referência para o meu arquivo dentro do storage.
        const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

        // Acessando a referência e enviando o arquivo para o STORAGE
        await uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
            const downloadURL = await getDownloadURL(imageRef);

            // Aqui ele está atualizando os dados no Banco de Dados ( Firestore );
            await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
                downloadURL,
            });
        });
        toast.success("Arquivo enviado !!", {
            id: toastId
        });
        setLoading(false);
    }

    const onDrop = (acceptedFile: File[]) => {
        acceptedFile.forEach((file: File) => {
            const reader = new FileReader();

            reader.onabort = () => console.log("Leitura do arquivo foi abortada !");
            reader.onerror = () => console.log("Leitura do arquivo falhou !");
            reader.onload = async () => {
                await uploadPost(file);
            };
            reader.readAsArrayBuffer(file);
        });
    };
    const maxSize = 20971520;
    return (
        <DropzoneComponent minSize={0} maxFiles={maxSize} onDrop={onDrop}>
            {({ getRootProps, isDragActive, isDragReject, fileRejections }) => {
            const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

            return (
            <section className='mt-4'>
                <div {...getRootProps()}  className={cn(
                    "w-full max-w-[90%] mx-auto h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center",
                    isDragActive ? "bg-[#035FFE]/80 text-white animate-pulse" : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
                )}>
                    {!isDragActive && "Clique aqui ou arraste um arquivo para upload !"}
                    {isDragActive && !isDragReject && "Arraste um arquivo para upload !"}
                    {isDragReject && "Tipo de arquivo não aceito , tente outro tipo !"}
                    {isFileTooLarge && (
                        <div className='text-danger mt-2'>
                            Arquivo muito grande.
                        </div>
                    )}
                </div>
            </section>
            )}}
        </DropzoneComponent>
    )
}