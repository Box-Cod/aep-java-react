# aep-java-react

### End-points

## POST - http://localhost:8081/admin

<pre>
body:
{
    "email": "teste@email.com",
    "password": "123456789",
    "username": "TESTE",
    "role": "ROLE_ADMIN"
}
</pre>

## POST - http://localhost:8081/admin/login
<pre>
body:
{
    "email": "teste@email.com",
    "password": "123456789",
    "username": "TESTE",
}
</pre>

## GET - http://localhost:8081/users/auth/login
<pre>
header: 
{
  "Authorization": "Bearer TokenJWT"
}
body:
{
    "email": "teste@email.com",
    "password": "123456789",
    "username": "TESTE",
}
</pre>
