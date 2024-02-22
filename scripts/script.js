let postUserObjects = [];
let fetchingData = false;

let skip= 0;
window.addEventListener('scroll', () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !app.style.display &&
      !fetchingData)
      {
      fetchingData = true;
      fetchAndParse();
    }
});


async function fetchAndParse() {
    try {
        postUserObjects = [];

        const [response1, response2, response3] = await Promise.all([
            fetch(`https://dummyjson.com/posts?limit=30&skip=${skip}`),
            fetch('https://dummyjson.com/users?limit=100'),
            fetch('https://dummyjson.com/comments?limit=340')
        ]);

        const  {posts}  = await response1.json();
        const  {users}  = await response2.json();
        const  {comments}  = await response3.json();

        const newPostUserObjects = createUserObjects(posts, users, comments);
        postUserObjects.push(...newPostUserObjects);
        createTemplate(postUserObjects);
        console.log(postUserObjects);

        skip += posts.length;
        fetchingData = false;
    } catch (error) {
        console.error('Error:', error);
        fetchingData = false;
    }
}




function createUserObjects(posts, users, comments) {
    const postUserObjects = [];

    posts.forEach(post => {
        const user = users.find(user => user.id === post.userId);
        if (user) {
            const postComments = comments.filter(comment => comment.postId === post.id);

            postUserObjects.push({
                postId: post.id,
                title: post.title,
                reaction: post.reactions,
                body: post.body,
                username: user.username,
                firstname: user.firstName,
                lastname: user.lastName,
                email: user.email,
                picture: user.image,
                comments: postComments.map(comment => {
                    const commentUser = users.find(u => u.id === comment.user.id);
                    const commentPic = commentUser ? commentUser.image : '';
                    return {
                        commentsId: comment.id,
                        commentBody: comment.body,
                        commentUser: comment.user.username,
                        commentPic: commentPic
                    };
                })
            });
        }
    });

    return postUserObjects;
}



function showComments(element) {
    const commentsList = element.parentNode.nextElementSibling;
    commentsList.classList.toggle('hide');
}


function showModal(firstname, lastname, email) {
    const modalHtml = `
      <div class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <p>First Name: ${firstname}</p>
          <p>Last Name: ${lastname}</p>
          <p>Email: ${email}</p>
        </div>
      </div>
    `;


    document.body.insertAdjacentHTML('afterbegin', modalHtml);


    var modal = document.querySelector(".modal");


    var span = modal.querySelector(".close");


    modal.style.display = "block";


    span.onclick = function () {
        modal.style.display = "none";

        modal.remove();
    };
}


