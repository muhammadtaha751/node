const express = require("express");
const router = express.Router();
const Ads = require('../model/Ads')
const verifyToken = require('../middleware/verifyToken')

//localhost:3000/ads

router.get('/', async (req, res) => {
  try {
    const ads = await Ads.find({})

    res.send({
      message: 'data fetched successfully',
      data: ads
    })
  } catch (e) {
    res.send({
      message: e
    })
  }
})

//url me id bhijwaon to req.params me milegi
//body me id bhijwaon to req.body me milegi

router.get('/:id', async (req, res) => {
  console.log('req --->', req.params.id)
  
  const ad = await Ads.findOne({ _id: req.params.id })
  res.send({
    message: 'data fetched successfully',
    data: ad
  })
})

//localhost:3000/ads/addData

//middleware: API aur uske function ke darmian ko additional kaam karna
//ho to middleware ke zarye karwaenge
router.post('/addData', verifyToken, async (req, res) => {
  try {
    const ad = new Ads(req.body);
    await ad.save()
  
    res.send({
      message: 'data added successfully'
    })
  } catch (e) {
    res.send({
      message: e
    })
  }
})

//localhost:3000/ads/updateData
router.put('/updateData', async (req, res) => {
  try {
    const { _id } = req.body
    const data = await Ads.findOneAndUpdate({ _id: _id }, req.body);
  
    res.send({
      message: 'data updated successfully',
      data
    }) 
  } catch(e) {
    res.send({
      message: e
    }) 
  }
})


//localhost:3000/ads/deleteData
router.delete('/deleteData/:id', (req, res) => {
  //delete data from db
  //req.params.id

  res.send({
    message: 'data deleted successfully'
  })
})

module.exports = router