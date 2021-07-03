<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>Laravel Documentation</title>

    <link href="https://fonts.googleapis.com/css?family=PT+Sans&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="{{ asset("vendor/scribe/css/style.css") }}" media="screen" />
        <link rel="stylesheet" href="{{ asset("vendor/scribe/css/print.css") }}" media="print" />
        <script src="{{ asset("vendor/scribe/js/all.js") }}"></script>

        <link rel="stylesheet" href="{{ asset("vendor/scribe/css/highlight-darcula.css") }}" media="" />
        <script src="{{ asset("vendor/scribe/js/highlight.pack.js") }}"></script>
    <script>hljs.initHighlightingOnLoad();</script>

</head>

<body class="" data-languages="[&quot;bash&quot;,&quot;javascript&quot;]">
<a href="#" id="nav-button">
      <span>
        NAV
            <img src="{{ asset("vendor/scribe/images/navbar.png") }}" alt="-image" class=""/>
      </span>
</a>
<div class="tocify-wrapper">
                <div class="lang-selector">
                            <a href="#" data-language-name="bash">bash</a>
                            <a href="#" data-language-name="javascript">javascript</a>
                    </div>
        <div class="search">
        <input type="text" class="search" id="input-search" placeholder="Search">
    </div>
    <ul class="search-results"></ul>

    <ul id="toc">
    </ul>

            <ul class="toc-footer" id="toc-footer">
                            <li><a href="{{ route("scribe.postman") }}">View Postman collection</a></li>
                            <li><a href="{{ route("scribe.openapi") }}">View OpenAPI (Swagger) spec</a></li>
                            <li><a href='http://github.com/knuckleswtf/scribe'>Documentation powered by Scribe ✍</a></li>
                    </ul>
            <ul class="toc-footer" id="last-updated">
            <li>Last updated: May 25 2021</li>
        </ul>
</div>
<div class="page-wrapper">
    <div class="dark-box"></div>
    <div class="content">
        <h1>Introduction</h1>
<p>Documentation of BookMe project. Documentation contains description to every router for REST API to handle by frontend app.</p>
<p>This documentation aims to provide all the information you need to work with our API.</p>
<aside>As you scroll, you'll see code examples for working with the API in different programming languages in the dark area to the right (or as part of the content on mobile).
You can switch the language used with the tabs at the top right (or from the nav menu at the top left on mobile).</aside>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js"></script>
<script>
    var baseUrl = "http://localhost";
</script>
<script src="{{ asset("vendor/scribe/js/tryitout-2.5.3.js") }}"></script>
<blockquote>
<p>Base URL</p>
</blockquote>
<pre><code class="language-yaml">http://localhost</code></pre><h1>Authenticating requests</h1>
<p>This API is not authenticated.</p><h1>Authentication</h1>
<p>APIs for authentication</p>
<aside class="notice">That can be simple 😀</aside>
<h2>Login</h2>
<p>User login action</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "http://localhost/api/auth/login" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"email":"test@test.com","password":"12345678"}'
</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/auth/login"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "email": "test@test.com",
    "password": "12345678"
}

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (201):</p>
</blockquote>
<pre><code class="language-json">
{
"data": {
 "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYxOTEwNzAxMSwiZXhwIjoxNjE5MTEwNjExLCJuYmYiOjE2MTkxMDcwMTEsImp0aSI6IkVTS2FFU1JXNVhEenpQOWkiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.VcvuZYnspBznqEIKNHO4sLJg0zTksgXCzgofa9xepuY",
 "token_type": "bearer",
 "expires_in": 60
}
 "message": "Login success",
 "status": 201
}</code></pre>
<div id="execution-results-POSTapi-auth-login" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-auth-login"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-auth-login"></code></pre>
</div>
<div id="execution-error-POSTapi-auth-login" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-auth-login"></code></pre>
</div>
<form id="form-POSTapi-auth-login" data-method="POST" data-path="api/auth/login" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-auth-login', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-auth-login" onclick="tryItOut('POSTapi-auth-login');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-auth-login" onclick="cancelTryOut('POSTapi-auth-login');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-auth-login" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/auth/login</code></b>
</p>
<h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
<p>
<b><code>email</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="email" data-endpoint="POSTapi-auth-login" data-component="body" required  hidden>
<br>
Email field.
</p>
<p>
<b><code>password</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="password" name="password" data-endpoint="POSTapi-auth-login" data-component="body" required  hidden>
<br>
Password field.
</p>

