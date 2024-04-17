export default function Loading({placeholder}){
    return(
  <div className="w-full h-full fixed top-0 left-0 flex flex-col space-x-2 justify-center items-center bg-white h-screen white:invert  opacity-85 z-50">
  <span className='mb-2'>{placeholder}</span>
  <div className='flex'>
  	<div className='h-8 w-8 bg-black mr-2 rounded-full animate-bounce z-100 [animation-delay:-0.3s]'></div>
	<div className='h-8 w-8 bg-black mr-2 rounded-full animate-bounce z-100 [animation-delay:-0.15s]'></div>
	<div className='h-8 w-8 bg-black rounded-full animate-bounce z-100'></div>
    </div>
  </div>

    )
}