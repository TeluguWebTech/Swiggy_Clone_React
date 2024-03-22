import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { Link } from "react-router-dom";

const FirmCollections = () => {
  const [firmData, setFirmData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [activeCategory, setActiveCategory]= useState('all');

  const firmDataHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`);
      const newFirmData = await response.json();
      setFirmData(newFirmData.vendors);
    } catch (error) {
      alert("firm data not fetched");
      console.error("firm data not fetched", error);
    }
  };

  useEffect(() => {
    firmDataHandler();
  }, []);

  const filterHandler = (region, category) => {
    setSelectedRegion(region);
    setActiveCategory(category)
  };

  return (
    <>
      <h3>Restaurants with online food delivery in Hyderabad</h3>
      <div className="filterButtons">
        <button onClick={() => filterHandler("All", 'all')} className={activeCategory === 'all' ? 'activeButton': ''}>All</button>
        <button onClick={() => filterHandler("South-Indian" , 'south-indian')} className={activeCategory === 'south-indian' ? 'activeButton': ''} >South-Indian</button>
        <button onClick={() => filterHandler("North-Indian", 'north-indian')} className={activeCategory === 'north-indian' ? 'activeButton': ''} >North-Indian</button>
        <button onClick={() => filterHandler("Chinese", 'chinese')} className={activeCategory === 'chinese' ? 'activeButton': ''} >Chinese</button>
        <button onClick={() => filterHandler("Bakery", 'bakery')} className={activeCategory === 'bakery' ? 'activeButton': ''} >Bakery</button>
      </div>
      <section className="firmSection">
        {firmData.map((apple) => {
          return apple.firm.map((item)=>{
            if(selectedRegion === "All" || 
              item.region.includes(selectedRegion.toLocaleLowerCase())
            ){
                return (
                  <Link to={`/products/${item._id}/${item.firmName}`} className="link" key={item._id}>
   <div className="zoomEffect">
   <div className="firmGroupBox">
                      <div className="firmGroup">
                        <img src={`${API_URL}/uploads/${item.image}`} alt={item.firmName} />
                        <div className="firmOffer">{item.offer}</div>
                      </div>
                      <div className="firmDetails">
                        <strong>{item.firmName}</strong>
                        <br />
                        <div className="firmArea">{item.region.join(", ")}</div>
                        <div className="firmArea">{item.area}</div>
                      </div>
                    </div>
   </div>
                  </Link>
                );
            }
            return null;
          });
        })}
      </section>
    </>
  );
};

export default FirmCollections;
