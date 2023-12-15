const renderPage = (pageName: string): void => {
  fetch(`pages/${pageName}.html`)
    .then((resp) => resp.text())
    .then((html) => {
      const rootElem = document.getElementById("root") as HTMLElement;

      rootElem.innerHTML = html; //buscar o html da pag start

      const handleLogIn = (event: Event): void => {
        //evento submit
        event.preventDefault();

        const inputName = document.getElementById(
          "input-name"
        ) as HTMLInputElement;

        let valueName = inputName.value; //valor do input

        localStorage.setItem("Name", valueName);

        console.log(valueName);
      };

      const form = document.getElementById("form-start") as HTMLFormElement;

      form.addEventListener("submit", handleLogIn);
    });
};

renderPage("start");
