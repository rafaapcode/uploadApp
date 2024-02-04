import DropZone from "@/components/Dropzone";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";

export default async function Dashboard() {
    const { userId } = auth();
    const docsResults = await getDocs(collection(db, "users",userId!, "files"));
    const skeletonFiles: FileType[] = docsResults.docs.map((doc) => ({
        id: doc.id,
        filename: doc.data().filename || doc.id,
        timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
        fullName: doc.data().fullName,
        downloadURL: doc.data().downloadURL,
        size: doc.data().size,
        type: doc.data().type
    }));

    return (
        <div className="border-t">
            <DropZone />

            <section className="container space-y-5">
                <h2 className="font-bold">Todos os arquivos</h2>
                <div>
                    {/* <TableWrapper skeletonFile={skeletonFiles}/> */}
                </div>
            </section>
        </div>
    )
}