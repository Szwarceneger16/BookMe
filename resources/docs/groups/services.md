# Services

APIs for services

## All Services


Returns every service used in company

> Example request:

```bash
curl -X GET \
    -G "http://localhost/api/services" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://localhost/api/services"
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
    "data": [
        {
            "id": 1,
            "title": "Porada fizjoterapeutyczna"
        },
        {
            "id": 2,
            "title": "Masaż"
        },
        {
            "id": 3,
            "title": "Kinezjoterapia"
        }
    ],
    "message": "Data was returned",
    "status": 200
}
```
<div id="execution-results-GETapi-services" hidden>
    <blockquote>Received response<span id="execution-response-status-GETapi-services"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-services"></code></pre>
</div>
<div id="execution-error-GETapi-services" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-services"></code></pre>
</div>
<form id="form-GETapi-services" data-method="GET" data-path="api/services" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('GETapi-services', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-GETapi-services" onclick="tryItOut('GETapi-services');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-GETapi-services" onclick="cancelTryOut('GETapi-services');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-GETapi-services" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-green">GET</small>
 <b><code>api/services</code></b>
</p>
</form>



