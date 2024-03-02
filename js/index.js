const loadPosts = async() => {
    try {
        const url = `https://openapi.programming-hero.com/api/retro-forum/posts`
        const res = await fetch(url)
        const data = await res.json();
        const posts = data.posts;
        console.log(posts);
        displayPosts(posts);

    }
    catch (err) {
        console.log(err);
    }
}

//! Display Posts 
const displayPosts = (posts) => {
    const postsContainer = elementById('posts-container');
    posts.forEach(post => {
        const div = elementCreate('div');
        
        div.innerHTML = `
        <div class="bg-[#F3F3F5] mt-5 p-5 rounded-xl">
        <div class="flex gap-4">
        <div>
            <img src="images/icons/green.svg" alt="">
        </div>
        <div class="">
            <div class="border-b-2 pb-4 border-dashed space-y-1">
                <div class="flex gap-8">
                    <p>#${post.category}</p>
                <p>Author: ${post.author.name}</p>
                </div>
                <h1 class="font-bold">${post.title}</h1>
                <p>${post.description}</p>
                    
            </div>

          <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex gap-5 mt-3">
          <div class="flex gap-2  items-center">
              <img src="images/icons/comments.svg" alt="">
              <p>${post.comment_count}</p>
          </div>
          <div class="flex gap-2  items-center">
              <img src="images/icons/watches.svg" alt="">
              <p>${post?.view_count}</p>
          </div>
          <div class="flex gap-2  items-center">
              <img src="images/icons/timeCount.svg" alt="">
              <p>${post.posted_time} min</p>
          </div>
      </div>
      <div  class=" ">
      <img onclick="handleMarkRead('${post?.title.replace("'", "\\'")}', '${post?.view_count}')" src="images/icons/read.svg">
    
      
      
      </div>
          </div>
        </div>
    </div>
        </div>
        `
        postsContainer.appendChild(div);

    });
}


//! Handle Mark Read 
const handleMarkRead =async(title, viewCount) => {
  console.log(title, viewCount);
  showMarkedNews(title, viewCount);
}

const showMarkedNews = (title, viewCount) => {
    const markedNewsContainer = elementById('mark-as-read-container');
    const div = elementCreate('div');
    div.innerHTML = `
        <div class="flex justify-between">
            <h1>${title}</h1>
            <p>${viewCount}</p>
        </div>
    `
    markedNewsContainer.appendChild(div);
}
loadPosts();