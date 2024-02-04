"use client";
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import DropzoneComponent from 'react-dropzone'

export default function DropZone() {

    const [loading, setLoading] = useState<boolean>(false);
    const {isLoaded, isSignedIn, user} = useUser();

    const uploadPost = async (selectedFile: File) => {
        if(loading) return;
        if(!user) return;

        setLoading(true);

        

        setLoading(false);
    }

    const onDrop = (acceptedFile: File[]) => {
        acceptedFile.forEach((file) => {
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
        <DropzoneComponent minSize={0} maxFiles={maxSize} onDrop={acceptedFiles => console.log(acceptedFiles)}>
            {({ getRootProps, getInputProps, isDragActive, isDragReject, fileRejections }) => {
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