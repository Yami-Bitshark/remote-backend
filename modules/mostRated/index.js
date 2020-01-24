"use strict"
/**
 * mostRated module
 * This modules provides functions to get the github most rated repos from their public api
 * Api Endpoint:
 * https://api.github.com/trending + /[language] ? since = [daily/weekly/monthly]
 *
 * Note that this page does not provide more than 25 repos

 */


//axios module
var axios = require('axios');

/**
 *
 * this function will be used to sort languages array for popularity
 */
function compare( a, b ) {
  if ( a.used < b.used ){
    return 1;
  }
  if ( a.used > b.used ){
    return -1;
  }
  return 0;
}


/**
 * Private function
 * Search for a language in objects array and return the index
 * @param  {[string]} key        [Language name]
 * @param  {[array]} inputArray [Objects Array]
 * @return {[integer]}            [index]
 */
function search(key, inputArray) {
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i].lang === key) {
      return i;
    }
  }
  return false;
}


/**
 * Function to call the apu end point and get results for one page
 * @param  {[integer]}   page     [page number]
 * @param  {[array]}   data     [array that will hold results]
 * @param  {[string]}   language [language name | all languages if given an empty string]
 * @param  {Function} cb       [callback]
 * @return {[array]}            [data array full of results, exactly 30 results or 10 if its the 4th page]
 */
function getRes(page, data, language, cb) {
  axios.get('https://api.github.com/search/repositories', {
      params: {
        page: page,
        sort: 'stars',
        order: 'desc',
        q: 'language:' + language.trim()
      }
    })
    .then(function(resp) {
      if (resp.status === 200) {
        //the length is 30 per page
        var cond = resp.data.items.length;
        //in the 4th page results we got already 90 repos, wen eed to get only 10 repos for 100 repos
        if (page === 4) {
          cond = 10
        }
        for (var i = 0; i < cond; i++) {
          data.push({
            url: resp.data.items[i].html_url,
            lang: resp.data.items[i].language
          })
        }
        cb(true, data)
      } else {
        cb(false, data)
      }
    })
    .catch(function(err) {
      cb(false, data)
    })
}
/**
 * Function to iterate the getRes function over 4 pages. and get all results
 * @param  {[integer]}   page     [page numb]
 * @param  {[array]}   data     [results array]
 * @param  {[string]}   language [lang name, all langs if given an empty string]
 * @param  {Function} cb       [callback function]
 * @return {[array]}            [results array]
 */
function getAllResults(page, data, language, cb) {
  getRes(page, data, language, function(e, otp) {
    if (e) {
      page++;
      if (page === 5) {
        cb(otp)
      } else {
        getAllResults(page, otp, language, cb);
      }
    } else {
      cb(false)
    }
  })
}



var mostRated = {
  /**
   * Function that returns the 100 most rated repos
   * @param  {Function} cb [callback function]
   * @return {[Array]}      [Array of objects]
   */
  getRepos: function(cb) {
    var page = 1;
    var data = [];

    getAllResults(page, data, '', function(o) {
      if (o) {
        cb(o);
      } else {
        cb(false);
      }
    })

  },

  /**
   * Function that returns the most rated repos for a given language. Return 100 repos.
   * @param  {[string]}   lang [Langaguge Name]
   * @param  {Function} cb   [Callback Function]
   * @return {[Array]}        [Array of Objects]
   */
  langRepos: function(lang, cb) {

    var page = 1;
    var data = [];

    getAllResults(page, data, lang, function(o) {
      if (o) {
        cb(o);
      } else {
        cb(false);
      }
    });

  },

  /**
   * Function that returns insights about the used languages in the mostRated repos:
   *    {
   *     lang : language name,
   *     used : how many times the language is being used
   *    }
   * @param  {Function} cb [Callback Function]
   * @return {[Array]}      [Array of objects]
   */
  langsAnalytics: function(cb) {

    var page = 1;
    var data = [];

    getAllResults(page, data, '', function(res) {
      if (res) {

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
                lang: res[i].lang,
                used: 1
              });
            }
            // new day new kay
            k = null;
          }
        }
        if (res2.length > 0) {
          res2.sort(compare);
          cb(res2);
        } else {
          cb(false);
        }
      } else {
        cb(false);
      }

      } else {
        cb(false);
      }
    });

  }
};

module.exports = mostRated;
