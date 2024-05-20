import { e as createComponent, r as renderTemplate, m as maybeRenderHead, j as renderComponent, h as createAstro } from '../astro_DC_J2cmf.mjs';
import 'kleur/colors';
import 'html-escaper';
import { a as app, $ as $$Layout } from './game_C00yJdyw.mjs';
import { getAuth } from 'firebase-admin/auth';
import 'clsx';

const $$SignIn = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="signup-container"> <h1>Sign in</h1> <form class="create-player-form" action="/api/auth/signin" method="post"> <div class="form-group"> <label for="email" for="email">Email</label> <input type="email" name="email" id="email"> <label for="password">Password</label> <input type="password" name="password" id="password"> <button id="begin-button" type="submit">Login</button> <p>New here? <a href="/register">Create an account</a></p> </div> </form> </div> `;
}, "/home/big-o/dev/pokemon-egg-hunt/src/components/SignIn.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const auth = getAuth(app);
  if (Astro2.cookies.has("__session")) {
    const sessionCookie = Astro2.cookies.get("__session").value;
    const decodedCookie = await auth.verifySessionCookie(sessionCookie);
    if (decodedCookie) {
      return Astro2.redirect("/game");
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main id="content"> ${renderComponent($$result2, "SignIn", $$SignIn, {})} </main> ` })}`;
}, "/home/big-o/dev/pokemon-egg-hunt/src/pages/index.astro", void 0);

const $$file = "/home/big-o/dev/pokemon-egg-hunt/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
