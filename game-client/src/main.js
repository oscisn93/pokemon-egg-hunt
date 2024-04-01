import kaboom from "kaboom";

const k = kaboom();

k.setBackground(5,5,5, 0.5);
k.addLevel([
  "*******************",
  "*******************",
  "*  *  *         ***",
  "*  * *   **     ***",
  "*  *  * ** ** * ***",
  "* **    *     * ***",
  "* *  * **   * * ***",
  "* *     *  **   ***",
  "* * *   *    *  ***",
  "* *  **   * **  ***",
  "* *      ** *   ***",
  "* * *   **       **",
  "*       **     * **",
  "*       **  *  * **",
  "**     *** ***   **",
  "**  ****** **  * **",
  "**  ******  *    **",
  "**  ******  *   ***",
  "**     ***     ****",
  "****** ******* ****",
  "****   ******* ****",
  "************** ****",
  "************** ****",
]);


// scene("game", () => {
//   setGravity(1600);

//   const scoreLabel = add([
//     text(score),
//     pos(24,24),
//   ]);

//   onUpdate(() => {
//     score++;
//     scoreLabel.text = score;
//   });
//   
//   const bean = add([
//     sprite("bean"),
//     pos(80, 40),
//     area(),
//     body(),
//   ]);

//   onKeyPress("space", () => {
//     if (bean.isGrounded()) {
//       bean.jump()
//     }
//   });

//   add([
//     rect(width(), 48),
//     pos(0, height() - 48),
//     outline(4),
//     area(),
//     body({ isStatic: true }),
//     color(127, 200, 255),
//   ]);

//   function spawnTree() {
//     add([
//       rect(48, rand(24, 64)),
//       area(),
//       outline(4),
//       pos(width(), height() - 48),
//       anchor("botleft"),
//       color(255, 180, 255),
//       move(LEFT, 240),
//       "tree", // a tag 
//     ]);

//     wait(rand(0.5, 2), () => {
//       spawnTree();
//     })
//   }

//   bean.onCollide("tree", () => {
//     addKaboom(bean.pos);
//     shake();
//     go("lose");
//   });

//   spawnTree();
// });

// go("game");

// scene("lose", () => {
//   add([
//     text(`your total score was: ${score}`),
//     pos(24,24),
//   ]);
//   add([
//     text("Game Over Bud..."),
//     pos(center()),
//     anchor("center"),
//   ]);
//   onKeyPress("space", () => go("game"));
//   onClick(() => go("game"));
// });

