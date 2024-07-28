import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Footer from '../components/Footer';
// import Carousel from '../components/Carousel';
import { useAsyncError } from 'react-router-dom';

export default function Home() {

  const [search ,setSearch]=useState([]);


  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch('http://localhost:5000/api/foodData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{objectFit:"contain !important"}} data-bs-ride="carousel">
    <div className="carousel-inner" id="carousel">
        <div className="carousel-caption" style={{zIndex:"10"}}>
        <div className="d-flex justify-content-center">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
        {/* <button className="btn btn-outline-success text-white" type="submit">Search</button> */}
      </div>
        </div>
      <div className="carousel-item active">
        <img  src="https://loremflickr.com/1920/1440/burger" className="d-block w-100"style={{filter:"brightness(40%)"}} alt="..."/>
      </div>
      <div className="carousel-item">
        <img  src="https://loremflickr.com/1920/900/colddrink" className="d-block w-100"style={{filter:"brightness(40%)"}} alt="..."/>
      </div>
      <div className="carousel-item">
        <img  src="https://loremflickr.com/1900/900/pastry" className="d-block w-100"style={{filter:"brightness(40%)"}} alt="..."/>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>

      </div>
      <div className="container">
  {foodCat.length > 0
    ? foodCat.map((data) => (
        <div key={data._id} className="row mb-3">
          
            <div className="fs-3 m-3">{data.CategoryName}</div>
            <hr />
            {foodItem.length > 0
              ? foodItem
                  .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLocaleString())) 
                  .map((filterItems) => (
                    <div key={filterItems._id}className="col-12 col-md-6 col-lg-3">
                      {/* Content for filterItems */}
                      <Card foodName={filterItems.name}
                      options={filterItems.options[0]}
                      imgsrc={filterItems.img}
                      descriptions={filterItems.description}
                      />
                    </div>
                  ))
              : <div>No Such Data Found</div>}
          
        </div>
      ))
    : ''}
</div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
