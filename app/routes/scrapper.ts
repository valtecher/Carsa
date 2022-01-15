import scrapperController from '../controllers/scrapperController'
import express from 'express'
const router = express.Router();

router.get('/', scrapperController.scrapCarFromLink)


module.exports = router;