import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { carsFetch, fetchCars } from "../store/actions/carAction";
import CarCard from "./CarCard";

export default function Home() {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.carReducer);
  const navigate = useNavigate();
  let [loading, setLoading] = useState(true);
  const handleGoToDetail = (id) => {
    navigate(`/detail/${id}`);
  };
  useEffect(() => {
    //fetch data
    dispatch(fetchCars())
      .then((data) => {
        const sortedData = [
          ...data.filter((item) => item.promotionStatus === true),
          ...data.filter((item) => item.promotionStatus === false),
        ];
        dispatch(carsFetch(sortedData));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <div>
        <p className="font-semibold text-3xl text-center text-black bg-white p-5 mt-16">
          Beli Mobil Bekas dan Baru
        </p>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          {loading === false ? (
            //looping data
            cars.map((data) => {
              return (
                <CarCard
                  handleGoToDetail={handleGoToDetail}
                  car={data}
                  key={data.id}
                />
              );
            })
          ) : (
            <progress className="progress w-96"></progress>
          )}
        </div>
      </div>
    </div>
  );
}
