class Twitter {
  constructor({ listElem }) {
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
  constructor(param) {
    this.id = param.id;
    this.userName = param.userName;
    this.nickName = param.nickName;
    this.postDate = param.postDate;
    this.text = param.text;
    this.img = param.img;
    this.likes = param.likes;
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
}

const twitter = new Twitter({
  listElem: ".tweet-list",
});

console.log(twitter);
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
