import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="">
      <h1>Uploading App</h1>

      <UserButton />
    </main>
  );
}
