# User

APIs for users

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



