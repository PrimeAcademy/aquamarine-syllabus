## The Key goes in the .Map()

The `key` is related to the `.map()` and therefore must exist in the same file. 

React uses this `key` value as a unique identifier in order to match up the array object to it's JSX on the DOM.

```js
function GalleryList({galleryList}) {
    
    return (
        <ul>
        {galleryList.map(galleryItem => 
            <GalleryItem 
                key={galleryItem.id} // key needs to be within the .map() code
                galleryItem={galleryItem}
            />
        )}
        </ul>
    );
}

```

Moving the `key` down to the rendered Component does not work, and you'll still get the warning.

```js
function GalleryItem({galleryItem}) {

    return (
        // not here!
        <li key={galleryItem.id}>{galleryItem.name}</li>
    );
}
```

## Read More

Full React Docs on Rendering Lists: https://react.dev/learn/rendering-lists