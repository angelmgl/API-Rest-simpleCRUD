const { products } = require('../db.json');

const regex = /^[a-z]{2,20}$/;

module.exports = {
    getProducts: (req, res) => {
        res.json({ products: products});
    },

    addProduct: (req, res) => {
        let { name } = req.body;
        name = name.trim().toLowerCase();

        if(regex.test(name)) {
            products.push({
                id: products.length,
                name
            });
        
            res.status(201).json({
                "success": true,
                "message": "Successfully added"
            });
        } else {
            res.status(400).json({
                "success": false,
                "message": "Name must be string, don't include numbers or spaces."
            });
        }
    },

    updateProduct: (req, res) => {
        const { id } = req.params;
        let { name } = req.body;
        name = name.trim().toLowerCase();
        let exist = false;

        if(regex.test(name)) {
            products.forEach((product, i) => {
                if(product.id === Number(id)) {
                    id.name = name;
                    exist = true;
                }
            });

            if(!exist) {
                res.status(400).json({
                    "success": false,
                    "message": "We don't have any object with that id, check it and try again."
                });
                return;
            }
    
            res.status(200).json({
                "success": true,
                "message": "Successfully updated"
            });
        } else {
            res.status(400).json({
                "success": false,
                "message": "Name must be string, don't include numbers or spaces."
            });
        }
    },

    deleteProduct: (req, res) => {
        const { id } = req.params;
        let exist = false;

        products.forEach((product, i) => {
            if(product.id === Number(id)) {
                products.splice(i, 1);
                exist = true;
            }
        });

        if(!exist) {
            res.status(400).json({
                "success": false,
                "message": "We don't have any object with that id, check it and try again."
            });
            return;
        }

        res.status(200).json({
            "success": true,
            "message": "Successfully deleted"
        });
    }
};