function createTemplate(postUserObjects) {
    const htmlTemplate = postUserObjects.map(postUser => {
        const commentsHtml = postUser.comments?.map(comment => {
            return `
                <li>
                    <div class="comment-info">
                        <img class="compic" src="${comment.commentPic}">
                        <span class="username">${comment.commentUser}</span>
                    </div>
                    <div class="final">${comment.commentBody}</div>
                </li>`;
        }).join("") || "";

        return `
            <article class="posts">
                <ul class="title">
                    <li><h2 class="postt">${postUser.title}</h2></li>
                    <li><img class="profile" src="${postUser.picture}"></li>
                    <li><span id="pop" onclick="showModal('${postUser.firstname}','${postUser.lastname}', '${postUser.email}')">${postUser.username}</span></li>
                    <p class="body">${postUser.body}</p>
                    <ul class="bottom">
                    <li id="letter"> ${postUser.reaction}
                    <span>
                    <svg height="45px" width="45px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	 viewBox="0 0 489.8 489.8" xml:space="preserve">
<g>
	<g>
		<path id="XMLID_595_" style="fill:#3C92CA;" d="M143.2,475H73c-2.1,0-3.9-1.8-3.9-3.9v-184c0-2.1,1.8-3.9,3.9-3.9h70.2
			c2.1,0,3.9,1.8,3.9,3.9v184C147.1,473.2,145.4,475,143.2,475z"/>
		<path d="M247.1,9.1v79.2c0,5,4.1,9.1,9.1,9.1s9.1-4.1,9.1-9.1V9.1c0-5-4.1-9.1-9.1-9.1C251.1,0,247.1,4.1,247.1,9.1z"/>
		<path d="M420.7,178h-79.2c-5,0-9.1,4.1-9.1,9.1s4.1,9.1,9.1,9.1h79.2c5,0,9.1-4.1,9.1-9.1S425.7,178,420.7,178z"/>
		<path d="M82.5,187.1c0,5,4.1,9.1,9.1,9.1h79.2c5,0,9.1-4.1,9.1-9.1s-4.1-9.1-9.1-9.1H91.6C86.6,178,82.5,182.1,82.5,187.1z"/>
		<path d="M131.7,60.9c1.7-1.7,2.7-4,2.7-6.4s-1-4.7-2.7-6.4s-4-2.7-6.4-2.7s-4.7,1-6.4,2.7c-1.7,1.7-2.7,4-2.7,6.4s1,4.7,2.7,6.4
			s4,2.7,6.4,2.7S130,62.6,131.7,60.9z"/>
		<path d="M156.2,85.4c-3.5,3.5-3.5,9.3,0,12.8c1.8,1.8,4.1,2.7,6.4,2.7s4.7-0.9,6.4-2.7c3.5-3.5,3.5-9.3,0-12.8
			C165.5,81.9,159.7,81.9,156.2,85.4z"/>
		<path d="M150.4,79.6c3.5-3.5,3.5-9.3,0-12.8s-9.3-3.5-12.8,0s-3.5,9.3,0,12.8c1.8,1.8,4.1,2.6,6.4,2.6
			C146.3,82.3,148.6,81.4,150.4,79.6z"/>
		<path d="M174.9,104.1c-1.7,1.7-2.6,4-2.6,6.4s1,4.7,2.7,6.4c1.7,1.7,4,2.7,6.4,2.7s4.7-1,6.4-2.7s2.7-4,2.7-6.4s-1-4.7-2.7-6.4
			c-1.7-1.7-4-2.7-6.4-2.7C178.9,101.4,176.5,102.4,174.9,104.1z"/>
		<path d="M372.1,53.9c-1.7,1.7-2.7,4-2.7,6.4s1,4.7,2.7,6.4c1.7,1.7,4,2.7,6.4,2.7s4.7-1,6.4-2.7c1.7-1.7,2.6-4,2.6-6.4
			s-1-4.7-2.6-6.4c-1.7-1.7-4-2.6-6.4-2.6C376.2,51.2,373.8,52.2,372.1,53.9z"/>
		<path d="M341.2,106.6c2.3,0,4.6-0.9,6.4-2.6c3.5-3.5,3.5-9.3,0-12.8s-9.3-3.5-12.8,0s-3.5,9.3,0,12.8
			C336.6,105.8,338.9,106.6,341.2,106.6z"/>
		<path d="M353.5,72.5c-3.5,3.5-3.5,9.3,0,12.8c1.8,1.8,4.1,2.7,6.4,2.7s4.6-0.9,6.4-2.7c3.5-3.5,3.5-9.3,0-12.8S357,69,353.5,72.5z
			"/>
		<path d="M313.5,116.3c0,2.4,1,4.7,2.7,6.4s4,2.7,6.4,2.7s4.7-1,6.4-2.7c1.7-1.7,2.7-4,2.7-6.4s-1-4.7-2.7-6.4
			c-1.7-1.7-4-2.6-6.4-2.6s-4.7,1-6.4,2.6C314.5,111.5,313.5,113.9,313.5,116.3z"/>
		<path d="M428.2,304.2c0-28.2-22.9-51.1-51.1-51.1h-79.4v-57.3c0-24.1-7-41.5-21-51.7c-22-16.2-52.3-6.9-53.5-6.5
			c-3.8,1.2-6.3,4.7-6.3,8.6v64.2c0,50.6-58.7,67.9-61.2,68.6c-1.2,0.3-2.2,0.9-3.1,1.6c-3.1-3.9-7.9-6.4-13.2-6.4H76.9
			c-9.3,0-16.9,7.6-16.9,16.9v176.1c0,9.3,7.6,16.9,16.9,16.9h62.3c6.2,0,11.7-3.4,14.6-8.5c9.2,8.8,21.6,14.2,35.3,14.2h157
			c34.7,0,56.8-18.2,60.7-49.9l21.1-134.3C428.1,305.2,428.2,304.7,428.2,304.2z M138.1,465.9H78.2V292.3h59.9V465.9L138.1,465.9z
			 M389,437.3c0,0.1,0,0.2,0,0.3c-2.8,22.6-17.2,34.1-42.8,34.1h-157c-18.2,0-33-14.8-33-33V296.5c1.4,0.3,2.9,0.3,4.3-0.1
			c3-0.8,74.4-21.6,74.4-86v-56.9c7.8-1.2,21.3-1.9,31,5.2c9,6.6,13.6,19.1,13.6,37.1v66.4c0,5,4.1,9.1,9.1,9.1h88.5
			c18,0,32.6,14.4,33,32.3L389,437.3z"/>
	</g>
</g>
</svg>
                    </span>
                </li>


                        <li id="comments" onclick="showComments(this)">Show comments</li>
                    </ul>
                    <ul id="commentsList" class="hide">${commentsHtml}</ul>
                </ul>
            </article>`;
    }).join("");


   document.getElementById("app").insertAdjacentHTML('beforeend', htmlTemplate);
}


fetchAndParse();
