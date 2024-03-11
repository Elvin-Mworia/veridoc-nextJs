import Image from "next/image";
import { useRouter } from 'next/navigation'
export default function Layout({ children }) {
 const router = useRouter()
  return (
    <div className="bg-transparent-blue/20 h-screen">
      <div className="flex h-16 items-center w-full p-6 bg-white">
        <Image
          className=""
          width={50}
          height={50}
          src="/veridoc2.webp"
          alt="Veridoc Log"
        />
        <div className="ml-5" onClick={()=>router.push('/')} >
          <h1 className="text-3xl font-bold text-secondary-blue" >Veridoc</h1>
          <p className="text-sm text-alt-blue">
            Decentralizing Trust: Fairness for All
          </p>
        </div>
        <p className="ml-auto mr-3 underline text-main-blue">Alfred Tuva</p>
        <a href="/" className="bg-main-blue rounded px-5 py-1 text-white">
          Log Out
        </a>
      </div>

      <main className="px-6">{children}</main>
    </div>
  );
}
