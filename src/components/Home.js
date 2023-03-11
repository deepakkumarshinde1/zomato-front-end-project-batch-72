import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./base_url";
import Header from "./Header";

let Home = () => {
  const navigate = useNavigate();
  let [locationList, setLocationList] = useState([]);
  let [mealTypeList, setMealTypeList] = useState([]);

  let getLocationList = async () => {
    let url = `${BASE_URL}get-location-list`;
    let { data } = await axios.get(url);
    if (data.status === true) {
      setLocationList([...data.result]);
    } else {
      setLocationList([]);
    }
  };

  let getMealTypeList = async () => {
    let url = `${BASE_URL}get-meal-type-list`;
    let { data } = await axios.get(url);
    if (data.status === true) {
      setMealTypeList([...data.result]);
    } else {
      setMealTypeList([]);
    }
  };

  useEffect(() => {
    getLocationList();
    getMealTypeList();
  }, []);

  return (
    <>
      <main className="container-fluid">
        <section className="row main-section align-content-start justify-content-center">
          <Header />

          <section className="col-12 d-flex flex-column align-items-center justify-content-center">
            <p className="brand-name fw-bold my-lg-2 mb-0">e!</p>
            <p className="h1 text-white my-3 text-center">
              Find the best restaurants, cafés, and bars
            </p>
            <div className="search w-50 d-flex mt-3">
              <select className="form-select mb-3 mb-lg-0 w-50 me-lg-3 py-2 px-3">
                <option value="">Select Location</option>
                {locationList.map((location, index) => {
                  return (
                    <option key={index} value={location.location_id}>
                      {location.name}, {location.city}
                    </option>
                  );
                })}
              </select>
              <div className="w-75 input-group">
                <span className="input-group-text bg-white">
                  <i className="fa fa-search text-primary"></i>
                </span>
                <input
                  type="text"
                  className="form-control py-2 px-3"
                  placeholder="Search for restaurants"
                />
              </div>
            </div>
          </section>
        </section>
        <section className="row justify-content-center">
          <section className="col-10 mt-3">
            <h3 className="fw-bold text-navy">Quick Searches</h3>
            <p className="text-secondary">Discover restaurants by Searches</p>
          </section>
          <section className="col-10">
            <section className="row py-2">
              <section className="col-12 px-0 d-flex justify-content-between flex-wrap">
                {mealTypeList.map((mealType, index) => {
                  return (
                    <section
                      key={index}
                      className="px-0 d-flex border border-1 quick-search-item"
                      onClick={() => {
                        navigate(
                          "/search/" + mealType.meal_type + "/" + mealType.name
                        );
                      }}
                    >
                      <img
                        src={"/images/" + mealType.image}
                        alt=""
                        className="image-item"
                      />
                      <div className="pt-3 px-2">
                        <h4 className="text-navy">{mealType.name}</h4>
                        <p className="small text-muted">{mealType.content}</p>
                      </div>
                    </section>
                  );
                })}
              </section>
            </section>
          </section>
        </section>
      </main>
    </>
  );
};

export default Home;
