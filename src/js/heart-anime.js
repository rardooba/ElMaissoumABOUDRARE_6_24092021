const heartAnime = document.querySelectorAll(".likex").forEach((item) => {
  item.addEventListener("click", () => {
    let countLike = 0;
    if (countLike === 0) {
      item.classList.toggle("anim-like");
      countLike++;
      item.style.backgroundPosition = "right";
    } else {
      countLike = 0;
      item.style.backgroundPosition = "left";
    }
  });

  item.addEventListener("animationend", () => {
    item.classList.toggle("anim-like");
  });
});

export default heartAnime;
