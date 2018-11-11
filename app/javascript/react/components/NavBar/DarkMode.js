class DarkMode{
  turnOnDarkMode(){
    let html = document.documentElement
    let styles = "--bg-color: #272421;"
    styles += "--card-bg-color: #CCC;"
    styles += "--header-font-color: #FFF;"
    styles += "--notes-style-buttons-bg-color: #CCC;"
    styles += "--notes-editor-border-color: #AAA;"
    styles += "--flashcard-border-color: #AAA;"
    styles += "--toggle-eye-color: #EAEAEA;"

    html.setAttribute("style", styles);
  }

  turnOffDarkMode(){
    let html = document.documentElement
    let styles = "--bg-color: #FFF;"
    styles += "--card-bg-color: #FFF;"
    styles += "--header-font-color: #000;"
    styles += "--notes-style-buttons-bg-color: #F1F1F1;"
    styles += "--notes-editor-border-color: #E1E1E1;"
    styles += "--flashcard-border-color: #000;"
    styles += "--toggle-eye-color: #000;"

    html.setAttribute("style", styles);
  }
}

export default DarkMode
