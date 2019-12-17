const express = require('express');

exports.create = (req,res) => {
    console.log("create")
    res.send("create-product")
}