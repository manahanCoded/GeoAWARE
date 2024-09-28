import db from "../../database/database.mjs";

const geoAwareReport = async (req, res) => {
  try {
    const currentUser = await db.query("SELECT * FROM users WHERE id = $1", [
      req.params.id,
    ]);

    if (currentUser.rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const {
      lastname,
      firstname,
      phone_number,
      crime,
      latitude,
      longitude,
      location,
      event_date
    } = req.body;

    if (
      !lastname ||
      !firstname ||
      !phone_number ||
      !crime ||
      !latitude ||
      !longitude ||
      !location ||
      !event_date
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const data_RepeatedCheck = await db.query(
      "SELECT * FROM user_report WHERE crime = $1 AND latitude = $2 AND longitude = $3",
      [crime, latitude, longitude]
    );

    if (data_RepeatedCheck.rows.length > 0) {
      return res.status(409).json({
        error: "A report for this crime at this location already exists.",
      });
    }

    if (!/^\d+$/.test(phone_number)) {
      return res
        .status(400)
        .json({ error: "Phone number must be a valid number" });
    }

    if (phone_number.length !== 11) {
      return res
        .status(400)
        .json({ error: "Phone number must be 11 digits long" });
    }

    await db.query(
      "INSERT INTO user_report (lastname, firstname, phone_number, crime, latitude, longitude, location, event_date ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [lastname, firstname, phone_number, crime, latitude, longitude, location, event_date]
    );

    res.status(200).json({ message: "Report submitted successfully" });
  } catch (err) {
    console.error("Error in geoAwareReport:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const crimeData = async (req, res) => {
  try {
    const response = await db.query(
      "SELECT *, CONCAT( UPPER(SUBSTRING(crime, 1, 1)),LOWER(SUBSTRING(crime, 2, LENGTH(crime)))) AS capitalized_crime, CONCAT( UPPER(SUBSTRING(location, 1, 1)),LOWER(SUBSTRING(location, 2, LENGTH(location)))) AS capitalized_location FROM user_report"
    );
    res.status(200).json(response.rows);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { crimeData, geoAwareReport };
