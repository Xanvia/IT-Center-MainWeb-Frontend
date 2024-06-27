import MapDirector from './mapDirector';
import MapMainPanel from './mapMainPanel';
import MapInstructors from './mapInstructors';


export default function ContactList() {
  return (
    <div className='w-full h-screen flex flex-col'>

      
      
      <div className='flex-grow flex flex-col justify-between'>

        {/* director */}
          <MapDirector/>
        

        {/* Main panel */}
          <MapMainPanel/>
        


        {/* Instructors */}
        <h1 className='flex justify-center items-center m-4 text-4xl '>Instructors</h1>
          <MapInstructors/>
        

      

      </div>
    </div>
  )
}
