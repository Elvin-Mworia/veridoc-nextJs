import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useSelector,useDispatch} from "react-redux";
import { useState, useEffect } from 'react';
import {updateLoginState} from "../../store/userSlice/loginStatus"
import {updateuserinfo} from "../../store/userSlice/userInfo";
export default function Layout({ children }) {
 const router = useRouter()
 const dispatch=useDispatch()
 const [isWindowAvailable, setIsWindowAvailable] = useState(false);
  let othent;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWindowAvailable(true);
       // Import the connect function only after window is available
       import('@othent/kms').then((module) => {
       othent= module
      });
    }else{
      setIsWindowAvailable(false);

    }
  }, [isWindowAvailable]);

  const {loginStatus}=useSelector((state)=>(state.login))
  const {name}=useSelector((state)=>(state.userInfo))
  //disconnects the othentkms from the widow
  async function handleDisConnect() {
    dispatch(updateLoginState({loginStatus:false}));
    dispatch(updateuserinfo({walletAddress:"",name:"",role:""}));
    const res = await  othent.disconnect();
    console.log("Disconnect,\n", res);
  };


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
        <p className="ml-auto mr-3 underline text-main-blue">{name}</p>
        <a href="/" className="bg-main-blue rounded px-5 py-1 text-white"
             onClick={handleDisConnect}>
          Log Out
        </a>
      </div>

      <main className="px-6">{children}</main>
    </div>
  );
}
