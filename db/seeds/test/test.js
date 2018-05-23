
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('robots').del()
    .then(function () {
      // Inserts seed entries
      return knex('robots').insert([
        {
          date_added: '5/21/2018',
          first_active: '5/21/2018',
          current_name: "R2-D2",
          height: 3.25,
          weight: 200,
          intelligence_metric: 18
        },
        {
          date_added: '5/20/2018',
          first_active: '5/20/2018',
          current_name: "Bender",
          height: 6.1,
          weight: 250,
          intelligence_metric: 14
        }
      ]);
    });
};
