import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex h-16 items-center w-full p-6">
        <Image
          className=""
          width={50}
          height={50}
          src="/veridoc2.webp"
          alt="Veridoc Log"
        />
        <div className="ml-5">
          <h1 className="text-3xl font-bold text-secondary-blue">Veridoc</h1>
          <p className="text-sm text-alt-blue">
            Decentralizing Trust: Fairness for All
          </p>
        </div>
        <a
          href="/signup"
          className="bg-main-blue rounded px-5 py-1 text-white ml-auto"
        >
          Sign Up
        </a>
      </div>
      <div className="grow flex justify-center items-center">
        <div className="w-4/6 h-4/6 bg-transparent-blue/60 rounded flex justify-center items-center">
          <div className="w-4/6 h-4/6 flex flex-col justify-center">
            <input
              type="text"
              name="Email"
              id="email"
              className="w-full p-2 rounded text-main-blue placeholder:text-main-blue my-3 focus:outline-main-blue"
              placeholder="Email"
            />
            <input
              type="password"
              className="w-full p-2 rounded text-main-blue placeholder:text-main-blue my-3 focus:outline-main-blue"
              placeholder="Password"
            />
            <div className="flex justify-between my-3 items-center">
              <button className="bg-main-blue text-white py-2 w-2/6 rounded">
                Login
              </button>
              <a href="#" className="text-sm underline text-main-blue">
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
