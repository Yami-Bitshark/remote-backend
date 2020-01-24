var mostRated = require('../../modules/mostRated');

module.exports = {
  getRepos : function(req,res){
    mostRated.getRepos(function(out){
      if (out) {
          res.status(200);
          res.json({
            status: 200,
            data : out
          });
      } else {
        res.status(500)
        res.json({
            status: 500,
            message : 'Oops, something unexpected happened. Blame Tarik Moustaid, I\'m just a program.'
          });
      }
    });
  },
   langRepos : function(req,res){
    mostRated.langRepos(req.query.lang, function(out){
      if (out) {
          res.status(200);
          res.json({
            status: 200,
            data : out
          });
      } else {
        res.status(500)
        res.json({
            status: 500,
            message : 'Oops, something unexpected happened. Maybe you didnt specify the language? ?lang= or you need to put the blame on Tarik Moustaid, I\'m just a program.'
          });
      }
    });
  },
  langsAnalytics : function(req,res){
    mostRated.langsAnalytics(function(out){
      if (out) {
          res.status(200);
          res.json({
            status: 200,
            data : out
          });
      } else {
        res.status(500)
        res.json({
            status: 500,
            message : 'Oops, something unexpected happened. Blame Tarik Moustaid, I\'m just a program.'
          });
      }
    });
  }
};
