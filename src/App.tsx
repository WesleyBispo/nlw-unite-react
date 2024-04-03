import AttendeeList from "./components/Attendee-List";
import Header from "./components/Header";

export  default function App() {
  return (
    <main className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
      <Header />
      <AttendeeList />
    </main>
  )
}