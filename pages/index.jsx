import React, { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown";

const Home = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [year, setYear] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const fetchData = () => {
    fetch("https://api.nobelprize.org/v1/prize.json")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    console.log(selectedCategory, selectedYear);
    let finalData = data.prizes?.filter((item) => {
      if (selectedCategory === "" && selectedYear === "") {
        return item;
      }
      if (selectedYear !== "") {
        if (selectedCategory !== "") {
          return (
            item.year === selectedYear && item.category === selectedCategory
          );
        }
        return item.year === selectedYear;
      }
      if (selectedCategory !== "") {
        return item.category === selectedCategory;
      }
      return item;
    });
    setSelectedData(finalData);
  }, [selectedYear, selectedCategory, data.prizes]);
  useEffect(() => {
    let cate = [];
    let yr = [];
    data?.prizes?.map((item) => {
      if (!cate.includes(item.category)) {
        cate.push(item.category);
      }
      if (!yr.includes(item.year)) {
        yr.push(item.year);
      }
    });
    setCategories(cate);
    setYear(yr);
  }, [data]);
  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);
  return (
    <div>
      <div className="flex justify-center">
        <Dropdown
          list={categories}
          setItem={setSelectedCategory}
          selectedItem={selectedCategory}
        />
        <Dropdown
          list={year}
          setItem={setSelectedYear}
          selectedItem={selectedYear}
        />
      </div>
      <div>
        {selectedData &&
          selectedData.map((prize, index) => {
            return (
              <div key={index} className="flex items-center justify-center">
                <div className="p-2 sm:w-1/2 w-full">
                  <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                    <span className="title-font font-medium">
                      <h1 className="font-bold underline text-rose-600">
                        {prize.category.toUpperCase()}({prize.year})
                      </h1>

                      {prize?.laureates?.map((l, index) => {
                        return (
                          <div key={index} className="font-medium">
                            {l.firstname} {l.surname}
                          </div>
                        );
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