</form>
<h2>Register</h2>
<p>User register action</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "http://localhost/api/auth/register" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"email":"test@test.pl","password":"12345678","first_name":"Jan","last_name":"Nowak","phone":"123 456 789"}'
</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/auth/register"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "email": "test@test.pl",
    "password": "12345678",
    "first_name": "Jan",
    "last_name": "Nowak",
    "phone": "123 456 789"
}

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (201):</p>
</blockquote>
<pre><code class="language-json">{
    "data": {
        "email": "test@test.pl",
        "first_name": "Jan",
        "last_name": "Nowak",
        "phone": "123 456 789",
        "updated_at": "2021-04-22T15:52:13.000000Z",
        "created_at": "2021-04-22T15:52:13.000000Z",
        "id": 1
    },
    "message": "Records was created",
    "status": 201
}</code></pre>
<div id="execution-results-POSTapi-auth-register" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-auth-register"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-auth-register"></code></pre>
</div>
<div id="execution-error-POSTapi-auth-register" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-auth-register"></code></pre>
</div>
<form id="form-POSTapi-auth-register" data-method="POST" data-path="api/auth/register" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-auth-register', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-auth-register" onclick="tryItOut('POSTapi-auth-register');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-auth-register" onclick="cancelTryOut('POSTapi-auth-register');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-auth-register" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/auth/register</code></b>
</p>
<h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
<p>
<b><code>email</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="email" data-endpoint="POSTapi-auth-register" data-component="body" required  hidden>
<br>
Email field
</p>
<p>
<b><code>password</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="password" name="password" data-endpoint="POSTapi-auth-register" data-component="body" required  hidden>
<br>
Password field.
</p>
<p>
<b><code>first_name</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="first_name" data-endpoint="POSTapi-auth-register" data-component="body" required  hidden>
<br>
First name field.
</p>
<p>
<b><code>last_name</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="last_name" data-endpoint="POSTapi-auth-register" data-component="body" required  hidden>
<br>
Last name field.
</p>
<p>
<b><code>phone</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="phone" data-endpoint="POSTapi-auth-register" data-component="body" required  hidden>
<br>
Password field.
</p>

</form>
<h2>Logout user</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "http://localhost/api/auth/logout" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/auth/logout"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "POST",
    headers,
}).then(response =&gt; response.json());</code></pre>
<div id="execution-results-POSTapi-auth-logout" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-auth-logout"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-auth-logout"></code></pre>
</div>
<div id="execution-error-POSTapi-auth-logout" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-auth-logout"></code></pre>
</div>
<form id="form-POSTapi-auth-logout" data-method="POST" data-path="api/auth/logout" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-auth-logout', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-auth-logout" onclick="tryItOut('POSTapi-auth-logout');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-auth-logout" onclick="cancelTryOut('POSTapi-auth-logout');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-auth-logout" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/auth/logout</code></b>
</p>
<p>
<label id="auth-POSTapi-auth-logout" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="POSTapi-auth-logout" data-component="header"></label>
</p>
</form>
<h2>api/auth/refresh</h2>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "http://localhost/api/auth/refresh" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/auth/refresh"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "POST",
    headers,
}).then(response =&gt; response.json());</code></pre>
<div id="execution-results-POSTapi-auth-refresh" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-auth-refresh"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-auth-refresh"></code></pre>
</div>
<div id="execution-error-POSTapi-auth-refresh" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-auth-refresh"></code></pre>
</div>
<form id="form-POSTapi-auth-refresh" data-method="POST" data-path="api/auth/refresh" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-auth-refresh', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-auth-refresh" onclick="tryItOut('POSTapi-auth-refresh');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-auth-refresh" onclick="cancelTryOut('POSTapi-auth-refresh');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-auth-refresh" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/auth/refresh</code></b>
</p>
</form><h1>Employees</h1>
<p>APIs for employees</p>
<h2>List all Employees</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>List all Employees</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X GET \
    -G "http://localhost/api/employees" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/employees"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">{
    "data": "[]",
    "message": "Data was returned",
    "status": 200
}</code></pre>
<div id="execution-results-GETapi-employees" hidden>
    <blockquote>Received response<span id="execution-response-status-GETapi-employees"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-employees"></code></pre>
</div>
<div id="execution-error-GETapi-employees" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-employees"></code></pre>
</div>
<form id="form-GETapi-employees" data-method="GET" data-path="api/employees" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('GETapi-employees', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-GETapi-employees" onclick="tryItOut('GETapi-employees');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-GETapi-employees" onclick="cancelTryOut('GETapi-employees');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-GETapi-employees" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-green">GET</small>
 <b><code>api/employees</code></b>
</p>
<p>
<label id="auth-GETapi-employees" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="GETapi-employees" data-component="header"></label>
</p>
</form>
<h2>Create employee</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>Create employee</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "http://localhost/api/employees" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"job_title":"recepcjonistka","email":"test@test.pl","password":"12345678","first_name":"Jan","last_name":"Nowak","account_type":"ADMIN","phone":"123 456 789"}'
</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/employees"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "job_title": "recepcjonistka",
    "email": "test@test.pl",
    "password": "12345678",
    "first_name": "Jan",
    "last_name": "Nowak",
    "account_type": "ADMIN",
    "phone": "123 456 789"
}

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre>
<div id="execution-results-POSTapi-employees" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-employees"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-employees"></code></pre>
</div>
<div id="execution-error-POSTapi-employees" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-employees"></code></pre>
</div>
<form id="form-POSTapi-employees" data-method="POST" data-path="api/employees" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-employees', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-employees" onclick="tryItOut('POSTapi-employees');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-employees" onclick="cancelTryOut('POSTapi-employees');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-employees" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/employees</code></b>
</p>
<p>
<label id="auth-POSTapi-employees" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="POSTapi-employees" data-component="header"></label>
</p>
<h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
<p>
<b><code>job_title</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="job_title" data-endpoint="POSTapi-employees" data-component="body" required  hidden>
<br>
Job title field
</p>
<p>
<b><code>email</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="email" data-endpoint="POSTapi-employees" data-component="body" required  hidden>
<br>
Email field
</p>
<p>
<b><code>password</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="password" name="password" data-endpoint="POSTapi-employees" data-component="body" required  hidden>
<br>
Password field.
</p>
<p>
<b><code>first_name</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="first_name" data-endpoint="POSTapi-employees" data-component="body" required  hidden>
<br>
First name field.
</p>
<p>
<b><code>last_name</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="last_name" data-endpoint="POSTapi-employees" data-component="body" required  hidden>
<br>
Last name field.
</p>
<p>
<b><code>account_type</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="account_type" data-endpoint="POSTapi-employees" data-component="body" required  hidden>
<br>
Account type field
</p>
<p>
<b><code>phone</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="phone" data-endpoint="POSTapi-employees" data-component="body" required  hidden>
<br>
Password field.
</p>

