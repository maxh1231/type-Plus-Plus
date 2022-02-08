const router = require('express').Router();
const deepai = require('deepai');
deepai.setApiKey(`${process.env.DEEPAI_KEY}`)

router.get('/deepai', async (req, res) => {
    try {
        const response = await deepai.callStandardApi('text-generator', {
            text: 'football',
        })
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;