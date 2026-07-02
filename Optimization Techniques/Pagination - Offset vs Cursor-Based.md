# Pagination - Offset vs Cursor-Based
Optimization is everything around us, be it technology or real-life challenges. If things are optimized, it makes life simpler, and in web development, it keeps things performant and scalable.

While there are many different types of optimizations, depending upon the area and interest of the application, what we are specifically going to discuss here is lazy loading of the data.

As the term states, lazy-loading means loading a chunk of data at a time rather than in bulk.

This is an effective technique utilized to optimize the application with limited internet coverage to request limited data that can be served faster with limited bandwidth, and the client device with limited processing capacity can render the smaller list faster.

There are many areas for lazy loading of the data over the network, but here we are specifically talking about the database or stored records.

And the first thing that comes to mind when we have to lazy-load the stored records is that we should paginate things.

Pagination is a technique of loading the data in batches, deciding the start point and the limit after that.

```javascript
page=1, limit=10;
```

In the pagination as well, we have two ways to paginate: one is page-based, where we navigate to the new page, which will pull the decided limit of records and show them.

And second is the infinite scroll, where the new data is lazy-loaded as the user scrolls through the existing records.

In the presentation, there are two types, and it is important to understand both for the frontend system design.
  - Offset-based
  - Cursor-based

Both are utilized effectively, depending on the nature of the application we are creating.

## Offset-based pagination
Offset-based pagination is a widely used technique adopted by blogs, e-commerce sites, or websites that have defined sets of records that won't often be updated.

In this request to the server, the current page and the number of records to be pulled are passed.learnersbucket.com?q=frontend+system+design&perPage=20&page=3

```javascript
learnersbucket.com?q=frontend+system+design&perPage=20&page=3
```

For example. Page = 3, count = 20.

This will skip the first 40 records, that is, 20 records of page 1 and 20 records of page 2, and will return the 20 records after that.

This is what we can expect from the server.

```javascript
{
    "articles": [...],
    "paging": {
        "total": 295,
        "page": 3,
        "pages": 15
    }
}
```

We are pulling 20 records per page, and there are 295 records, so we have 15 pages in total. That is the detail provided by the server so that we can generate the pagination accordingly on the UI.

### Advantages
- The user is aware of the number of records available, making it easier to implement the logic to paginate.
- The user will be able to jump directly to any of the pages.
- It works great where we have a defined set of records, like a PDF viewer, blog articles, or an e-commerce site.Disadvantages

### Disadvantages
- The offset-based pagination creates an ambiguity when the fresh records are added, and while you are navigating, there could be a possibility that even if you move to the next page, you will see the same records, as fresh records have been updated in the database, which will push the existing records to the next page.

### Cursor-based pagination
The way cursor-based pagination operates is by giving back a pointer to a particular dataset item. The server returns results following the provided pointer on subsequent queries.

For example, when the initial record is fetched, it returns a cursor or an identifier that will be used in the next call for fetching the records. This way, we get the new records from the last returned value.

This accepts the count or limit of records to be pulled and the cursor. For the first call, the cursor can be omitted, and then it will return the defined limit of records from the beginning.

```javascript
learnersbucket.com?q=frontend+system+design&limit=4
```

```javascript
{
    "ok": true,
    "articles": [
        {},
        {},
        {},
        {} 
    ],
    "response_metadata": {
        "next_cursor": "dXNlcjpVMEc5V0ZYTlo="
    }
}
```

And then this next cursor can be used in the subsequent request.
```javascript
learnersbucket.com?q=frontend+system+design&limit=4&dXNlcjpVMEc5V0ZYTlo%3D
```

In the URL, the equal = to symbol is encoded as %3D.

Although it has trade-offs, this method addresses the drawbacks of offset pagination.

It primarily works great on the
  - Sequential data sets.
  - Where the user does not have to jump on the particular page directly.
  - Does not want to make use of the total count of records.

### Advantages
- It is very performant and works great for the large data set, where the sequence of the records does not matter. It can be used to pull the records as per the user's navigation through the website.
- Used widely in the scroll feed or the news feed of social media sites or where loads of records have to be pulled as we scroll, like slack messaging history.

# Disadvantages
- Because the cursor-based system pulls the new records after the last record, this keeps going after the old records only. To see the fresh records, we have to start from the beginning. That is why you see options to refresh the feed on the UI of many social media sites.