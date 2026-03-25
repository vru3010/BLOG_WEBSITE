const blogs = [
{
id:1,
title:"Future of Artificial Intelligence",
image:"https://picsum.photos/400/300?1",
author:"Andrew Ng",
date:"March 15, 2026",
category:"ai",
tags:["AI", "Machine Learning", "Technology"],
content:`Artificial Intelligence is rapidly transforming industries across the globe. From healthcare diagnostics to financial forecasting, AI systems are improving efficiency and decision-making. Machine learning models analyze vast datasets and generate insights that were once impossible.

AI is also reshaping job roles and creating new opportunities. However, concerns like data privacy and automation must be handled responsibly. Governments and organizations are working toward ethical AI practices.

In the future, AI will power smart homes, self-driving cars, and advanced assistants. Its growth is unstoppable and will significantly impact everyday life.`
},

{
id:2,
title:"Modern Web Development",
image:"https://picsum.photos/400/300?2",
author:"Evan You",
date:"March 10, 2026",
category:"programming",
tags:["Web Development", "JavaScript", "Frontend"],
content:`Modern web development focuses on performance, responsiveness, and user experience. Developers use HTML, CSS, and JavaScript to build dynamic and interactive interfaces.

Optimization techniques like lazy loading and caching improve speed. Accessibility and SEO ensure usability and visibility.

As technology evolves, developers must adapt to new tools and trends. Continuous learning is essential for building scalable applications.`
},

{
id:3,
title:"Healthy Lifestyle Tips",
image:"https://picsum.photos/400/300?3",
author:"Rujuta Diwekar",
date:"March 8, 2026",
category:"health",
tags:["Health", "Wellness", "Lifestyle"],
content:`A healthy lifestyle supports both physical and mental well-being. Regular exercise, balanced nutrition, and sleep are essential.

Mental health practices like meditation reduce stress. Consistency in habits leads to long-term benefits.

Making small improvements daily can significantly improve life quality and productivity.`
},

{
id:4,
title:"JavaScript Mastery",
image:"https://picsum.photos/400/300?4",
author:"Brendan Eich",
date:"March 5, 2026",
category:"programming",
tags:["JavaScript", "Programming", "Web Development"],
content:`JavaScript enables dynamic web experiences. It powers interactivity, animations, and real-time updates.

Understanding closures, async programming, and ES6 features is essential.

Mastering JavaScript opens many opportunities in modern web development.`
},

{
id:5,
title:"Deep Learning Basics",
image:"https://picsum.photos/400/300?5",
author:"Geoffrey Hinton",
date:"March 3, 2026",
category:"ai",
tags:["AI", "Deep Learning", "Neural Networks"],
content:`Deep learning uses neural networks to process data. It enables image recognition, NLP, and speech processing.

Training models requires data and computational power.

It plays a major role in AI advancements.`
},

{
id:6,
title:"Morning Routine Power",
image:"https://picsum.photos/400/300?6",
author:"Robin Sharma",
date:"March 1, 2026",
category:"lifestyle",
tags:["Productivity", "Lifestyle", "Habits"],
content:`A strong morning routine boosts productivity. Activities like exercise and planning improve focus.

Avoid distractions early in the day.

Consistency leads to better discipline and performance.`
},

{
id:7,
title:"Cyber Security Basics",
image:"https://picsum.photos/400/300?7",
author:"Kevin Mitnick",
date:"February 28, 2026",
category:"technology",
tags:["Security", "Technology", "Privacy"],
content:`Cybersecurity protects systems from threats. Strong passwords and updates are essential.

Awareness helps prevent attacks like phishing.

It ensures safer digital environments.`
},

{
id:8,
title:"Cloud Computing",
image:"https://picsum.photos/400/300?8",
author:"Satya Nadella",
date:"February 25, 2026",
category:"technology",
tags:["Cloud", "Technology", "Infrastructure"],
content:`Cloud computing enables data access over the internet. It offers scalability and flexibility.

Businesses use cloud for collaboration.

It is a key part of modern infrastructure.`
},

{
id:9,
title:"Work-Life Balance",
image:"https://picsum.photos/400/300?9",
author:"Arianna Huffington",
date:"February 20, 2026",
category:"lifestyle",
tags:["Work", "Lifestyle", "Balance"],
content:`Balancing work and personal life reduces stress. Time management is key.

Breaks and hobbies improve well-being.

It leads to long-term happiness and productivity.`
}
];

const container = document.getElementById("blogContainer");
const popup = document.getElementById("popup");
const popupData = document.getElementById("popupData");
const closeBtn = document.getElementById("closeBtn");
const themeToggle = document.getElementById("themeToggle");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const categoryBtns = document.querySelectorAll(".category-btn");

let currentCategory = "all";
let currentSearch = "";

/* RENDER */
function renderBlogs(){
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = currentCategory === "all" || blog.category === currentCategory;
    const matchesSearch = blog.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
                         blog.content.toLowerCase().includes(currentSearch.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(currentSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  container.innerHTML = filteredBlogs.map(b=>`
<div class="card" data-id="${b.id}">
<img src="${b.image}" alt="${b.title}">
<div class="card-content">
<h3>${b.title}</h3>
<p>${b.content.substring(0, 80)}...</p>
<div class="card-tags">
  ${b.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
</div>
<p class="meta">📅 ${b.date}</p>
</div>
</div>
`).join("");
}

renderBlogs();

/* OPEN POPUP */
container.addEventListener("click",e=>{
const card=e.target.closest(".card");
if(!card) return;

const blog=blogs.find(b=>b.id==card.dataset.id);
currentBlog = blog;

popup.classList.remove("hidden");

popupData.innerHTML=`
<h2>${blog.title}</h2>
<p>${blog.content}</p>
<div class="blog-tags-popup">
  ${blog.tags.map(tag => `<span class="tag-popup">${tag}</span>`).join("")}
</div>
<p class="meta">✍ ${blog.author} • 📅 ${blog.date}</p>
`;
});

/* CLOSE */
closeBtn.onclick=()=>popup.classList.add("hidden");
popup.onclick=(e)=>{if(e.target===popup) popup.classList.add("hidden");};

/* SEARCH */
searchBtn.onclick=()=>{
  currentSearch = searchInput.value.trim();
  renderBlogs();
};

searchInput.onkeyup=(e)=>{
  if(e.key === "Enter"){
    currentSearch = searchInput.value.trim();
    renderBlogs();
  }
};

/* CATEGORIES */
categoryBtns.forEach(btn => {
  btn.onclick=()=>{
    categoryBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    renderBlogs();
  };
});

/* THEME LOAD */
const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
themeToggle.textContent = savedTheme==="dark"?"☀️":"🌙";

/* TOGGLE */
themeToggle.onclick=()=>{
const current=document.documentElement.getAttribute("data-theme");
const newTheme=current==="dark"?"light":"dark";

document.documentElement.setAttribute("data-theme", newTheme);
localStorage.setItem("theme", newTheme);

themeToggle.textContent = newTheme==="dark"?"☀️":"🌙";
};

/* SOCIAL SHARING */
let currentBlog = null;

function shareOnTwitter(){
  if(!currentBlog) return;
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`Check out: ${currentBlog.title}`);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function shareOnLinkedIn(){
  if(!currentBlog) return;
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(currentBlog.title);
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank');
}

function shareOnFacebook(){
  if(!currentBlog) return;
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function copyLink(){
  if(!currentBlog) return;
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert("Link copied to clipboard!");
  });
}