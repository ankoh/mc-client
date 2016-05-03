[![build status](https://gitlab.kohn.io/ankoh/mc-client/badges/master/build.svg)](https://gitlab.kohn.io/ankoh/mc-client/commits/master)<Paste>

# Mendeley-Cache Client

The **Mendeley-Cache Client** is an AngularJS application that consumes the API served by a **Mendeley-Cache Server**.

Similar to the server it can be easily deployed with a single ```docker-compose``` command.

## Build
As I haven't uploaded the images to the Docker Hub yet, you need to build the image yourself.

Run the following ```docker``` command to build your own ```Mendeley-Cache Client``` image.

```bash
docker build -t <yourname>/mendeleycache-client .
```
## Deploy
Replace the following substrings in the file ```compose.yml``` with the respective values.


Substring | Purpose
--- | ---
```ankoh``` | ```<yourname>``` of the build command
```:port``` | Port of the **Mendeley-Cache Client**
```:mchost``` | Hostname of the **Mendeley-Cache Server**
```:mcport``` | Port of the **Mendeley-Cache Server**

Once that is done, just deploy the previously built image with ```docker-compose```.

```bash
docker-compose -f compose.yml up -d
```

## Screenshots

The following screenshots show some nice features of the **Mendeley-Cache Client**.

### Cache Status Page
The status page tabs gives you informations about the overall server status.

It shows the time of the last update (which is quite useful in case of automatic cron jobs) and the number of entities in the important SQL tables.
![status](/shots/status.png?raw=true "Status")

### Intuitive Document Queries
The document query tab lets you run queries against the **Mendeley-Cache Server** API with auto-completion and an prettified output.

A user can filter members of the configured Mendeley Group and filter research fields that the crawler could identify.
![autocompletion](/shots/autocompletion.png?raw=true "Autocompletion")

### Document Details
The cache automatically collects important meta-data of the documents.

Furthermore it uses tags for the identification of research fields and URLs for publication and conference hyperlinks.
![details](/shots/details.png?raw=true "Details")

### Embedded Query Tags
Once the needed documents have been found, they can be automatically embedded into every website with a provided jQuery script and a generated ```<div>``` tag.
![querytags](/shots/query-tags.png?raw=true "Query Tags")

### Embedded Query Example
The embedded query will then allow you to display the most recent version of you publication list on your website.
![queryexample](/shots/query-example.png?raw=true "Query Example")
