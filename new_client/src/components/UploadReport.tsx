import { useRecoilValue } from "recoil";
import Maps from "./Maps";
import { useState } from "react";
import userAtom from "@/atoms/userAtom";
import { useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { crime } from "../configure/crimeOptions"; //
import { uploadReportDB } from "../configure/inputReports";


const UploadReport = () => {
  const user = useRecoilValue(userAtom);

  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);

  const handleCoordinatesUpdate = (lng: number, lat: number) => {
    setLongitude(lng);
    setLatitude(lat);
  };

  const [uploadReport, setUploadReport] = useState<uploadReportDB>({
    lastname: "",
    firstname: "",
    phone_number: "",
    crime: "",
    latitude: latitude,
    longitude: longitude,
    location: "",
    event_date:`${new Date().toISOString().replace('T', ' ').substring(0, 19)}`
  });

  useEffect(() => {
    setUploadReport((prev) => ({
      ...prev,
      latitude: latitude,
      longitude: longitude,
    }));
  }, [latitude, longitude]);

  const submitReport = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user) {
      const updatedReport = {
        ...uploadReport,
        latitude,
        longitude,
      };

      try {
        if (user) {
          const response = await fetch(
            `http://localhost:5000/api/map/geoaware/${(user as any).id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedReport),
              credentials: "include",
            }
          );

          if (!response.ok) {
            console.error(
              "Response status:",
              response.status,
              "Response text:",
              await response.text()
            );
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          // Parse the response data
          const data = await response.json();
          alert("Success");
          console.log("Success response data:", data);
        } else {
          console.error("User is null");
        }
      } catch (error) {
        console.error("Error occurred while fetching:", error);
        alert("An error occurred: " + error);
      }
    } else {
      console.error("User is null");
    }
  };

  return (
    <div className="flex md:flex-row flex-col">
      <div className="md:h-[100vh] h-[60vh] md:w-2/3">
        <Maps
          place={uploadReport.location}
          onCoordinatesUpdate={handleCoordinatesUpdate}
        />
      </div>
      <div className=" p-10">
        <h1 className="text-red-600 font-bold text-4xl">Report Section</h1>
        <form onSubmit={submitReport} className="flex pt-4 flex-col">
          <div className="flex md:flex-row flex-col">
            <div className="flex flex-col mt-4">
              <label htmlFor="">Lastname</label>
              <input
                required
                type="text"
                className="border-spacing-4 rounded-md ml-2 border border-gray-400 p-2 "
                placeholder="Lastname"
                onChange={(e) => {
                  setUploadReport({
                    ...uploadReport,
                    lastname: e.target.value,
                  });
                }}
                value={uploadReport.lastname}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="">Firstname</label>
              <input
                required
                type="text"
                className="border-spacing-4 rounded-md ml-2 border border-gray-400 p-2"
                placeholder="Firstname"
                onChange={(e) => {
                  setUploadReport({
                    ...uploadReport,
                    firstname: e.target.value,
                  });
                }}
                value={uploadReport.firstname}
              />
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="report-input">Enter number</label>
            <input
              required
              type="number" // Changed to number
              className="border-spacing-4 rounded-md ml-2 border border-gray-400 p-2"
              placeholder="Enter number"
              onChange={(e) => {
                const input = e.target.value;
                const isValid = /^\d*$/.test(input); // Ensures only digits (no symbols or letters)

                if (isValid) {
                  setUploadReport({
                    ...uploadReport,
                    phone_number: input,
                  });
                }
              }}
              value={uploadReport.phone_number}
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="report-input">Enter Location:</label>
            <input
              required
              id="report-input"
              type="text"
              className="border-spacing-4 rounded-md ml-2 border border-gray-400 p-2"
              placeholder="Enter specific location"
              onChange={(e) =>
                setUploadReport({ ...uploadReport, location: e.target.value })
              }
              value={uploadReport.location}
            />
          </div>

          {/* Crime selection */}
          <div className="flex flex-col mt-4">
            <label htmlFor="crime-select">Crime:</label>
            <Select
              isRequired
              placeholder="Indicate a crime ▼"
              className="flex justify-center pt-4 h-8 bg-gray-100 text-black border-2 border-red-500 rounded-md shadow-md text-lg overflow-hidden"
              onChange={(e) => {
                // Update the selected crime in the state
                setUploadReport({ ...uploadReport, crime: e.target.value });
              }}
            >
              {crime.map((crimes) => (
                <SelectItem
                  className=" space-x-2 bg-white hover:bg-gray-200 pl-4 py-2 text-black cursor-pointer hover:border-l-2 border-red-600"
                  key={crimes.key}
                  value={crimes.key} // Set the value for each SelectItem
                >
                  {crimes.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Display the longitude and latitude */}
          <div className="flex flex-col mt-4">
            <p>Longitude: {longitude ?? "N/A"}</p>
            <p>Latitude: {latitude ?? "N/A"}</p>
          </div>
          <div>
            <p>{new Date().toISOString().replace('T', ' ').substring(0, 19)}</p>
          </div>
          <div className="flex md:justify-center">
            <button className="md:w-[98%] w-[50%] mt-4 rounded-md py-2 text-white bg-red-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadReport;
