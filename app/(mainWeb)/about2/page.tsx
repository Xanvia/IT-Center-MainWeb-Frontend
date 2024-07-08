import React from 'react';
import Pictures from '../about2/components/pic/pictures';
import Contacts from './components/card/cardcont';
import Directers from './components/directers/directers'


const Home: React.FC = () => {
  return (
    <div className='bg-white'>
      <Pictures
          imageUrl="/aboutus2img/aboutus.jpg"
          heading="About Us"
          description="Some essay samples below are by students who chose to write about a challenge, 
          while other examples may be helpful if you’re looking to write about yourself more generally. 
          And yes, a few of these essays did help these students get accepted into the Ivy League, 
          (I’m not telling you which!) though these are all great essays regardless of where (or if) 
          students were admitted to their top choice school."
        />
      <Directers/>
    </div>
       
    
   
  );
};

export default Home;

//<Contacts/>