</form>
<h2>List employees by service_id</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>List employees by service_id</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "http://localhost/api/get-employees-by-service" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"service_id":1}'
</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/get-employees-by-service"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "service_id": 1
}

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">{
    "data": "[]",
    "message": "Data was returned",
    "status": 200
}</code></pre>
<div id="execution-results-POSTapi-get-employees-by-service" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-get-employees-by-service"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-get-employees-by-service"></code></pre>
</div>
<div id="execution-error-POSTapi-get-employees-by-service" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-get-employees-by-service"></code></pre>
</div>
<form id="form-POSTapi-get-employees-by-service" data-method="POST" data-path="api/get-employees-by-service" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-get-employees-by-service', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-get-employees-by-service" onclick="tryItOut('POSTapi-get-employees-by-service');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-get-employees-by-service" onclick="cancelTryOut('POSTapi-get-employees-by-service');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-get-employees-by-service" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/get-employees-by-service</code></b>
</p>
<p>
<label id="auth-POSTapi-get-employees-by-service" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="POSTapi-get-employees-by-service" data-component="header"></label>
</p>
<h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
<p>
<b><code>service_id</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="service_id" data-endpoint="POSTapi-get-employees-by-service" data-component="body" required  hidden>
<br>
Service id.
</p>

</form><h1>Endpoints</h1>
<h2>api/places</h2>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X GET \
    -G "http://localhost/api/places" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/places"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (404):</p>
</blockquote>
<pre><code class="language-json">{
    "status": "Authorization Token not found"
}</code></pre>
<div id="execution-results-GETapi-places" hidden>
    <blockquote>Received response<span id="execution-response-status-GETapi-places"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-places"></code></pre>
</div>
<div id="execution-error-GETapi-places" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-places"></code></pre>
</div>
<form id="form-GETapi-places" data-method="GET" data-path="api/places" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('GETapi-places', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-GETapi-places" onclick="tryItOut('GETapi-places');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-GETapi-places" onclick="cancelTryOut('GETapi-places');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-GETapi-places" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-green">GET</small>
 <b><code>api/places</code></b>
</p>
</form>
<h2>api/places</h2>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "http://localhost/api/places" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"name":"iusto"}'
</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/places"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "name": "iusto"
}

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre>
<div id="execution-results-POSTapi-places" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-places"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-places"></code></pre>
</div>
<div id="execution-error-POSTapi-places" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-places"></code></pre>
</div>
<form id="form-POSTapi-places" data-method="POST" data-path="api/places" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-places', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-places" onclick="tryItOut('POSTapi-places');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-places" onclick="cancelTryOut('POSTapi-places');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-places" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/places</code></b>
</p>
<h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
<p>
<b><code>name</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="name" data-endpoint="POSTapi-places" data-component="body" required  hidden>
<br>

</p>

</form>
<h2>api/places/{id}</h2>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X DELETE \
    "http://localhost/api/places/sit" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/places/sit"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre>
<div id="execution-results-DELETEapi-places--id-" hidden>
    <blockquote>Received response<span id="execution-response-status-DELETEapi-places--id-"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-DELETEapi-places--id-"></code></pre>
</div>
<div id="execution-error-DELETEapi-places--id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEapi-places--id-"></code></pre>
</div>
<form id="form-DELETEapi-places--id-" data-method="DELETE" data-path="api/places/{id}" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('DELETEapi-places--id-', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-DELETEapi-places--id-" onclick="tryItOut('DELETEapi-places--id-');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-DELETEapi-places--id-" onclick="cancelTryOut('DELETEapi-places--id-');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-DELETEapi-places--id-" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-red">DELETE</small>
 <b><code>api/places/{id}</code></b>
</p>
<h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
<p>
<b><code>id</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="id" data-endpoint="DELETEapi-places--id-" data-component="url" required  hidden>
<br>

</p>
</form>
<h2>api/places/{id}</h2>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X PUT \
    "http://localhost/api/places/dolores" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"name":"ratione"}'
</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/places/dolores"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "name": "ratione"
}

fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre>
<div id="execution-results-PUTapi-places--id-" hidden>
    <blockquote>Received response<span id="execution-response-status-PUTapi-places--id-"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-PUTapi-places--id-"></code></pre>
</div>
<div id="execution-error-PUTapi-places--id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTapi-places--id-"></code></pre>
</div>
<form id="form-PUTapi-places--id-" data-method="PUT" data-path="api/places/{id}" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('PUTapi-places--id-', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-PUTapi-places--id-" onclick="tryItOut('PUTapi-places--id-');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-PUTapi-places--id-" onclick="cancelTryOut('PUTapi-places--id-');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-PUTapi-places--id-" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-darkblue">PUT</small>
 <b><code>api/places/{id}</code></b>
</p>
<h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
<p>
<b><code>id</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="id" data-endpoint="PUTapi-places--id-" data-component="url" required  hidden>
<br>

</p>
<h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
<p>
<b><code>name</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="name" data-endpoint="PUTapi-places--id-" data-component="body" required  hidden>
<br>

</p>

</form><h1>Payments</h1>
<p>APIs for using payments</p>
<h2>Create Payment Intent</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>Create Payment Intent and link payment to reservation</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "http://localhost/api/payments/create-payment-intent" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"reservation_id":1}'
</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/payments/create-payment-intent"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "reservation_id": 1
}

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">
{
   "data": {
         "client_secret": "pi_123dsdsvsfdsfds",
     },
   "message": "Records was showed",
   "status": 201
   }</code></pre>
<div id="execution-results-POSTapi-payments-create-payment-intent" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-payments-create-payment-intent"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-payments-create-payment-intent"></code></pre>
</div>
<div id="execution-error-POSTapi-payments-create-payment-intent" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-payments-create-payment-intent"></code></pre>
</div>
<form id="form-POSTapi-payments-create-payment-intent" data-method="POST" data-path="api/payments/create-payment-intent" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-payments-create-payment-intent', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-payments-create-payment-intent" onclick="tryItOut('POSTapi-payments-create-payment-intent');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-payments-create-payment-intent" onclick="cancelTryOut('POSTapi-payments-create-payment-intent');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-payments-create-payment-intent" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/payments/create-payment-intent</code></b>
</p>
<p>
<label id="auth-POSTapi-payments-create-payment-intent" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="POSTapi-payments-create-payment-intent" data-component="header"></label>
</p>
<h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
<p>
<b><code>reservation_id</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="reservation_id" data-endpoint="POSTapi-payments-create-payment-intent" data-component="body" required  hidden>
<br>
Current reservation id.
</p>

</form>
<h2>Handle response</h2>
<p>Handling and store data returning from stripe</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X GET \
    -G "http://localhost/api/payments/handle-payment-response?payment_intent=deleniti&amp;payment_intent_client_secret=deleniti&amp;redirect_status=non" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/payments/handle-payment-response"
);

let params = {
    "payment_intent": "deleniti",
    "payment_intent_client_secret": "deleniti",
    "redirect_status": "non",
};
Object.keys(params)
    .forEach(key =&gt; url.searchParams.append(key, params[key]));

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (302):</p>
</blockquote>
<pre><code class="language-json">
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8" /&gt;
        &lt;meta http-equiv="refresh" content="0;url='http://localhost/register/failed'" /&gt;

        &lt;title&gt;Redirecting to http://localhost/register/failed&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        Redirecting to &lt;a href="http://localhost/register/failed"&gt;http://localhost/register/failed&lt;/a&gt;.
    &lt;/body&gt;
&lt;/html&gt;</code></pre>
<div id="execution-results-GETapi-payments-handle-payment-response" hidden>
    <blockquote>Received response<span id="execution-response-status-GETapi-payments-handle-payment-response"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-payments-handle-payment-response"></code></pre>
