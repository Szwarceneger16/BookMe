# User

APIs for users

## Check password

<small class="badge badge-darkred">requires authentication</small>

Returns data about current authenticated user

> Example request:

```bash
curl -X POST \
    "http://localhost/api/user/check-password" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"password":"1235678"}'

```

```javascript
const url = new URL(
    "http://localhost/api/user/check-password"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "password": "1235678"
}

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response => response.json());
```


> Example response (200):

```json
{
    "data": "true",
    "message": "Record was returned",
    "status": 200
}
```
<div id="execution-results-POSTapi-user-check-password" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-user-check-password"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-user-check-password"></code></pre>
</div>
<div id="execution-error-POSTapi-user-check-password" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-user-check-password"></code></pre>
</div>
<form id="form-POSTapi-user-check-password" data-method="POST" data-path="api/user/check-password" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-user-check-password', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-user-check-password" onclick="tryItOut('POSTapi-user-check-password');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-user-check-password" onclick="cancelTryOut('POSTapi-user-check-password');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-user-check-password" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/user/check-password</code></b>
</p>
<p>
<label id="auth-POSTapi-user-check-password" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="POSTapi-user-check-password" data-component="header"></label>
</p>
<h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
<p>
<b><code>password</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="password" name="password" data-endpoint="POSTapi-user-check-password" data-component="body" required  hidden>
<br>
Password to check.
</p>

</form>


## Current User

<small class="badge badge-darkred">requires authentication</small>

Returns data about current authenticated user

> Example request:

```bash
curl -X GET \
    -G "http://localhost/api/user/me" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://localhost/api/user/me"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response => response.json());
```


> Example response (200):

```json
{
    "data": {
        "first_name": "Jan",
        "last_name": "Nowak",
        "email": "test@test.pl"
    },
    "message": "Record was returned",
    "status": 200
}
```
<div id="execution-results-GETapi-user-me" hidden>
    <blockquote>Received response<span id="execution-response-status-GETapi-user-me"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-user-me"></code></pre>
</div>
<div id="execution-error-GETapi-user-me" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-user-me"></code></pre>
</div>
<form id="form-GETapi-user-me" data-method="GET" data-path="api/user/me" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('GETapi-user-me', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-GETapi-user-me" onclick="tryItOut('GETapi-user-me');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-GETapi-user-me" onclick="cancelTryOut('GETapi-user-me');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-GETapi-user-me" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-green">GET</small>
 <b><code>api/user/me</code></b>
</p>
<p>
<label id="auth-GETapi-user-me" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="GETapi-user-me" data-component="header"></label>
</p>
</form>



