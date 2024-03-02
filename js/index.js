let count = 0;
const loadPosts = async (isSearch, searchText) => {
    handleLoadingSpinner(true);
  let url = "";
  if (isSearch) {
    url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`;
  } else {
    url = "https://openapi.programming-hero.com/api/retro-forum/posts";
  }
  try {
    const res = await fetch(url);
    const data = await res.json();
    const posts = data.posts;
    displayPosts(posts, count);
  } catch (err) {
    console.log(err);
  }
};

//! load latest Post
const loadlatestPosts = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
    );
    const data = await res.json();
    const latestPosts = data;
    console.log(latestPosts);
    displayLatestPosts(latestPosts);
  } catch (err) {
    console.log(err.message);
  }
};

//! Display Posts
const displayPosts = (posts) => {
  const postsContainer = elementById("posts-container");
  postsContainer.textContent = "";
  posts.forEach((post) => {
    const div = elementCreate("div");

    div.innerHTML = `
        <div class="bg-[#F3F3F5] mt-5 p-5 rounded-xl">
        <div class="flex gap-4 ">
        <div class="bg-white w-16 h-16 relative rounded-xl mt-1">
            ${
              post.isActive
                ? '<img class="absolute right-0" src="images/icons/greenStatus.svg">'
                : '<img class="absolute right-0" src="images/icons/redStatus.svg">'
            }
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
      <img class="cursor-pointer" onclick="handleMarkRead('${post?.title.replace(
        "'",
        "\\'"
      )}', '${post?.view_count}')" src="images/icons/read.svg">
    
      
      
      </div>
          </div>
        </div>
    </div>
        </div>
        `;
    postsContainer.appendChild(div);
    handleLoadingSpinner(false);
  });
};

//! Handle Mark Read
const handleMarkRead = async (title, viewCount) => {
  count++;
  console.log(title, viewCount);

  showMarkedNews(title, viewCount);
};

const showMarkedNews = (title, viewCount) => {
  const markedNewsContainer = elementById("mark-as-read-container");
  const div = elementCreate("div");
  div.innerHTML = `
        <div class="flex justify-between bg-white py-4 px-8 mt-3 rounded-xl">
            <h1 class="font-bold">${title}</h1>
            <div class="flex gap-2 items-center">
            <img src="images/icons/watches.svg" alt="">
            <p>${viewCount}</p>
            </div>
        </div>
    `;

  markedNewsContainer.appendChild(div);
  const markedReadCount = elementById("markedCount");
  markedReadCount.innerText = count;
};

//! Display Latest Posts
const displayLatestPosts = (posts) => {
  const latestPostsContainer = elementById("latest-posts-container");
  posts.forEach((post) => {
    const div = elementCreate("div");
    div.innerHTML = `
        <div class="card  bg-base-100 ">
        <figure class="px-5 pt-10">
          <img
            src=${post.cover_image}
            class="rounded-xl"
          />
        </figure>
        <div class="card-body">
          <div class="flex gap-4">
            <img src="images/icons/date.svg" alt="" />
            <p class="text-gray-400">${
              post.author.posted_date
                ? post.author.posted_date
                : "No Publish Date"
            }</p>
          </div>
          <h1 class="font-bold">
            ${post.title}
          </h1>
          <p class="text-gray-400">
            ${post.description}
          </p>
    
          <div class="flex items-center gap-3">
            <div >
                <img class="rounded-full w-8 h-8" src=${
                  post.profile_image
                } alt="">
            </div>
            <div>
                <h1 class="font-bold">${post.author.name}</h1>
                <p class="text-gray-400">${
                  post.author.designation ? post.author.designation : "Unknown"
                }</p>
            </div>
          </div>
        </div>
      </div>
        `;
    latestPostsContainer.appendChild(div);
  });
};

const handleSearch = () => {
    handleLoadingSpinner(true);
  const searchInputField = elementById("search-input-field");
  const inputText = searchInputField.value;
  console.log(inputText);
  const isSearch = true;
  loadPosts(isSearch, inputText);
};

const handleLoadingSpinner = (isLoading) => {
    
        const loader = elementById('loader-spinner');
        isLoading ? loader.classList.remove('hidden') : loader.classList.add('hidden');
    
}

loadPosts();
loadlatestPosts();

