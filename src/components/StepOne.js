import {  useDispatch,useSelector } from "react-redux";
import { updateCaseStation } from "../../store/caseSlice/caseStation";
import { updateCaseRank } from "../../store/caseSlice/caseRank";
import { updateCaseDivision} from "../../store/caseSlice/caseDivision";
import {useState,useEffect} from "react"
import axios from 'axios'

export default function StepOne({ nextStep, formData, handleChange }) {
 const CourtRank=["Supreme Court","Court of Appeal","High Court","Employment and Labour Relation Court","Environment and Land Court","Magistrate Court","Kadhi Court","Tribunal","Small Court Claims"]
 const CourtDivision=["Court Annexed Mediation","Anticorruption","Civil","Commercial and Tax","Family","Criminal","Constitution and Human Rights","Judicial Review"]
//const CourtRank={0:"Supreme Court",1:"Court of Appeal",2:"High Court",3:"Employment and Labour Relation Court",4:"Environment and Land Court",5:"Magistrate Court",6:"Kadhi Court",7:"Tribunal",8:"Small Court Claims"}
// console.log(Object.values(CourtRank));
const[station,setStations]=useState([]);
const dispatch=useDispatch();
const {courtRank}=useSelector((state)=>(state.rank))
const {courtStation}=useSelector((state)=>(state.station))
const {courtDivision}=useSelector((state)=>(state.division))
async function getAllStations(){
  try{
let res=await axios.get("http://127.0.0.1:5001/station/getAllStationFolders")
if(res.status===200){
  setStations(res.data.folders)
}
  }catch(err){
    console.log(err)
  }
}
useEffect(()=>{
  getAllStations()
},[])
  return (
    <div className="p-10">
      <h1 className="font-bold text-secondary-blue text-2xl">File New Case</h1>

      <div className="w-4/6 mx-auto bg-white rounded p-5">
        <h2 className="text-center text-secondary-blue">Case Details</h2>

        {/* Categories section */}
        {/* Put categories section here */}
        <div className="mb-4">
          <label
            htmlFor="courtRank"
            className="block font-bold text-sm mb-2 text-gray-700"
          >
            Court Rank
          </label>
          <select
            className="block bg-transparent-blue/20 w-full p-2 border border-blue-300 rounded-md shadow-sm focus:border-main-blue focus:ring focus:ring-main-blue focus:ring-opacity-50"
            id="courtRank"
            name="courtRank"
            value={courtRank}
            onChange={(e)=>dispatch(updateCaseRank({courtRank:e.target.value}))}
          >
            <option value="">Pick Court Rank</option>
            {
              CourtRank.map((key,index)=>{
                return(
                  <>
                  <option value={key}>{key}</option>
                  </>
                )
              })
            }
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="courtStation"
            className="block font-bold text-sm mb-2 text-gray-700"
          >
            Court Station
          </label>
          <select
            className="block bg-transparent-blue/20 w-full p-2 border border-blue-300 rounded-md shadow-sm focus:border-main-blue focus:ring focus:ring-main-blue focus:ring-opacity-50"
            id="courtStation"
            name="courtStation"
            value={courtStation}
            onChange={(e)=>dispatch(updateCaseStation({courtStation:e.target.value}))}
          >
            <option value="">Pick Court Station</option>
            {
              station.map((stationName,index)=>(
                <>
                  <option value={stationName.name} key={index}>{stationName.name}</option>

                </>
              )

              )
            }
            
                 
             
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="courtDivision"
            className="block font-bold text-sm mb-2 text-gray-700"
          >
            Court Division
          </label>
          <select
            className="block bg-transparent-blue/20 w-full p-2 border border-blue-300 rounded-md shadow-sm focus:border-main-blue focus:ring focus:ring-main-blue focus:ring-opacity-50"
            id="courtDivision"
            name="courtDivision"
            value={courtDivision}
            onChange={(e)=>dispatch(updateCaseDivision({courtDivision:e.target.value}))}
          >
          <option value="">Pick Court Division</option>
            {
              CourtDivision.map((key,index)=>{
                return(
                  <>
                  <option value={key}>{key}</option>
                  </>
                )
              })
            }
          </select>
        </div>

        {/* <div className="mb-4">
          <label
            htmlFor="caseCategory"
            className="block font-bold text-sm mb-2 text-gray-700"
          >
            Case Category
          </label>
          <select
            className="block bg-transparent-blue/20 w-full p-2 border border-blue-300 rounded-md shadow-sm focus:border-main-blue focus:ring focus:ring-main-blue focus:ring-opacity-50"
            id="caseCategory"
            name="caseCategory"
            value={formData.caseCategory}
            onChange={handleChange}
          >
            <option value="">Pick Case Category</option>
            <option value="property">Property</option>
            <option value="contract">Contract</option>
            <option value="tort">Tort</option>
          </select>
        </div> */}

        {/* <div className="mb-4">
          <label
            htmlFor="caseType"
            className="block font-bold text-sm mb-2 text-gray-700"
          >
            Case Type
          </label>
          <select
            className="block bg-transparent-blue/20 w-full p-2 border border-blue-300 rounded-md shadow-sm focus:border-main-blue focus:ring focus:ring-main-blue focus:ring-opacity-50"
            id="caseType"
            name="caseType"
            value={formData.caseType}
            onChange={handleChange}
          >
            <option value="">Pick Case Type</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            <option value="type3">Type 3</option>
          </select>
        </div> */}

        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={nextStep}
            className="bg-main-blue text-white font-semibold px-4 py-2 rounded hover:bg-main-blue-dark focus:outline-none focus:ring-2 focus:ring-main-blue focus:ring-opacity-50 transition ease-in-out duration-150"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
