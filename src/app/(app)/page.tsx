import Terminal from "../components/Treminal/Terminal";
import Header from "../components/Header/Header";

export default function Home() {

  return (
    <main className="p-4">
      <Header/>
      <div className="p-4"><Terminal/></div>
    </main>
  );
}
