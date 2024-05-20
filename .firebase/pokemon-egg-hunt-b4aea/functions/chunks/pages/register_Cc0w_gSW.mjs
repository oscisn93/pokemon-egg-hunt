import { e as createComponent, r as renderTemplate, m as maybeRenderHead, h as createAstro } from '../astro_DC_J2cmf.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { a as app } from './game_C00yJdyw.mjs';
import { getAuth } from 'firebase-admin/auth';

const $$Astro = createAstro();
const $$Register = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Register;
  const auth = getAuth(app);
  if (Astro2.cookies.get("__session")) {
    const sessionCookie = Astro2.cookies.get("__session").value;
    const decodedCookie = await auth.verifySessionCookie(sessionCookie);
    if (decodedCookie) {
      Astro2.redirect("/game");
    }
  }
  return renderTemplate`${maybeRenderHead()}<div> <h1>Register</h1> <p>Already have an account? <a href="/">Sign in</a></p> <form action="/api/auth/register" method="post"> <label for="name">Name</label> <input type="text" name="name" id="name"> <label for="email" for="email">Email</label> <input type="email" name="email" id="email"> <label for="password">Password</label> <input type="password" name="password" id="password"> <button type="submit">Login</button> </form> </div>`;
}, "/home/big-o/dev/pokemon-egg-hunt/src/pages/register.astro", void 0);

const $$file = "/home/big-o/dev/pokemon-egg-hunt/src/pages/register.astro";
const $$url = "/register";

export { $$Register as default, $$file as file, $$url as url };
