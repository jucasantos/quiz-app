const renderPage = (pageName: string): void => {
    fetch(`pages/${pageName}.html`)
    .then((resp) => resp.text())
    .then((html) => {
        const rootElem = document.getElementById("root") as HTMLElement;
        
        rootElem.innerHTML = html; 

        const form = document.getElementById("form-start") as HTMLFormElement;
        
        form.addEventListener("submit", handleLogIn);
}); 
};

renderPage("start");

const handleLogIn = (event : Event ): void => {
    event.preventDefault();
    
    const inputName = document.getElementById("input-name") as HTMLInputElement; 
    
    let valueName= inputName.value ; 

    localStorage.setItem("ValueName", valueName);
    
    console.log(valueName);

}

