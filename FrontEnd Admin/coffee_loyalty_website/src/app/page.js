import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NavBar />
    </main>
  );
}

function NavBar() {
  return (
    <nav className="w-full flex-row items-center justify-between fixed bg-slate-500">
      <Image src="/coffee_logo.png" alt="logo" width={100} height={100} />
      <h1>Coffee Loyalty</h1>
      <AdminLogin />
    </nav>
  );
}

function AdminLogin() {
  return (
    <div>
      <button>Sign In</button>
    </div>
  );
}
