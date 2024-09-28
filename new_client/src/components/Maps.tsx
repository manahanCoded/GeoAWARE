"use client";
import { useEffect, useRef } from "react";
import { config, Map, MapOptions, MapStyle } from "@maptiler/sdk";
import { GeocodingControl } from "@maptiler/geocoding-control/maptilersdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "@maptiler/geocoding-control/style.css";
import { Popup, Marker } from "maplibre-gl";
import { uploadReportDB } from "@/configure/inputReports";

interface MapsProps {
  place: string;
  onCoordinatesUpdate?: (lng: number, lat: number) => void;
}

export default function Maps({ place, onCoordinatesUpdate }: MapsProps) {
  const mapRef = useRef<Map | null>(null); // Store the map instance
  const markerRef = useRef<Marker | null>(null); // Store a marker instance to update its position
  const geocoderRef = useRef<GeocodingControl | null>(null); // Store the GeocodingControl instance

  useEffect(() => {
    // Set up MapTiler API key
    config.apiKey = process.env.NEXT_PUBLIC_API_KEY as string;

    // Map options for the initial rendering
    const options: MapOptions = {
      container: document.getElementById("map") as HTMLElement, // Container ID for the map
      style: MapStyle.STREETS, // Using the streets style from MapTiler
      center: [120.596, 16.4023], // Default center coordinates
      zoom: 14, // Default zoom level
    };

    // Initialize the map and store the reference
    const map = new Map(options);
    mapRef.current = map;

    // Instantiate the geocoding control and add it to the map
    const geocoder = new GeocodingControl();
    geocoderRef.current = geocoder;
    map.addControl(geocoder, "top-left");

    // Fetch crime data and add markers
    const crimeData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/map/crime-layout");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data: uploadReportDB[] = await res.json();

        type CrimeType = "Robbery" | "Assault" | "Theft" | "Vandalism" | string;

        const getColorForCrime = (crimeType: CrimeType): string => {
          switch (crimeType) {
            case "Robbery":
              return "black";
            case "Assault":
              return "red";
            case "Theft":
              return "orange";
            case "Vandalism":
              return "purple";
            default:
              return "gray"; // Default color for unknown crime types
          }
        };

        // Add crime markers to the map
        data.forEach((marker) => {
          if (marker.longitude !== null && marker.latitude !== null) {
            // Default marker without custom HTML element
            const mapMarker = new Marker({
              color: getColorForCrime(
                marker.capitalized_crime
                  ? marker.capitalized_crime
                  : "undefined"
              ), // Set marker color based on crime type
            })
              .setLngLat([marker.longitude, marker.latitude])
              .addTo(mapRef.current!); // Use the existing map reference

            // Create a popup with crime data
            const popup = new Popup({ offset: 25 }).setHTML(
              `<div style="font-family: Arial, sans-serif; color: #333; padding: 3px/2px; ">
                 <h4 style="margin: 0; color: #e74c3c;">Crime: ${marker.capitalized_crime}</h4>
                 <p style="margin: 5px 0;">Location: ${marker.capitalized_location}</p>
                 <strong>Reported by:</strong> ${marker.firstname} ${marker.lastname} <br>
                 <strong>Phone:</strong> ${marker.phone_number}
               </div>`
            );

            // Attach the popup to the marker
            mapMarker.setPopup(popup);
          }
        });
      } catch (err) {
        console.error("Error loading crime data:", err);
      }
    };

    crimeData(); // Fetch and display crime data when the map is loaded
  }, []); // Empty dependency array to run effect only on mount

  // Handle 'place' prop change and trigger geocoding search
  useEffect(() => {
    if (place) {
      const fetchCoordinates = async () => {
        const response = await fetch(
          `https://api.maptiler.com/geocoding/${encodeURIComponent(
            place
          )}.json?key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].geometry.coordinates;

          // Update marker position or add a new one
          if (markerRef.current) {
            markerRef.current.setLngLat([lng, lat]);
          } else {
            markerRef.current = new Marker()
              .setLngLat([lng, lat])
              .addTo(mapRef.current!);
          }

          // Optionally center the map on the new location
          mapRef.current?.setCenter([lng, lat]);
          mapRef.current?.setZoom(18);

          // Pass the longitude and latitude back to the parent component
          if (onCoordinatesUpdate) {
            onCoordinatesUpdate(lng, lat);
          }
        }
      };

      fetchCoordinates();
    }
  }, [place, onCoordinatesUpdate]); // Run whenever the 'place' prop changes

  return <div className="h-full w-full" id="map"></div>; // Map container
}
