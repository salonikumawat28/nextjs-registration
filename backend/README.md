# Backend

Simple backend.

Run with `node index.js`.

The only endpoint is `POST /register`.

It just returns the sent body:

```
$ curl -X POST http://localhost:3001/register -H 'Content-Type: application/json' -d '{"first_name":"Philipp","last_name":"Koster", "email": "philipp.koster@sedimentum.com"}'
register succeeded (attempt: 1), body: {"first_name":"Philipp","last_name":"Koster", "email": "philipp.koster@sedimentum.com"}
```

Attention, it will fail with a 400 if any field is not provided. AND every third time with a 500.
