// const express = require('express');
// const Stores = require('../');
const Store = require('../models/store');

const getStores = async (req, res) => {
    try {
        const stores = await Store.find();

        res.status(200).json({
            'status': 'success',
            'count': stores.length,
            'data': stores,
        })
    } catch (error) {
        res.status(200).json({
            'status': 'failed',
            'msg': error,
        })
    }
}

// const getStore = async (req, res) => {
//     try {
//         const stores = await Store.find();

//         res.status(200).json({
//             'status': 'success',
//             'count': stores.length,
//             'data': stores,
//         })
//     } catch (error) {
//         res.status(200).json({
//             'status': 'failed',
//             'msg': error,
//         })
//     }
// }

const addStore = async (req, res) => {
    try {
        const data = req.body;
        const store = await Store.create(data)

        res.status(200).json({
            success: true,
            data: store,
        })

    } catch (error) {
        res.status(500).json({
            error: error
        }
        );
    }
}

module.exports = {
    getStores,
    addStore,
}