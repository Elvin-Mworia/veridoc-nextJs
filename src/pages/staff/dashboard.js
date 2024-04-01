import Layout from "@/components/layout";
import { useSelector ,useDispatch} from "react-redux";
import { useEffect,useState} from "react";
import axios from "axios"
import dayjs from "dayjs"
import AddFileModal from "@/components/AddFileModal";
import Link from "next/link";
import { updateCaseId } from "../../../store/caseSlice/caseId";

export default function Dashboard() {
  const {walletAddress}=useSelector((state)=>state.userInfo)
  const {station}=useSelector((state)=>state.staffStation)
  const [pendingApproval,setpendingApproval]=useState([])
  const [pendingCasesCount,setPendingCaseCount]=useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const dispatch=useDispatch();

async  function fetchPengingApproval(){
    let res=await axios.post("http://127.0.0.1:5001/cases/getpendingfiles",{walletAddress,station})
    console.log(res.data);
    setpendingApproval(res.data.message);
    setPendingCaseCount(res.data.message.length);
  }

function unixToDate(timestamp){
  const dateObject = dayjs.unix((Number(timestamp)/1000));
 return( dateObject.format("DD MMM YYYY,HH:mm"))
}
const handleAddFile = (fileData) => {
  const updatedFiles = [...formData.files, fileData]; // Assuming `files` field in your formData
  setFormData({ ...formData, files: updatedFiles });
};
  useEffect(()=>{
    fetchPengingApproval();
    console.log(pendingApproval);
  },[])
  return (
    <div className=" flex  p-3 mt-10">
      {/* Table Section */}
      <div className="w-3/4 mx-auto mt-1">
        <h1 className="text-2xl font-bold text-main-blue mb-10">
          Filed Cases To Approved By The Registry of {station}
        </h1>
        <table class="text-left text-sm font-light w-full">
          <thead class="border font-medium bg-main-blue text-white border-white">
            <tr>
              <th scope="col" class="border px-6 py-4">
                Case Id
              </th>
              <th scope="col" class="border px-6 py-4">
                Date
              </th>
              <th scope="col" class="border px-6 py-4">
                Status
              </th>
              <th scope="col" class="border px-6 py-4">
                Document
              </th>
            </tr>
          </thead>
          <tbody className="bg-white border border-main-blue">
            {pendingApproval.length>0 ? pendingApproval.map((file,index)=>{
              return(
                <>
                 <tr class="text-main-blue">
                 
                  <td class="border border-main-blue whitespace-nowrap px-6 py-4 font-medium">
              <Link href={`/staff/case/${file.caseId}`} onClick={()=>dispatch(updateCaseId({caseId:file.caseId}))}>   {file.caseId}  </Link>
             
              </td>
                
              <td class="border border-main-blue whitespace-nowrap px-6 py-4">
                {unixToDate(file.date)}
              </td>
              <td class="border border-main-blue whitespace-nowrap px-6 py-4">
                {file.status}
              </td>
              <td class="border border-main-blue whitespace-nowrap px-6 py-4"><a class="underline  hover:text-red-900">{file.txId}</a></td>
            </tr>
                </>
              )
            }) :<tr><td class="whitespace-nowrap px-6 py-4">No pending cases to be approved</td></tr>}
           
          </tbody>
        </table>
      </div>
        {/* Card Container */}
        <div className="w-1/4 mt-1 flex flex-col  items-center">
        {/* Card */}
        {/* <div className="h-36 w-auto bg-white text-main-blue rounded-[10px] m-4 shadow-md hover:shadow-blue-400">
          <div className="bg-transparent-blue/60 text-center rounded-[2px]">Total Cases</div>
          <p className="text-center p-10 text-3xl font-bold">2300</p>
        </div> */}
        <div className="h-36 w-36 bg-white text-main-blue mt-20 rounded-[10px] shadow-md hover:shadow-blue-400">
          <div className="bg-transparent-blue/60 text-center  rounded-[2px]">Pending Approval</div>
          <p className="text-center p-10 text-3xl font-bold">{pendingCasesCount}</p>
        </div>
        <button
        onClick={openModal}
          className="bg-main-blue text-white mt-10 px-3 py-2 rounded-lg"
        >
          Upload File
        </button>
      </div>
      <AddFileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddFile={handleAddFile}
      />

    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
