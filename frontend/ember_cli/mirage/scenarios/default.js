export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);

  let wheel1 = server.create('wheel');
  wheel1.id = 'one';
  let wheel2 = server.create('wheel');
  wheel2.id = 'two';
}
