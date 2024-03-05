// Esta función establece una cookie para almacenar el idioma seleccionado por el usuario.
function setLanguageCookie(language) {
  document.cookie = "user_language=" + language + "; path=/"; // Almacena el idioma seleccionado en una cookie
  googleTranslateElementInit(language); // Inicializa el widget de traducción de Google con el nuevo idioma
}

// Esta función obtiene el idioma del usuario almacenado en la cookie.
function getLanguageFromCookie() {
  var name = "user_language=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');
  for(var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

// Esta función inicializa el widget de traducción de Google con el idioma especificado.
function googleTranslateElementInit(language) {
  // Si no se proporciona un idioma, se intenta obtener el idioma de la cookie, de lo contrario, se establece español como idioma predeterminado.
  if (!language) {
    language = getLanguageFromCookie() || 'es'; // Obtener el idioma de la cookie o establecer español como idioma predeterminado
  }
  // Configuración del widget de traducción de Google.
  // Se establece el idioma original de la página y los idiomas a los que se puede traducir, junto con el diseño del widget.
  new google.translate.TranslateElement({  
    pageLanguage: 'es',  // Idioma original de la página
    includedLanguages: 'en,es,fr,de,zh-CN,ar,hi,pt,ru,ja',  // Idiomas a los que se puede traducir
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
  google.translate.TranslateElement({pageLanguage: 'es'}, 'google_translate_element');
  new google.translate.TranslateElement({pageLanguage: 'es', includedLanguages: language}, 'google_translate_element');
}