</div>
<div id="execution-error-GETapi-payments-handle-payment-response" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-payments-handle-payment-response"></code></pre>
</div>
<form id="form-GETapi-payments-handle-payment-response" data-method="GET" data-path="api/payments/handle-payment-response" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('GETapi-payments-handle-payment-response', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-GETapi-payments-handle-payment-response" onclick="tryItOut('GETapi-payments-handle-payment-response');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-GETapi-payments-handle-payment-response" onclick="cancelTryOut('GETapi-payments-handle-payment-response');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-GETapi-payments-handle-payment-response" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-green">GET</small>
 <b><code>api/payments/handle-payment-response</code></b>
</p>
<h4 class="fancy-heading-panel"><b>Query Parameters</b></h4>
<p>
<b><code>payment_intent</code></b>&nbsp;&nbsp;<small>string</small>     <i>optional</i> &nbsp;
<input type="text" name="payment_intent" data-endpoint="GETapi-payments-handle-payment-response" data-component="query"  hidden>
<br>

</p>
<p>
<b><code>payment_intent_client_secret</code></b>&nbsp;&nbsp;<small>string</small>     <i>optional</i> &nbsp;
<input type="text" name="payment_intent_client_secret" data-endpoint="GETapi-payments-handle-payment-response" data-component="query"  hidden>
<br>

</p>
<p>
<b><code>redirect_status</code></b>&nbsp;&nbsp;<small>string</small>     <i>optional</i> &nbsp;
<input type="text" name="redirect_status" data-endpoint="GETapi-payments-handle-payment-response" data-component="query"  hidden>
<br>

</p>
</form><h1>Reservations</h1>
<p>APIs for using Reservations</p>
<h2>List Client&#039;s Active Reservations.</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>Returning all reservations which can be canceled.</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X GET \
    -G "http://localhost/api/user/client-active-reservations" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/user/client-active-reservations"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">{
    "data": [
        {
            "id": 32,
            "service": "Porada fizjoterapeutyczna",
            "employee": "Kuba Nowak",
            "date": "2021-05-13 08:00:00",
            "time": 25
        },
        {
            "id": 34,
            "service": "Kinezjoterapia",
            "employee": "Kuba Nowak",
            "date": "2021-05-17 17:13:20",
            "time": 33.333333333333336
        },
        {
            "id": 35,
            "service": "Porada fizjoterapeutyczna",
            "employee": "Kuba Nowak",
            "date": "2021-05-20 17:30:00",
            "time": 25
        }
    ],
    "message": "Data was returned",
    "status": 200
}</code></pre>
<div id="execution-results-GETapi-user-client-active-reservations" hidden>
    <blockquote>Received response<span id="execution-response-status-GETapi-user-client-active-reservations"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-user-client-active-reservations"></code></pre>
</div>
<div id="execution-error-GETapi-user-client-active-reservations" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-user-client-active-reservations"></code></pre>
</div>
<form id="form-GETapi-user-client-active-reservations" data-method="GET" data-path="api/user/client-active-reservations" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('GETapi-user-client-active-reservations', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-GETapi-user-client-active-reservations" onclick="tryItOut('GETapi-user-client-active-reservations');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-GETapi-user-client-active-reservations" onclick="cancelTryOut('GETapi-user-client-active-reservations');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-GETapi-user-client-active-reservations" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-green">GET</small>
 <b><code>api/user/client-active-reservations</code></b>
</p>
<p>
<label id="auth-GETapi-user-client-active-reservations" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="GETapi-user-client-active-reservations" data-component="header"></label>
</p>
</form>
<h2>List Client&#039;s Every Reservations</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>List all reservations also this finised and canceled.</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X GET \
    -G "http://localhost/api/user/client-every-reservations" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/user/client-every-reservations"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">
{
   "data": "[
      {
      "id": 26,
      "service": "Porada fizjoterapeutyczna",
      "employee": "Kuba Nowak",
      "date": "2021-05-12 15:30:00",
      "time": 25,
      "active": "UNACTIVE",
      "payment_status": "REFFUNDED"
      },
      {
      "id": 27,
      "service": "Porada fizjoterapeutyczna",
      "employee": "Kuba Nowak",
      "date": "2021-05-12 13:35:00",
      "time": 25,
      "active": "UNACTIVE",
      "payment_status": null
      },
      {
      "id": 28,
      "service": "Porada fizjoterapeutyczna",
      "employee": "Kuba Nowak",
      "date": "2021-05-12 17:35:00",
      "time": 25,
      "active": "UNACTIVE",
      "payment_status": "REFFUNDED"
      }]",
   "message": "Data was returned",
   "status": 200
   }</code></pre>
<div id="execution-results-GETapi-user-client-every-reservations" hidden>
    <blockquote>Received response<span id="execution-response-status-GETapi-user-client-every-reservations"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-user-client-every-reservations"></code></pre>
</div>
<div id="execution-error-GETapi-user-client-every-reservations" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-user-client-every-reservations"></code></pre>
</div>
<form id="form-GETapi-user-client-every-reservations" data-method="GET" data-path="api/user/client-every-reservations" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('GETapi-user-client-every-reservations', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-GETapi-user-client-every-reservations" onclick="tryItOut('GETapi-user-client-every-reservations');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-GETapi-user-client-every-reservations" onclick="cancelTryOut('GETapi-user-client-every-reservations');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-GETapi-user-client-every-reservations" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-green">GET</small>
 <b><code>api/user/client-every-reservations</code></b>
</p>
<p>
<label id="auth-GETapi-user-client-every-reservations" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="GETapi-user-client-every-reservations" data-component="header"></label>
</p>
</form>
<h2>Cancel reservation</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>List available reservations</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "http://localhost/api/user/cancel-reservation" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"reservation_id":1}'
</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/user/cancel-reservation"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "reservation_id": 1
}

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">{
    "data": "true",
    "message": "Records was updated",
    "status": 200
}</code></pre>
<div id="execution-results-POSTapi-user-cancel-reservation" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-user-cancel-reservation"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-user-cancel-reservation"></code></pre>
</div>
<div id="execution-error-POSTapi-user-cancel-reservation" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-user-cancel-reservation"></code></pre>
</div>
<form id="form-POSTapi-user-cancel-reservation" data-method="POST" data-path="api/user/cancel-reservation" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-user-cancel-reservation', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-user-cancel-reservation" onclick="tryItOut('POSTapi-user-cancel-reservation');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-user-cancel-reservation" onclick="cancelTryOut('POSTapi-user-cancel-reservation');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-user-cancel-reservation" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/user/cancel-reservation</code></b>
</p>
<p>
<label id="auth-POSTapi-user-cancel-reservation" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="POSTapi-user-cancel-reservation" data-component="header"></label>
</p>
<h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
<p>
<b><code>reservation_id</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="reservation_id" data-endpoint="POSTapi-user-cancel-reservation" data-component="body" required  hidden>
<br>
Reservation id.
</p>

