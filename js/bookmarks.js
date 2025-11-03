async function loadBookmarks() {
  try {
    const response = await fetch("assets/bookmark_info.json");
    const bookmarks = await response.json();

    const container = document.getElementById("bookmarks");

    container.innerHTML = bookmarks
      .map(
        (bookmark) => `
        <div class="project"> 
          <h1><a class="links" href="${bookmark.url}">${bookmark.title}</a></h1>
          <h2>My Thoughts</h2>
          <p>${bookmark.thoughts.replace(/\n/g, "</p><p>")}</p>
          <span class="project-footer"><i>${bookmark.url}</i></span>   
        </div>
      `
      )
      .join(""); 

  } catch (error) {
    console.error("Error loading bookmarks:", error);
  }
}

loadBookmarks();


