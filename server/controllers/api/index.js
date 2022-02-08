const router = require('express').Router();
// const deepai = require('deepai');
// deepai.setApiKey(`${process.env.DEEPAI_KEY}`)
const { paragraph } = require('txtgen');

router.get('/deepai', async (req, res) => {
    try {
        // const response = await deepai.callStandardApi('text-generator', {
        //     text: 'football',
        // })
        const s = (paragraph())
        // console.log(s)
        res.status(200).send(s);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;