</form>
<h2>Store new reservation</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>Store new reservation</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "http://localhost/api/reservations" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"datetime_start":"\"2019-09-18T19:00:00Z\"","datetime_end":"\"2019-09-18T19:30:00Z\"","client_id":1,"employee_id":1,"place_id":1,"service_id":1}'
</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/reservations"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "datetime_start": "\"2019-09-18T19:00:00Z\"",
    "datetime_end": "\"2019-09-18T19:30:00Z\"",
    "client_id": 1,
    "employee_id": 1,
    "place_id": 1,
    "service_id": 1
}

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">{
    "data": "[]",
    "message": "Records was stored",
    "status": 201
}</code></pre>
<div id="execution-results-POSTapi-reservations" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-reservations"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-reservations"></code></pre>
</div>
<div id="execution-error-POSTapi-reservations" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-reservations"></code></pre>
</div>
<form id="form-POSTapi-reservations" data-method="POST" data-path="api/reservations" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-reservations', this);">
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
<p>
<label id="auth-POSTapi-reservations" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="POSTapi-reservations" data-component="header"></label>
</p>
<h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
<p>
<b><code>datetime_start</code></b>&nbsp;&nbsp;<small>date</small>  &nbsp;
<input type="text" name="datetime_start" data-endpoint="POSTapi-reservations" data-component="body" required  hidden>
<br>
Datetime start reservation.
</p>
<p>
<b><code>datetime_end</code></b>&nbsp;&nbsp;<small>date</small>  &nbsp;
<input type="text" name="datetime_end" data-endpoint="POSTapi-reservations" data-component="body" required  hidden>
<br>
Datetime end password.
</p>
<p>
<b><code>client_id</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="client_id" data-endpoint="POSTapi-reservations" data-component="body" required  hidden>
<br>
Client id.
</p>
<p>
<b><code>employee_id</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="employee_id" data-endpoint="POSTapi-reservations" data-component="body" required  hidden>
<br>
Employee id.
</p>
<p>
<b><code>place_id</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="place_id" data-endpoint="POSTapi-reservations" data-component="body" required  hidden>
<br>
Place id.
</p>
<p>
<b><code>service_id</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="service_id" data-endpoint="POSTapi-reservations" data-component="body" required  hidden>
<br>
Service id.
</p>

</form>
<h2>List available reservations</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>List available reservations</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "http://localhost/api/get-available-reservations" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"employee_id":1,"service_id":1}'
</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/get-available-reservations"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "employee_id": 1,
    "service_id": 1
}

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">{
    "data": "[]",
    "message": "Data was returned",
    "status": 200
}</code></pre>
<div id="execution-results-POSTapi-get-available-reservations" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-get-available-reservations"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-get-available-reservations"></code></pre>
</div>
<div id="execution-error-POSTapi-get-available-reservations" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-get-available-reservations"></code></pre>
</div>
<form id="form-POSTapi-get-available-reservations" data-method="POST" data-path="api/get-available-reservations" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-get-available-reservations', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-get-available-reservations" onclick="tryItOut('POSTapi-get-available-reservations');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-get-available-reservations" onclick="cancelTryOut('POSTapi-get-available-reservations');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-get-available-reservations" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/get-available-reservations</code></b>
</p>
<p>
<label id="auth-POSTapi-get-available-reservations" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="POSTapi-get-available-reservations" data-component="header"></label>
</p>
<h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
<p>
<b><code>employee_id</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="employee_id" data-endpoint="POSTapi-get-available-reservations" data-component="body" required  hidden>
<br>
Employee id.
</p>
<p>
<b><code>service_id</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="service_id" data-endpoint="POSTapi-get-available-reservations" data-component="body" required  hidden>
<br>
Service id.
</p>

</form>
<h2>List all reservation (daily)</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>List all reservation (daily)</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "http://localhost/api/get-all-reservations" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"date":"\"2019-09-18\"","employee_id":1}'
</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/get-all-reservations"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "date": "\"2019-09-18\"",
    "employee_id": 1
}

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre>
<div id="execution-results-POSTapi-get-all-reservations" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-get-all-reservations"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-get-all-reservations"></code></pre>
</div>
<div id="execution-error-POSTapi-get-all-reservations" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-get-all-reservations"></code></pre>
</div>
<form id="form-POSTapi-get-all-reservations" data-method="POST" data-path="api/get-all-reservations" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-get-all-reservations', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-get-all-reservations" onclick="tryItOut('POSTapi-get-all-reservations');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-get-all-reservations" onclick="cancelTryOut('POSTapi-get-all-reservations');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-get-all-reservations" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/get-all-reservations</code></b>
</p>
<p>
<label id="auth-POSTapi-get-all-reservations" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="POSTapi-get-all-reservations" data-component="header"></label>
</p>
<h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
<p>
<b><code>date</code></b>&nbsp;&nbsp;<small>date</small>  &nbsp;
<input type="text" name="date" data-endpoint="POSTapi-get-all-reservations" data-component="body" required  hidden>
<br>
Date.
</p>
<p>
<b><code>employee_id</code></b>&nbsp;&nbsp;<small>integer</small>     <i>optional</i> &nbsp;
<input type="number" name="employee_id" data-endpoint="POSTapi-get-all-reservations" data-component="body"  hidden>
<br>
Employee_id.
</p>

