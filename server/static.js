'use strict';

const express = require('express');
const path = require('path');

const static_opt = {
  index: 'index.false',
  dotfiles: 'ignore'
};

const paths = [
  express.static(path.resolve(__dirname, '..', 'client/dist/js'), static_opt),
  express.static(path.resolve(__dirname, '..', 'client/dist/css'), static_opt)
];

exports = module.exports = paths;
