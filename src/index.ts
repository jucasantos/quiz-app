const renderPage = (pageName: string): void => {
  fetch(`pages/${pageName}.html`)
    .then((resp) => resp.text())
    .then((html) => {
      const rootElem = document.getElementById("root") as HTMLElement;

      rootElem.innerHTML = html; //buscar o html da pag start

      if (pageName === "quiz") {
        // Fetch do arquivo questions.json
        fetch("questions.json")
          .then((response) => response.json())
          .then((data) => {
            const currentQuestion = data.questions[0]; // pega a primeira pergunta

            // preenche os elementos HTML com os dados da pergunta
            const questionContainer = document.querySelector(
              ".question-container"
            );
            const btnAnswers = document.querySelectorAll(".btn-answer");

            if (questionContainer) {
              questionContainer.textContent = currentQuestion.question; //pergunta
            }

            if (btnAnswers.length === currentQuestion.options.length) {
              btnAnswers.forEach((btn, index) => {
                btn.textContent = currentQuestion.options[index];
              }); //respostas
            }

            // armazena a resposta correta no localStorage
            localStorage.setItem(
              "CorrectAnswer",
              currentQuestion.correct.toString()
            );
          })
          .catch((error) => {
            console.error("Erro ao carregar perguntas:", error);
          });
      }

      const handleLogIn = (event: Event): void => {
        //evento submit
        event.preventDefault();

        const inputName = document.getElementById(
          "input-name"
        ) as HTMLInputElement;

        let valueName = inputName.value; //valor do input

        // verificar se o campo não está vazio
        if (valueName.trim() === "") {
          //trim verifica os espaços vazios
          alert("Por favor, preencha o campo de nome antes de continuar.");
          return; // não faz o fetch se o campo estiver vazio
        }

        localStorage.setItem("Name", valueName);

        console.log(valueName);

        renderPage("quiz");
      };

      const form = document.getElementById("form-start") as HTMLFormElement;

      if (form) {
        form.addEventListener("submit", handleLogIn);
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar página:", error);
    });
};

renderPage("start");