</form><h1>Services</h1>
<p>APIs for services</p>
<h2>List all Services</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>List all Services</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X GET \
    -G "http://localhost/api/services" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/services"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">{
    "data": "[]",
    "message": "Data was returned",
    "status": 200
}</code></pre>
<div id="execution-results-GETapi-services" hidden>
    <blockquote>Received response<span id="execution-response-status-GETapi-services"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-services"></code></pre>
</div>
<div id="execution-error-GETapi-services" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-services"></code></pre>
</div>
<form id="form-GETapi-services" data-method="GET" data-path="api/services" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('GETapi-services', this);">
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
<p>
<label id="auth-GETapi-services" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="GETapi-services" data-component="header"></label>
</p>
</form><h1>User</h1>
<p>APIs for users</p>
<h2>Check password</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>Returns data about current authenticated user</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "http://localhost/api/user/check-password" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"password":"1235678"}'
</code></pre>
<pre><code class="language-javascript">const url = new URL(
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
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">{
    "data": "true",
    "message": "Record was returned",
    "status": 200
}</code></pre>
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
<h2>Current User</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>Returns data about current authenticated user</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X GET \
    -G "http://localhost/api/user/me" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/user/me"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">{
    "data": {
        "first_name": "Jan",
        "last_name": "Nowak",
        "email": "test@test.pl"
    },
    "message": "Record was returned",
    "status": 200
}</code></pre>
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
<h2>Change password</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>Change password current logged user</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "http://localhost/api/user/change-password" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"password":"1235678","new_password":"1235678"}'
</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/user/change-password"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "password": "1235678",
    "new_password": "1235678"
}

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">{
    "data": "[]",
    "message": "Records was updated",
    "status": 201
}</code></pre>
<div id="execution-results-POSTapi-user-change-password" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-user-change-password"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-user-change-password"></code></pre>
</div>
<div id="execution-error-POSTapi-user-change-password" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-user-change-password"></code></pre>
</div>
<form id="form-POSTapi-user-change-password" data-method="POST" data-path="api/user/change-password" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-user-change-password', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-user-change-password" onclick="tryItOut('POSTapi-user-change-password');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-user-change-password" onclick="cancelTryOut('POSTapi-user-change-password');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-user-change-password" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/user/change-password</code></b>
</p>
<p>
<label id="auth-POSTapi-user-change-password" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="POSTapi-user-change-password" data-component="header"></label>
</p>
<h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
<p>
<b><code>password</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="password" name="password" data-endpoint="POSTapi-user-change-password" data-component="body" required  hidden>
<br>
User's current password.
</p>
<p>
<b><code>new_password</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="password" name="new_password" data-endpoint="POSTapi-user-change-password" data-component="body" required  hidden>
<br>
User's new password.
</p>

</form>
<h2>Update phone and email</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>Update phone and email current user logged</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "http://localhost/api/user/update-data" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"email":"test@test.pl","phone":12345678}'
</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/user/update-data"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "email": "test@test.pl",
    "phone": 12345678
}

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">{
    "data": "[]",
    "message": "Records was updated",
    "status": 201
}</code></pre>
<div id="execution-results-POSTapi-user-update-data" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-user-update-data"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-user-update-data"></code></pre>
</div>
<div id="execution-error-POSTapi-user-update-data" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-user-update-data"></code></pre>
</div>
<form id="form-POSTapi-user-update-data" data-method="POST" data-path="api/user/update-data" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-user-update-data', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-user-update-data" onclick="tryItOut('POSTapi-user-update-data');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-user-update-data" onclick="cancelTryOut('POSTapi-user-update-data');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-user-update-data" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/user/update-data</code></b>
</p>
<p>
<label id="auth-POSTapi-user-update-data" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="POSTapi-user-update-data" data-component="header"></label>
</p>
<h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
<p>
<b><code>email</code></b>&nbsp;&nbsp;<small>email</small>     <i>optional</i> &nbsp;
<input type="text" name="email" data-endpoint="POSTapi-user-update-data" data-component="body"  hidden>
<br>
Email field
</p>
<p>
<b><code>phone</code></b>&nbsp;&nbsp;<small>integer</small>     <i>optional</i> &nbsp;
<input type="number" name="phone" data-endpoint="POSTapi-user-update-data" data-component="body"  hidden>
<br>
Phone field.
</p>

