import ContactListItem from './contactListItem/contactListItem';
import Director from '../details/director';


export default function mapDirector() {
  return (
    <div className='flex justify-center items-center p'>
         

      {Director.map((director, index) => (
          <ContactListItem
            key={index} 
            post={director.post}
            infoLink={director.infoLink}
            path={director.path}
            name={director.name}
            degree={director.degree}
            contactNo={director.contactNo}
  
          />
        ))}
  
    </div>
  )
}
