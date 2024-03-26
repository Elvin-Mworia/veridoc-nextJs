import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios"


function AddFileModal({ isOpen, onClose,scenario,userfiles}) {
  let courtstation;
  const {role,walletAddress}=useSelector((state) => state.userInfo);
  const [fileData, setFileData] = useState({
    fileType: "",
    caption: "",
    file: null,
    caseId:""
  });
  const [courtName,setCourtName]=useState("");
  if(role==="staff"){
    const {station}=useSelector((state) => state.staffStation);
    courtstation=station;
  }
 
  //get the name of a court provided is stationId
 function getCourtName(stationId){
  axios.post("http://localhost:5001/station/getStation",{stationId}).then(res=>{
    if(res.status===200){  
      setCourtName(res.data.message);
      }
  }).catch((err)=>{
    console.log(err);
  })

 }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFileData({ ...fileData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFileData({
      ...fileData,
      file: e.target.files[0],
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    let res;
    // onAddFile(fileData);
    if(scenario==="subsequent" && role==="staff"){
   res= await axios.post("http://127.0.0.1:5001/cases/uploadsubsequentfile",{walletAddress,station:courtstation,filetype:fileData.fileType,file:fileData.file,caseId:fileData.caseId},{headers: {
    'Content-Type': 'multipart/form-data'
  }})
}
  if(scenario==="subsequent" && role==="normalUser"){
    let file=userfiles.filter(x=>x.caseId===fileData.caseId);
    console.log(file);
    getCourtName(file[0].stationId);
    res= await axios.post("http://127.0.0.1:5001/cases/uploadsubsequentfile",{walletAddress,station:courtName,filetype:fileData.fileType,file:fileData.file,caseId:fileData.caseId},{headers: {
     'Content-Type': 'multipart/form-data'
   }})
  }
  if(res.status!==200){
    alert(res.data.message);
  }else{
    alert(res.data.message);
  }
    
    onClose();
    setFileData({ fileType:"",caption:"",file:null,caseId:""})
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-5 rounded-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="fileType"
              className="block text-main-blue font-semibold"
            >
              File Type
            </label>
            <select
              name="fileType"
              id="fileType"
              value={fileData.fileType}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              {role==="staff"?<> <option value="">Select a file type</option>
              <option value="Judgement">Judgement</option>
              <option value="Ruling">Ruling</option>
              <option value="Mention">Mention</option>
            </>:<>
              <option value="">Select a file type</option>
              <option value="Petition">Petition</option>
              <option value="Motion">Motion</option>
              <option value="Complaint">Complaint</option>
              <option value="Reply">Reply</option>
              <option value="Affidavit">Affidavit</option>
              <option value="Support Affidavit">Further Supporting Affidavit</option>
              <option value="other">Other</option>
              </>}
            
            </select>
          </div>
{role==="staff" ? <>  <div>
            <label
              htmlFor="caseId"
              className="block text-main-blue font-semibold"
            >
              Case Id
            </label>
            <input
              type="text"
              name="caseId"
              id="caseId"
              value={fileData.caseId}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
</> :<>{scenario==="subsequent"? <><label
              htmlFor="caseId"
              className="block text-main-blue font-semibold"
            >
              Case Id
            </label>
<select
              name="caseId"
              id="caseId"
              value={fileData.caseId}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            ><option value="">Select a case</option>
               {
          userfiles.length>0?userfiles.map((file,index)=>{
                return(
                  <>
                   <option value={file.caseId}>{file.caseId}</option>
                  </>
                )
              }): <option value="">No cases</option>
            }
            </select></>:<></>}  </>}
          <div>
            <label
              htmlFor="caption"
              className="block text-main-blue font-semibold"
            >
              Caption
            </label>
            <input
              type="text"
              name="caption"
              id="caption"
              value={fileData.caption}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="file"
              className="block text-main-blue font-semibold"
            >
              File
            </label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={handleFileChange}
              className="mt-1 block w-full"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-main-blue text-white px-4 py-2 rounded hover:bg-main-blue-dark"
            >
              Upload File
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default AddFileModal;
