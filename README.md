[![build status](https://gitlab.kohn.io/ci/projects/44/status.png?ref=master)](https://gitlab.kohn.io/ci/projects/44?ref=master)

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

![Screen_Shot_2015-11-10_at_23.07.34](https://gitlab.kohn.io/mendeley-cache/client/uploads/a14239bbbbac2b1019759f580ab03420/Screen_Shot_2015-11-10_at_23.07.34.png)

### Intuitive Document Queries
The document query tab lets you run queries against the **Mendeley-Cache Server** API with auto-completion and an prettified output.

A user can filter members of the configured Mendeley Group and filter research fields that the crawler could identify.
![Screen_Shot_2015-11-10_at_23.13.03](https://gitlab.kohn.io/mendeley-cache/client/uploads/3e7080fe29cbd182cfa6d8398f580172/Screen_Shot_2015-11-10_at_23.13.03.png)

### Document Details
The cache automatically collects important meta-data of the documents.

Furthermore it uses tags for the identification of research fields and URLs for publication and conference hyperlinks.
![Screen_Shot_2015-11-10_at_23.09.39](https://gitlab.kohn.io/mendeley-cache/client/uploads/7b8ecae51b5619467f155756b00ff961/Screen_Shot_2015-11-10_at_23.09.39.png)

### Embedded Query Tags
Once the needed documents have been found, they can be automatically embedded into every website with a provided jQuery script and a generated ```<div>``` tag.
![Screen_Shot_2015-11-10_at_23.16.09](https://gitlab.kohn.io/mendeley-cache/client/uploads/cf8f106d2b7826a5d1d3105d1f9cdcc9/Screen_Shot_2015-11-10_at_23.16.09.png)

### Embedded Query Example
The embedded query will then allow you to display the most recent version of you publication list on your website.
![Screen_Shot_2015-11-10_at_23.20.00](https://gitlab.kohn.io/mendeley-cache/client/uploads/45d025e44951a1e8c25b8ce3c658fc1c/Screen_Shot_2015-11-10_at_23.20.00.png)