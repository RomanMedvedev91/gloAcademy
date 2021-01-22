class FetchData {
  getResourse = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("error has been occured " + res.status);
    }

    return res.json();
  };

  getPost = () => {
    return this.getResourse("db/dataBase.json");
  };
}

new FetchData().getPost().then((data) => {
  console.log(data);
});

const obj = new FetchData();

obj.getPost().then((data) => {
  console.log(data);
});
class Twitter {
  constructor({ listElem }) {
    const fetchData = new FetchData();
    this.tweets = new Posts();
    this.elements = {
      listElem: document.querySelector(listElem),
    };

    fetchData.getPost().then((data) => {
      data.forEach(this.tweets.addPost);
      this.showAllPost();
    });
  }

  renderPosts(posts) {
    this.elements.listElem.textContent = "";

    posts.forEach(({ id, userName, nickname, text, img, likes, getDate }) => {
      this.elements.listElem.insertAdjacentHTML(
        "beforeend",
        `
    <li>
    <article class="tweet">
      <div class="row">
        <img
          class="avatar"
          src="images/${nickname}.jpg"
          alt="Аватар пользователя ${nickname}"
        />
        <div class="tweet__wrapper">
          <header class="tweet__header">
            <h3 class="tweet-author">${userName}
              <span class="tweet-author__add tweet-author__nickname"
                >@${nickname}</span>
              <time class="tweet-author__add tweet__date">${getDate()}</time>
            </h3>
            <button class="tweet__delete-button chest-icon" data-id="${id}"></button>
          </header>
          <div class="tweet-post">
            <p class="tweet-post__text">${text}
            </p>
            ${
              img
                ? `<figure class="tweet-post__image">
              <img
                src="${img}"
                alt="image ${nickname}"
              />
            </figure>`
                : ""
            }
          </div>
        </div>
      </div>
      <footer>
        <button class="tweet__like" id="test-like">${likes}</button>
      </footer>
    </article>
  </li>
      `
      );
    });
  }

  showUserPost() {}

  showLikesPost() {}

  showAllPost() {
    this.renderPosts(this.tweets.posts);
  }

  openModal() {}
}

class Posts {
  constructor({ posts = [] } = {}) {
    this.posts = posts;
  }

  addPost = (tweets) => {
    this.posts.push(new Post(tweets));
  };

  deletePost(id) {}

  likePost(id) {}
}

class Post {
  constructor({ id, userName, nickname, postDate, text, img, likes = 0 }) {
    this.id = id || this.generateID();
    this.userName = userName;
    this.nickname = nickname;
    this.postDate = postDate ? new Date(postDate) : new Date();
    this.text = text;
    this.img = img;
    this.likes = likes;
    this.liked = false;
  }

  changeLike() {
    this.liked = !this.liked;
    if (this.liked) {
      this.likes++;
    } else {
      this.likes--;
    }
  }

  generateID() {
    return (
      Math.random().toString(32).substring(2, 9) + (+new Date()).toString(32)
    );
  }

  getDate = () => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return this.postDate.toLocaleString("ru-RU", options);
  };
}

const twitter = new Twitter({
  listElem: ".tweet-list",
});

// // document.addEventListener("DOMContentLoaded", function () {
// //   const testlike = document.getElementById("test-like");

// //   console.log(testlike);
// // });

// // const obj = {
// //   firstName: "Maks",
// //   surname: "Pupkin",
// //   walk: function (steps) {
// //     console.log(this.firstName + "done " + steps + " steps");
// //   },
// // };

// class Character {
//   constructor(param) {
//     this.name = param.name;
//     this.server = param.server;
//     this.gender = param.gender;
//   }
//   walk() {
//     console.log(this.name + " go ");
//   }
//   run() {
//     console.log(this.name + " running ");
//   }
// }

// class Race extends Character {
//   constructor(param) {
//     super(param);
//     this.race = param.race;
//   }
//   run() {
//     super.run();
//     console.log(this.name + " exactly running ");
//   }
//   mainSkill() {
//     console.log(this.race + " " + this.name + " use super skill ");
//   }
// }

// class Class extends Race {
//   constructor(param) {
//     super(param);
//     this.class = param.class;
//   }
//   specialskills() {
//     if (this.class === "war") {
//       return "bluster";
//     }
//   }
//   classSkill() {
//     console.log(
//       `${this.race} ${this.name} ${this.class} fight by ${this.specialskills}`
//     );
//   }
// }

// const war = new Class({
//   name: "bro",
//   server: "any",
//   gender: "male",
//   race: "Ork",
//   class: "war",
// });

// const mag = new Class({
//   name: "Brat",
//   server: "any",
//   gender: "male",
//   race: "man",
//   class: "mag",
// });

// console.log(war);

// war.walk();
// war.run();
// mag.mainSkill();

// // User.prototype.codding = function (time) {
// //   console.log(this.firstName + " write code " + time + " hours");
// // };

// // const vanya = new User({
// //   firstName: "Vanya",
// //   surname: "Pupkin",
// // });

// // const maks = new User(obj);

// // console.log(maks);

// // vanya.walk(30);
// // maks.walk(10);
// // vanya.codding(2);
