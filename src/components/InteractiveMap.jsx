import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as IndiaMap } from '../assets/IndiaMap.svg'; // using SVGR

const stateMap = {
  'IN-AN': 'andaman-nicobar',
  'IN-AP': 'andhra-pradesh',
  'IN-AR': 'arunachal-pradesh',
  'IN-AS': 'assam',
  'IN-BR': 'bihar',
  'IN-CH': 'chandigarh',
  'IN-CT': 'chhattisgarh',
  'IN-DL': 'delhi',
  'IN-DN': 'dadra-nagar-haveli-daman-diu',
  'IN-GA': 'goa',
  'IN-GJ': 'gujarat',
  'IN-HP': 'himachal-pradesh',
  'IN-HR': 'haryana',
  'IN-JH': 'jharkhand',
  'IN-JK': 'jammu-kashmir',
  'IN-KA': 'karnataka',
  'IN-KL': 'kerala',
  'IN-LA': 'ladakh',
  'IN-LD': 'lakshadweep',
  'IN-MH': 'maharashtra',
  'IN-ML': 'meghalaya',
  'IN-MN': 'manipur',
  'IN-MP': 'madhya-pradesh',
  'IN-MZ': 'mizoram',
  'IN-NL': 'nagaland',
  'IN-OR': 'odisha',
  'IN-PB': 'punjab',
  'IN-PY': 'puducherry',
  'IN-RJ': 'rajasthan',
  'IN-SK': 'sikkim',
  'IN-TN': 'tamil-nadu',
  'IN-TG': 'telangana',
  'IN-TR': 'tripura',
  'IN-UP': 'uttar-pradesh',
  'IN-UT': 'uttarakhand',
  'IN-WB': 'west-bengal',
};

const InteractiveMap = () => {
  const navigate = useNavigate();

  const handleStateClick = (stateName) => {
    navigate(`/states/${stateName}`);
  };

  return (
    <div className="max-w-screen-md mx-auto mt-10">
      <IndiaMap
        className="cursor-pointer"
        onClick={(e) => {
          const clickedElement = e.target.closest('[id]');
          const stateId = clickedElement?.id;

          if (stateId && stateMap[stateId]) {
            handleStateClick(stateMap[stateId]);
          }
        }}
      />
    </div>
  );
};

export default InteractiveMap;
