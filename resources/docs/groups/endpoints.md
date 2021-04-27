# Endpoints


## api/reservations




> Example request:

```bash
curl -X GET \
    -G "http://localhost/api/reservations" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://localhost/api/reservations"
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


<div id="execution-results-GETapi-reservations" hidden>
    <blockquote>Received response<span id="execution-response-status-GETapi-reservations"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-reservations"></code></pre>
</div>
<div id="execution-error-GETapi-reservations" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-reservations"></code></pre>
</div>
<form id="form-GETapi-reservations" data-method="GET" data-path="api/reservations" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('GETapi-reservations', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-GETapi-reservations" onclick="tryItOut('GETapi-reservations');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-GETapi-reservations" onclick="cancelTryOut('GETapi-reservations');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-GETapi-reservations" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-green">GET</small>
 <b><code>api/reservations</code></b>
</p>
</form>


## api/reservations/create




> Example request:

```bash
curl -X GET \
    -G "http://localhost/api/reservations/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://localhost/api/reservations/create"
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


<div id="execution-results-GETapi-reservations-create" hidden>
    <blockquote>Received response<span id="execution-response-status-GETapi-reservations-create"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-reservations-create"></code></pre>
</div>
<div id="execution-error-GETapi-reservations-create" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-reservations-create"></code></pre>
</div>
<form id="form-GETapi-reservations-create" data-method="GET" data-path="api/reservations/create" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('GETapi-reservations-create', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-GETapi-reservations-create" onclick="tryItOut('GETapi-reservations-create');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-GETapi-reservations-create" onclick="cancelTryOut('GETapi-reservations-create');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-GETapi-reservations-create" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-green">GET</small>
 <b><code>api/reservations/create</code></b>
</p>
</form>


## api/reservations




> Example request:

```bash
curl -X POST \
    "http://localhost/api/reservations" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"datetime_start":"2021-04-27T15:50:39+0000","datetime_end":"2021-04-27T15:50:39+0000","client_id":7,"employee_id":3,"place_id":6,"service_id":13}'

```

```javascript
const url = new URL(
    "http://localhost/api/reservations"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "datetime_start": "2021-04-27T15:50:39+0000",
    "datetime_end": "2021-04-27T15:50:39+0000",
    "client_id": 7,
    "employee_id": 3,
    "place_id": 6,
    "service_id": 13
}

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response => response.json());
```


<div id="execution-results-POSTapi-reservations" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-reservations"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-reservations"></code></pre>
</div>
<div id="execution-error-POSTapi-reservations" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-reservations"></code></pre>
</div>
<form id="form-POSTapi-reservations" data-method="POST" data-path="api/reservations" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-reservations', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-reservations" onclick="tryItOut('POSTapi-reservations');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-reservations" onclick="cancelTryOut('POSTapi-reservations');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-reservations" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/reservations</code></b>
</p>
<h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
<p>
<b><code>datetime_start</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="datetime_start" data-endpoint="POSTapi-reservations" data-component="body" required  hidden>
<br>
The value must be a valid date.
</p>
<p>
<b><code>datetime_end</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="datetime_end" data-endpoint="POSTapi-reservations" data-component="body" required  hidden>
<br>
The value must be a valid date.
</p>
<p>
<b><code>client_id</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="client_id" data-endpoint="POSTapi-reservations" data-component="body" required  hidden>
<br>

</p>
<p>
<b><code>employee_id</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="employee_id" data-endpoint="POSTapi-reservations" data-component="body" required  hidden>
<br>

</p>
<p>
<b><code>place_id</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="place_id" data-endpoint="POSTapi-reservations" data-component="body" required  hidden>
<br>

</p>
<p>
<b><code>service_id</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="service_id" data-endpoint="POSTapi-reservations" data-component="body" required  hidden>
<br>

</p>

</form>


## api/reservations/{reservation}




> Example request:

```bash
curl -X GET \
    -G "http://localhost/api/reservations/voluptate" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://localhost/api/reservations/voluptate"
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


<div id="execution-results-GETapi-reservations--reservation-" hidden>
    <blockquote>Received response<span id="execution-response-status-GETapi-reservations--reservation-"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-reservations--reservation-"></code></pre>
</div>
<div id="execution-error-GETapi-reservations--reservation-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-reservations--reservation-"></code></pre>
</div>
<form id="form-GETapi-reservations--reservation-" data-method="GET" data-path="api/reservations/{reservation}" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('GETapi-reservations--reservation-', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-GETapi-reservations--reservation-" onclick="tryItOut('GETapi-reservations--reservation-');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-GETapi-reservations--reservation-" onclick="cancelTryOut('GETapi-reservations--reservation-');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-GETapi-reservations--reservation-" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-green">GET</small>
 <b><code>api/reservations/{reservation}</code></b>
</p>
<h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
<p>
<b><code>reservation</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="reservation" data-endpoint="GETapi-reservations--reservation-" data-component="url" required  hidden>
<br>

</p>
</form>


## api/reservations/{reservation}/edit




> Example request:

```bash
curl -X GET \
    -G "http://localhost/api/reservations/reiciendis/edit" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://localhost/api/reservations/reiciendis/edit"
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


<div id="execution-results-GETapi-reservations--reservation--edit" hidden>
    <blockquote>Received response<span id="execution-response-status-GETapi-reservations--reservation--edit"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-reservations--reservation--edit"></code></pre>
</div>
<div id="execution-error-GETapi-reservations--reservation--edit" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-reservations--reservation--edit"></code></pre>
</div>
<form id="form-GETapi-reservations--reservation--edit" data-method="GET" data-path="api/reservations/{reservation}/edit" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('GETapi-reservations--reservation--edit', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-GETapi-reservations--reservation--edit" onclick="tryItOut('GETapi-reservations--reservation--edit');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-GETapi-reservations--reservation--edit" onclick="cancelTryOut('GETapi-reservations--reservation--edit');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-GETapi-reservations--reservation--edit" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-green">GET</small>
 <b><code>api/reservations/{reservation}/edit</code></b>
</p>
<h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
<p>
<b><code>reservation</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="reservation" data-endpoint="GETapi-reservations--reservation--edit" data-component="url" required  hidden>
<br>

</p>
</form>


## api/reservations/{reservation}




> Example request:

```bash
curl -X PUT \
    "http://localhost/api/reservations/occaecati" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://localhost/api/reservations/occaecati"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "PUT",
    headers,
}).then(response => response.json());
```


<div id="execution-results-PUTapi-reservations--reservation-" hidden>
    <blockquote>Received response<span id="execution-response-status-PUTapi-reservations--reservation-"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-PUTapi-reservations--reservation-"></code></pre>
</div>
<div id="execution-error-PUTapi-reservations--reservation-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTapi-reservations--reservation-"></code></pre>
</div>
<form id="form-PUTapi-reservations--reservation-" data-method="PUT" data-path="api/reservations/{reservation}" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('PUTapi-reservations--reservation-', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-PUTapi-reservations--reservation-" onclick="tryItOut('PUTapi-reservations--reservation-');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-PUTapi-reservations--reservation-" onclick="cancelTryOut('PUTapi-reservations--reservation-');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-PUTapi-reservations--reservation-" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-darkblue">PUT</small>
 <b><code>api/reservations/{reservation}</code></b>
</p>
<p>
<small class="badge badge-purple">PATCH</small>
 <b><code>api/reservations/{reservation}</code></b>
</p>
<h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
<p>
<b><code>reservation</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="reservation" data-endpoint="PUTapi-reservations--reservation-" data-component="url" required  hidden>
<br>

</p>
</form>


## api/reservations/{reservation}




> Example request:

```bash
curl -X DELETE \
    "http://localhost/api/reservations/modi" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://localhost/api/reservations/modi"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "DELETE",
    headers,
}).then(response => response.json());
```


<div id="execution-results-DELETEapi-reservations--reservation-" hidden>
    <blockquote>Received response<span id="execution-response-status-DELETEapi-reservations--reservation-"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-DELETEapi-reservations--reservation-"></code></pre>
</div>
<div id="execution-error-DELETEapi-reservations--reservation-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEapi-reservations--reservation-"></code></pre>
</div>
<form id="form-DELETEapi-reservations--reservation-" data-method="DELETE" data-path="api/reservations/{reservation}" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('DELETEapi-reservations--reservation-', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-DELETEapi-reservations--reservation-" onclick="tryItOut('DELETEapi-reservations--reservation-');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-DELETEapi-reservations--reservation-" onclick="cancelTryOut('DELETEapi-reservations--reservation-');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-DELETEapi-reservations--reservation-" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-red">DELETE</small>
 <b><code>api/reservations/{reservation}</code></b>
</p>
<h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
<p>
<b><code>reservation</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="reservation" data-endpoint="DELETEapi-reservations--reservation-" data-component="url" required  hidden>
<br>

</p>
</form>



