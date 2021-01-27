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
  constructor({ user, listElem, modalElems, tweetElems }) {
    const fetchData = new FetchData();
    this.user = user;
    this.tweets = new Posts();
    this.elements = {
      listElem: document.querySelector(listElem),
      modal: modalElems,
      tweetElems,
    };

    fetchData.getPost().then((data) => {
      data.forEach(this.tweets.addPost);
      this.showAllPost();
    });
    this.elements.modal.forEach(this.handlerModal, this);
    this.elements.tweetElems.forEach(this.addTweet, this);
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

  handlerModal({ button, modal, overlay, close }) {
    const buttonElem = document.querySelector(button);
    const modalElem = document.querySelector(modal);
    const overlayElem = document.querySelector(overlay);
    const closeElem = document.querySelector(close);

    const openModel = () => {
      modalElem.style.display = "block";
    };
    const closeModel = (elem, event) => {
      const target = event.target;
      if (target === elem) {
        modalElem.style.display = "none";
      }
    };
    buttonElem.addEventListener("click", openModel);
    if (closeElem) {
      closeElem.addEventListener("click", closeModel.bind(null, closeElem));
    }
    if (overlay) {
      overlayElem.addEventListener("click", closeModel.bind(null, overlayElem));
    }

    this.handlerModal.closeModel = () => {
      modalElem.style.display = "none";
    };
  }

  addTweet({ text, img, submit }) {
    const textElem = document.querySelector(text);
    const imgElem = document.querySelector(img);
    const submitElem = document.querySelector(submit);
    let imgUrl = "";
    let tempString = textElem.innerHTML;
    submitElem.addEventListener("click", () => {
      this.tweets.addPost({
        userName: this.user.name,
        nickname: this.user.nick,
        text: textElem.innerHTML,
        img: imgUrl,
      });
      this.showAllPost();
      this.handlerModal.closeModel();
    });
    textElem.addEventListener("click", () => {
      if (textElem.innerHTML === tempString) {
        textElem.innerHTML = "";
      }
    });
    imgElem.addEventListener("click", () => {
      imgUrl = prompt("write text");
    });
  }
}

class Posts {
  constructor({ posts = [] } = {}) {
    this.posts = posts;
  }

  addPost = (tweets) => {
    this.posts.unshift(new Post(tweets));
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
  user: {
    name: "Max",
    nick: "maximus",
  },
  modalElems: [
    {
      button: ".header__link_tweet",
      modal: ".modal",
      overlay: ".overlay",
      close: ".modal-close__btn",
    },
  ],
  tweetElems: [
    {
      text: ".modal .tweet-form__text",
      img: ".modal .tweet-img__btn",
      submit: ".modal .tweet-form__btn",
    },
  ],
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
