import { Router } from "express";

import {crimeData, geoAwareReport} from "./controllers/crimeControlleres.js"
import protectedRoute from "../middleware/protectedRoute.js";

const router = Router()

router.get("/crime-layout", crimeData)
router.post("/geoaware/:id", protectedRoute, geoAwareReport)

export default router