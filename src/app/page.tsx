import { LibraryProvider } from "@/context/LibraryContext";
import { LibraryDashboard } from "@/components/LibraryDashboard";

export default function Home() {
  return (
    <LibraryProvider>
      <LibraryDashboard />
    </LibraryProvider>
  );
}
