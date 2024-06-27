import ContactListItem from './contactListItem/contactListItem';
import MainPanel from '../details/mainPanel';


export default function mapMainPanel() {
  return (
  <div className='flex justify-center items-center'>
    <div className='flex justify-between w-11/12'>
   

        {MainPanel.map((panel, index) => (
        <ContactListItem
          key={index}  
          post={panel.post}
          infoLink={panel.infoLink}
          path={panel.path}
          name={panel.name}
          degree={panel.degree}
          contactNo={panel.contactNo}

        />
      ))}
      </div>
     </div>
  
  )
}
