import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import { CiCloudSun } from "react-icons/ci";

const Countries = [
  { code: "ny", country: "New York" },
  { code: "jordan", country: "Amman" },
  { code: "london", country: "London" },
  { code: "toronto", country: "Toronto" },
  { code: "cairo", country: "Cairo" },
];

function App() {
  const date = new Date();
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const [location, setLocation] = useState("New York");
  const [data, setData] = useState();

  const fetchData = async () => {
    const data = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=fbfc77c8c9a94101804175513231111&q=${location}&days=3&aqi=no&alerts=no`,
      { method: "GET" } //اليمثود عشان نحدد انو  بدنا نحصل على المعلومات
    ).then((res) => {
      return res.json();
    });
    setData(data);
    console.log(data);
    console.log();
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  return (
    <div className="flex justify-center m-[20px] ">
      <div className="border-2 p-8 w-full">
        <div className="border-2 border-amber-400">
          <h1 className="text-center text-3xl">Weather Dashboard </h1>
          <div>
            <div className="flex justify-center">
              <select
                className="w-full  m-10 border-2 rounded p-1 border-indigo-800"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                plsceholder="Select an option"
              >
                {Countries.map((item, index) => (
                  <option value={item.code}>{item.country}</option>
                ))}
              </select>
            </div>
            <h2>Today's Weather</h2> {data?.location?.country}
            <div className="flex  ">
              <img className="text-md" src={data?.current?.condition?.icon} />
              <p className="mt-auto mb-auto">
                {data?.current?.condition?.text}
              </p>
            </div>
            <h3>Temperature</h3>
            <p>{data?.current?.temp_c}°C</p>
            <p>{data?.current?.temp_f}°F</p>
            <h3>Humidity </h3>
            {data?.current?.humidity}%
          </div>
        </div>

        <div className="border-2">
          <h2>Current Time</h2>
          <div>{time}</div>
        </div>
        <div className="border-2">
          <h2>Forecast</h2>
          {data?.forecast?.forecastday.map((item, index) => (
            <>
              <div>{item.date}</div>
              <div>{item.day.condition.text}</div>
              <div>
                {" "}
                <h4>The Max Temperature</h4>
                <div>{item.day.maxtemp_c}°C</div>
                <div>{item.day.maxtemp_f}°F</div>
              </div>
              <div>
                {" "}
                <h4>The Average Temperature</h4>
                <div>{item.day.avgtemp_c}°C</div>
                <div>{item.day.avgtemp_f}°F</div>
              </div>
              <div>
                {" "}
                <h4>The Minimum Temperature</h4>
                <div>{item.day.mintemp_c}°C</div>
                <div>{item.day.mintemp_f}°F</div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