</form>
<h2>User dashboard info</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>Get info to dashboard</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X GET \
    -G "http://localhost/api/user/dashboard-info" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/user/dashboard-info"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">{
    "data": {
        "user_reservations_count": 0,
        "all_reservations_count": 0
    },
    "message": "Records was showed",
    "status": 201
}</code></pre>
<div id="execution-results-GETapi-user-dashboard-info" hidden>
    <blockquote>Received response<span id="execution-response-status-GETapi-user-dashboard-info"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-user-dashboard-info"></code></pre>
</div>
<div id="execution-error-GETapi-user-dashboard-info" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-user-dashboard-info"></code></pre>
</div>
<form id="form-GETapi-user-dashboard-info" data-method="GET" data-path="api/user/dashboard-info" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('GETapi-user-dashboard-info', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-GETapi-user-dashboard-info" onclick="tryItOut('GETapi-user-dashboard-info');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-GETapi-user-dashboard-info" onclick="cancelTryOut('GETapi-user-dashboard-info');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-GETapi-user-dashboard-info" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-green">GET</small>
 <b><code>api/user/dashboard-info</code></b>
</p>
<p>
<label id="auth-GETapi-user-dashboard-info" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="GETapi-user-dashboard-info" data-component="header"></label>
</p>
</form><h1>WorkHour</h1>
<p>APIs for using WorkHour</p>
<h2>Store new workHours</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>Store new workHours</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "http://localhost/api/workHours" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"datetime_start":"\"2019-09-18T19:00:52Z\"","datetime_end":"\"2019-09-18T19:30:52Z\"","employee_id":1,"place_id":1}'
</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/workHours"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "datetime_start": "\"2019-09-18T19:00:52Z\"",
    "datetime_end": "\"2019-09-18T19:30:52Z\"",
    "employee_id": 1,
    "place_id": 1
}

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">{
    "data": "[]",
    "message": "Records was stored",
    "status": 201
}</code></pre>
<div id="execution-results-POSTapi-workHours" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-workHours"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-workHours"></code></pre>
</div>
<div id="execution-error-POSTapi-workHours" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-workHours"></code></pre>
</div>
<form id="form-POSTapi-workHours" data-method="POST" data-path="api/workHours" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-workHours', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-workHours" onclick="tryItOut('POSTapi-workHours');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-workHours" onclick="cancelTryOut('POSTapi-workHours');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-workHours" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/workHours</code></b>
</p>
<p>
<label id="auth-POSTapi-workHours" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="POSTapi-workHours" data-component="header"></label>
</p>
<h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
<p>
<b><code>datetime_start</code></b>&nbsp;&nbsp;<small>date</small>  &nbsp;
<input type="text" name="datetime_start" data-endpoint="POSTapi-workHours" data-component="body" required  hidden>
<br>
Datetime start reservation.
</p>
<p>
<b><code>datetime_end</code></b>&nbsp;&nbsp;<small>date</small>  &nbsp;
<input type="text" name="datetime_end" data-endpoint="POSTapi-workHours" data-component="body" required  hidden>
<br>
Datetime end password.
</p>
<p>
<b><code>employee_id</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="employee_id" data-endpoint="POSTapi-workHours" data-component="body" required  hidden>
<br>
Employee id.
</p>
<p>
<b><code>place_id</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="place_id" data-endpoint="POSTapi-workHours" data-component="body" required  hidden>
<br>
Place id.
</p>

</form>
<h2>List all Workhours (daily)</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>List all Workhours (daily)</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "http://localhost/api/list-workhours" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"date":"\"2019-09-18\"","employee_id":1}'
</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/list-workhours"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "date": "\"2019-09-18\"",
    "employee_id": 1
}

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre>
<div id="execution-results-POSTapi-list-workhours" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-list-workhours"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-list-workhours"></code></pre>
</div>
<div id="execution-error-POSTapi-list-workhours" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-list-workhours"></code></pre>
</div>
<form id="form-POSTapi-list-workhours" data-method="POST" data-path="api/list-workhours" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-list-workhours', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-list-workhours" onclick="tryItOut('POSTapi-list-workhours');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-list-workhours" onclick="cancelTryOut('POSTapi-list-workhours');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-list-workhours" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/list-workhours</code></b>
</p>
<p>
<label id="auth-POSTapi-list-workhours" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="POSTapi-list-workhours" data-component="header"></label>
</p>
<h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
<p>
<b><code>date</code></b>&nbsp;&nbsp;<small>date</small>  &nbsp;
<input type="text" name="date" data-endpoint="POSTapi-list-workhours" data-component="body" required  hidden>
<br>
Date.
</p>
<p>
<b><code>employee_id</code></b>&nbsp;&nbsp;<small>integer</small>     <i>optional</i> &nbsp;
<input type="number" name="employee_id" data-endpoint="POSTapi-list-workhours" data-component="body"  hidden>
<br>
Employee_id.
</p>

</form>
    </div>
    <div class="dark-box">
                    <div class="lang-selector">
                                    <a href="#" data-language-name="bash">bash</a>
                                    <a href="#" data-language-name="javascript">javascript</a>
                            </div>
            </div>
</div>
<script>
    $(function () {
        var languages = ["bash","javascript"];
        setupLanguages(languages);
    });
</script>
</body>
</html>