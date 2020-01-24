"use strict"
/**
 * trend.js module
 * This modules provides functions to scrap the github trending repos page
 * Scraped Link:
 * https://github.com/trending + /[language] ? since = [daily/weekly/monthly]
 *
 * Note that this page does not provide more than 25 repos

 */


//scraping module
var Xray = require('x-ray')


/**
 * Private function
 * Search for a language in objects array and return the index
 * @param  {[string]} key        [Language name]
 * @param  {[array]} inputArray [Objects Array]
 * @return {[integer]}            [index]
 */
function search(key, inputArray){
 for (let i=0; i < inputArray.length; i++) {
     if (inputArray[i].lang === key) {
         return i;
     }
 }
 return false;
}


// initiate the scraper
var x = Xray();

//axios.get('https://api.github.com/search/repositories',{
//  params:{
//    sort : 'stars',
//    order : 'desc',
//    q : 'language:java'
//  }
//})

//x('https://github.com/trending', 'article.Box-row', [{
//  url: 'h1.h3.lh-condensed a@href',
//  lang : 'span[itemprop="programmingLanguage"]'
//}])(function(err, res) {
//  var res2 = []
//  console.log(res) // Google
//  console.log(res.length) // Google
//  var ob = res.find(function(data){
//      if (data.lang === 'Rust') {
//        return data
//      }
//  })
//  console.log(ob.lang)
//  //for (var i = 0; i < res.length; i++) {
//  //  if (res[i].lang) {
//  //      if (true) {
//  //
//  //      } else {
//  //
//  //      }
//  //  }
//  //}
//})
var trending = {
/**
 * Function that scrapes the github page and returns the 25 trending repos
 * @param  {Function} cb [callback function]
 * @return {[Array]}      [Array of objects]
 */
  trendRepos : function(cb){

    x('https://github.com/trending', 'article.Box-row', [{
      url: 'h1.h3.lh-condensed a@href',
      lang : 'span[itemprop="programmingLanguage"]'
    }])(function(err, res) {
      if (res && res.length > 0) {
        cb(res);
      } else {
        cb(false);
      }
    });
  },

  /**
   * Function that scrapes the github trending page for a given language. Return 25 repos.
   * @param  {[string]}   lang [Langaguge Name]
   * @param  {Function} cb   [Callback Function]
   * @return {[Array]}        [Array of Objects]
   */
  langRepos : function(lang,cb){
    var url = 'https://github.com/trending/';
    if (lang) {
      url += lang.trim();
      url += '?since=daily';
    }
    x(url, 'article.Box-row', [{
      url: 'h1.h3.lh-condensed a@href',
      lang : 'span[itemprop="programmingLanguage"]'
    }])(function(err, res) {
      if (res && res.length > 0) {
        cb(res);
      } else {
        cb(false);
      }
    });
  },

  /**
   * Function that returns insights about the used languages in the trending repos:
   *    {
   *     lang : language name,
   *     used : how many times the language is being used
   *    }
   * @param  {Function} cb [Callback Function]
   * @return {[Array]}      [Array of objects]
   */
  langsAnalytics : function(cb){
    x('https://github.com/trending', 'article.Box-row', [{
      url: 'h1.h3.lh-condensed a@href',
      lang : 'span[itemprop="programmingLanguage"]'
    }])(function(err, res) {
      var res2 = [];
      var k;
      if (res && res.length > 0) {
        // count the usage of each language and ush the results into res2
        for (var i = 0; i < res.length; i++) {
          if (res[i].lang) {
            // check whether the language is found before or not
            // is the index of the language in res2 array
            k = search(res[i].lang, res2);
            // found before ? increment the usage count
            if (k) {
              res2[k].used += 1;
            // nah ? create a fresh record
            } else {
              res2.push({
                lang : res[i].lang,
                used : 1
              });
            }
            // new day new kay
            k = null;
          }
        }
        if (res2.length > 0) {
          cb(res2);
        } else {
          cb(false);
        }
      } else {
        cb(false);
      }
    });
  }
};

module.exports = trending;
