const router = require('express').Router();
const { paragraph } = require('txtgen');

router.get('/txtgen', async (req, res) => {
    try {
        const s = (paragraph())
        res.status(200).send(s);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;