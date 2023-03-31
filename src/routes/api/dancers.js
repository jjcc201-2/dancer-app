const express = require('express');
const router = express.Router();
const uuid = require('uuid');
var dancers = require('../../Dancers');

// @route GET api/dancers/:id
// @desc Get single dancer
// @access Public
router.get('/:id', (req, res) => {
    // check if the dancer exists
    const found = dancers.some(dancer => dancer.id === parseInt(req.params.id));

    if (found) {
        res.json(dancers.filter(dancer => dancer.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `Dancer ${req.params.id} not found`})
    }
}); 

// @route GET api/dancers
// @desc Get All dancers
// @access Public
router.get('/', (req, res) => {
    res.json(dancers);
});


// @route POST api/dancers
// @desc Create a dancer
// @access Public
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        category: req.body.category,
        level: req.body.level,
        country: req.body.country
    }

    // Checks for empty fields in the request body
    if(!newMember.name || !newMember.email || !newMember.category || !newMember.level || !newMember.country) {
        return res.status(400).json({msg: 'Please include all fields'});
    }

    dancers.push(newMember);
    res.json(dancers);

});

// @route PUT api/dancers/:id
// @desc Update a dancer
// @access Public
router.put('/:id', (req, res) => {
    // check if the dancer exists
    const found = dancers.some(dancer => dancer.id === parseInt(req.params.id));

    if (found) {
        const updMember = req.body;
        dancers.forEach(dancer => {
            // Finds the dancer to update and updates the fields that are present in the request body
            if(dancer.id === parseInt(req.params.id)) {
                dancer.name = updMember.name ? updMember.name : dancer.name;
                dancer.email = updMember.email ? updMember.email : dancer.email;
                dancer.category = updMember.category ? updMember.category : dancer.category;
                dancer.level = updMember.level ? updMember.level : dancer.level;
                dancer.country = updMember.country ? updMember.country : dancer.country;

                res.json({msg: 'Dancer updated', dancer});
            }

        
        })
    } else {
        res.status(400).json({msg: `Dancer ${req.params.id} not found`})
    }
});



// @route DELETE api/dancers/:id
// @desc Delete a dancer
// @access Public
router.delete('/:id', (req, res) => {
    // check if the dancer exists
    const found = dancers.some(dancer => dancer.id === parseInt(req.params.id));

    if (found) {

        // delete the dancer from the array of dancers based on the id
        dancers = dancers.filter(dancer => dancer.id !== parseInt(req.params.id));

        res.json({
            msg: 'Member deleted',
            dancers: dancers});
    } else {
        res.status(400).json({msg: `Dancer ${req.params.id} not found`})
    }
});


module.exports = router;