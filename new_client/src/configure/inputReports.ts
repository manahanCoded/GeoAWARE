export interface uploadReportDB {
    lastname: string;
    firstname: string;
    phone_number: string;
    crime: string;
    capitalized_crime?: string;
    capitalized_location?: string;
    latitude: number | null;   
    longitude: number | null;  
    location: string;
    event_date: string;
  }