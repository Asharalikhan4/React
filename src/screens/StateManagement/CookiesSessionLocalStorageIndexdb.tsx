const CookiesSessionLocalStorageIndexdb = () => {
  let cookies = document.cookie.split("; ");
  const cookieObj = Object.fromEntries(
    cookies.map((cookie) => {
      const [name, ...rest] = cookie.split("=");
      return [name, rest.join("=")];
    }),
  );

  console.log("Cookie Obj", cookieObj);

  return <div>Ashar</div>;
};

export default CookiesSessionLocalStorageIndexdb;
