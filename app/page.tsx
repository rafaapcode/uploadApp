import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">
        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
          <h1 className="text-5xl font-bold">
            Bem-Vindo. <br />
            <br />
            Armazene tudo o que você e seu negócio precisa. Tudo em um só lugar
          </h1>

          <p className="pb-20">
            Melhore seu armazenamento pessoal , usando este APP, oferecendo uma maneira simples e eficiente de Upload,
            organização e acesso a arquivos de qualquer lugar.
            Armazene com segurança documento e mídias importantes, e experimente uma maneira fácil de gerenciar e compartilhar seus arquivos.
          </p>

          <Link href="/dashboard" className="flex cursor-pointer bg-blue-500 p-5 w-fit">
            Tente gratuitamente !
            <ArrowRight className="ml-10"/>
          </Link> 
        </div>
        <div className="bg-[#1E1919] dark:bg-slate-800 w-full h-full p-10">
          <Image src="/cloudImage.jpg" alt="cloud image concept" width={800} height={800} className="object-cover rounded-lg"/>
        </div>
      </div>
    </main>
  );
}
