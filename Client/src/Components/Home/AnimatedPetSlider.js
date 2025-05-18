import React from 'react';


const AnimatedPetSlider = () => {
  const serverUrl = 'http://localhost:4000'; // Server runs on port 4000 as seen in server.js

  return (
    <div className="pet-slider">
      <h2>Meet Our Lovely Pets</h2>
      <div className="pet-list">
        <div className="pet-item"><img src={`${serverUrl}/images/pet_1.jpg`} alt="Pet 1" /><p>Whiskers - Persian Cat</p></div>
        <div className="pet-item"><img src={`${serverUrl}/images/pet_2.jpg`} alt="Pet 2" /><p>Buddy - Golden Retriever</p></div>
        <div className="pet-item"><img src={`${serverUrl}/images/pet_3.jpeg`} alt="Pet 3" /><p>Luna - Siamese Cat</p></div>
        <div className="pet-item"><img src={`${serverUrl}/images/pet_4.jpg`} alt="Pet 4" /><p>Max - Labrador</p></div>
        <div className="pet-item"><img src={`${serverUrl}/images/pet_5.jpg`} alt="Pet 5" /><p>Charlie - Husky</p></div>
        <div className="pet-item"><img src={`${serverUrl}/images/pet_6.jpg`} alt="Pet 6" /><p>Bella - Ragdoll Cat</p></div>
        <div className="pet-item"><img src={`${serverUrl}/images/pet_7.jpg`} alt="Pet 7" /><p>Rocky - German Shepherd</p></div>
      </div>
    </div>
  );
};

export default AnimatedPetSlider;