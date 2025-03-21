import Loading from "@/components/loadingOverlay"
import AddInfo from "@/components/AdditionalInfoModal"
import Layout from "@/components/layout";
import {useState} from "react";
export default function LoadingPage(){
    const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [filestatus,setStatus]=useState("")
   //for showing the add infon modal
  function handleStatus(){
    setFeedbackModalOpen(true);
  }
    return(
        <>

      <div className="flex justify-between mt-6">
        <button
          onClick={()=>{ setStatus("rejected")
            handleStatus(true)
            }}
          className="bg-main-blue text-white font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          Reject
        </button>
        <button
          onClick={()=>{
            setStatus("approved")
            handleStatus(true)
           } }
          className="bg-main-blue text-white font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          Accept
        </button>
      </div>
        {/* <Loading/> */}
        <AddInfo   isOpen={isFeedbackModalOpen}
     onClose={() => setFeedbackModalOpen(false)}
     status={filestatus}/>

        </>
    )
}
LoadingPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
  