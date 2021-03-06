const Proposed_Term = require('../models/proposed_term');

const proposedTerms = (app) => {

// Get all proposed terms
app.get('/api/term/proposed/all', (req, res) => {
  Proposed_Term.find({}, (err, proposed_terms) => {
      res.json(proposed_terms);
  });
});

// Add proposed terms
app.post('/api/term/proposed/add', (req, res) => {
  console.log(req.body);
    const url = req.body.url;
    const term = req.body.term;
    const category = req.body.category;
    const definition = req.body.definition;
    const application = req.body.application;
    const sector = req.body.sector;
    const measure = req.body.measure;

    const proposed_terms = new Proposed_Term({
        'URL': url,
        'Term': term,
        'Category': category,
        'Term-Definition': definition,
        'Application': application,
        'Sector': sector,
        'Unit-of-Measure': measure,
    });
      proposed_terms.save()
      .then(p_terms => {
        console.log('Term: ' + term + ' added successfully.');
      })
      .catch(err => {
        console.log(err);
        console.log('Failed to save to db.')
      });
  });
  // delete proposed terms
  app.get('/api/term/proposed/delete/:id', (req,res) => {
    const id = req.params.id;

    Proposed_Term.findByIdAndRemove({_id: req.params.id},
      function(err, proposed_terms){
        if(err)
          console.log(err);
        else
          console.log('Term: ' + id + ' Successfully removed.')
      }
    )
  })
  return app;
}

module.exports = proposedTerms;
