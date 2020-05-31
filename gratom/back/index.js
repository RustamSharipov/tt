const faker = require('faker');
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

let contacts = [];
const randInBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

for (let i = 0; i < 20; i++) {
  contacts[i] = {
    id: i + 1,
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    email: faker.internet.email(),
    tels: [...new Array(randInBetween(0, 2))].map(() => faker.phone.phoneNumber()),
  }
}

const app = new Koa();
const router = new Router();

router
  .get('/api/contacts', (ctx) => {
    ctx.body = contacts;
  })

  .get('/api/contact/:id', (ctx) => {
    const id = parseInt(ctx.params.id, 10);
    const filtered = contacts.filter(c => c.id === id);
    if (!filtered.length) {
      ctx.throw(404, 'Contact not found');
    }
    ctx.body = filtered[0];
  })

  .post('/api/contact', (ctx) => {
    const id = contacts.length + 1;
    const contact = { ...ctx.request.body, id };
    contacts.push(contact)
    ctx.body = contact;
  })

  .patch('/api/contact/:id', (ctx) => {
    const id = parseInt(ctx.params.id, 10);
    let updated = false;
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id === id) {
        contacts[i] = { ...contacts[i], ...ctx.request.body };
        updated = contacts[i];
      }
    }
    ctx.body = updated;
  })

  .del('/api/contact/:id', (ctx) => {
    const id = parseInt(ctx.params.id, 10);
    contacts = contacts.filter(c => c.id !== id);
    ctx.body = 'ok';
  });

app
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(5000);
