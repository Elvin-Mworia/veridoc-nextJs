import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useSelector,useDispatch} from "react-redux";
import { useState, useEffect} from 'react';
import {updateLoginState} from "../../store/userSlice/loginStatus"
import {updateuserinfo} from "../../store/userSlice/userInfo";
import { updatePayment } from "../../store/paymentSlice/payment";
import { updateCaseStation } from "../../store/caseSlice/caseStation";
import { updateCaseRank } from "../../store/caseSlice/caseRank";
import { updateCaseDivision} from "../../store/caseSlice/caseDivision";
import Template from "./template";
import Link from "next/link";
import { AnimatePresence, motion } from 'framer-motion';
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

  const {loginStatus,email}=useSelector((state)=>(state.login))
  const {firstName,lastName}=useSelector((state)=>(state.userInfo))
  //disconnects the othentkms from the widow
  async function handleDisConnect() {
    try{
    dispatch(updateLoginState({loginStatus:false,email:"",password:""}));
    dispatch(updateuserinfo({walletAddress:"",name:"",role:"",firstName:"",lastName:"",email:""}));
    dispatch(updatePayment({paid:false}))
    dispatch(updateCaseStation({courtStation:""}))
    dispatch(updateCaseRank({courtRank:""}))
    dispatch(updateCaseDivision({courtDivision:""}))

   // await  othent.disconnect();
    //console.log("Disconnect,\n", res);
  }catch(err){console.log(err)}
  };
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeIn' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <AnimatePresence mode="wait">
    <motion.div className="bg-transparent-blue/20 h-screen"
      key={router.route}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}>
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
        <Link href={"/"} className="bg-main-blue rounded px-5 py-1 text-white"
             onClick={handleDisConnect}>
          Log Out
        </Link>
      </div>

      <Template className="px-6" >{children}</Template>
    </motion.div>
    </AnimatePresence>
  );
}
