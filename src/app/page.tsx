import { connection } from "next/server";
import { LibraryProvider } from "@/context/LibraryContext";
import { LibraryDashboard } from "@/components/LibraryDashboard";

export default async function Home() {
  await connection();
  return (
    <LibraryProvider>
      <LibraryDashboard />
    </LibraryProvider>
  );
}
