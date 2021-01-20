class FetchData {
  getResourse = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("error has been occured" + res.status);
    }

    return res.json();
  };

  getPost = () => {
    return this.getResourse("db/database.json");
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
  }

  renderPosts() {}

  showUserPost() {}

  showLikesPost() {}

  showAllPost() {}

  openModal() {}
}

class Posts {
  constructor({ posts = [] } = {}) {
    this.posts = posts;
  }

  addPost(tweet) {
    this.posts.push(new Post(tweet));
  }

  deletePost(id) {}

  likePost(id) {}
}

class Post {
  constructor({ id, userName, nickName, postDate, text, img, likes = 0 }) {
    this.id = id || this.generateID();
    this.userName = userName;
    this.nickName = nickName;
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

  getDate() {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return this.postDate.toLocaleString("ru-RU", options);
  }
}

const twitter = new Twitter({
  listElem: ".tweet-list",
});

console.log(twitter);
console.log(
  Math.random().toString(32).substring(2, 9) + (+new Date()).toString(32)
);

console.log(new FetchData().getPost());
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
