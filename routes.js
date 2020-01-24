'use strict'

var express = require('express');
var router = express.Router();

var trending = require('./controllers/trending');
var mostRated = require('./controllers/mostRated');

//trending routes
//
router.get('/trending/listAll',trending.trendRepos.bind(trending));
router.get('/trending/listLang',trending.langRepos.bind(trending));
router.get('/trending/analytics',trending.langsAnalytics.bind(trending));

//mostRated routes
//

router.get('/mrated/listAll', mostRated.getRepos.bind(mostRated));
router.get('/mrated/listLang', mostRated.langRepos.bind(mostRated));
router.get('/mrated/analytics', mostRated.langsAnalytics.bind(mostRated));

module.exports = router;
