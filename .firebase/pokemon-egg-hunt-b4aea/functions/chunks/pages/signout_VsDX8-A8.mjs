const GET = async ({ redirect, cookies }) => {
  cookies.delete("__session", {
    path: "/"
  });
  return redirect("/");
};

export { GET };
