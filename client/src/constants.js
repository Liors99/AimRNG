require('dotenv').config();

const BLOCKSIZE = process.env.REACT_APP_BLOCKSIZE;
const MAX_TARGETS = process.env.REACT_APP_MAX_TARGETS;
const MAX_ACTIVE = process.env.REACT_APP_MAX_ACTIVE; 
const FADE_TIME =  process.env.REACT_APP_FADE_TIME;

export default {BLOCKSIZE, MAX_TARGETS, MAX_ACTIVE, FADE_TIME};