import ContactListItem from './contactListItem/contactListItem';

import Instructors from '../details/instructors';



export default function mapInstructors() {
  return (
    <div> 
    <div className='flex justify-center items-center'>
      <div className='flex justify-between w-11/12'>

        {Instructors.map((instructor, index) => (
            <ContactListItem
              key={index}  
              post={instructor.post}
              infoLink={instructor.infoLink}
              path={instructor.path}
              name={instructor.name}
              degree={instructor.degree}
              contactNo={instructor.contactNo}

            />
          ))}
      </div>

    </div>
    </div>
  )
}
