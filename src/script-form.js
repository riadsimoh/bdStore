//Using a jquery validation plugin



setTimeout(function () {
  const badge = document.querySelector('.badge');
  console.log(badge);
  badge.innerHTML = sessionStorage.getItem("badge");

}, 500)

// Wait for the DOM to be ready
$(document).ready(function () {

  //Creating a method to verify if the email has a valide format
  $.validator.addMethod("emailVerification", function (value) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(value);
  }, 'Veuillez entrer une adresse mail valide')

  //Creating a method to verify if the name has a valide format
  $.validator.addMethod('nameVerification', function (value) {
    var pattern = /^[a-zA-Z ]{2,30}$/;
    return pattern.test(value);
  }, 'Veuillez entrez un nom et prénom valides,qui  contiennent au moins deux lettres')
  //Creating a method to verify if the subject has a valide format
  $.validator.addMethod('subjectVerification', function (value) {
    var pattern = /^[a-zA-Z0-9a-zA-Z0-9'ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ_-\s]{2,30}$/;
    return pattern.test(value);
  }, 'Vous devez un sujet valide et qui contient au moins deux lettres')


  $.validator.addMethod('messageVerification', function (value) {
    var pattern = /^[a-zA-Z0-9a-zA-Z0-9'ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ_-\s]{10,350}$/;
    return pattern.test(value);
  }, 'Veuillez entrer un message valide, qui contient au moins 10 carctères')


  $("form").validate({

    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      name: {
        required: true,
        minlength: 2,
        nameVerification: true

      },
      email: {
        required: true,
        // Specify that email should be validated
        // by the built-in "email" rule
        emailVerification: true
      },
      subject: {
        required: true,
        subjectVerification: true
      },
      message: {
        required: true,
        messageVerification: true
      }
    },
    // Specify validation error messages
    messages: {
      name: {
        required: "Ce champ est obligatoir",
        minlength: "Votre nom et prénom doivent avoir au moins deux caractères"
      },
      email: {
        required: "Ce champ est obligatoir",
      },
      subject: {
        required: "Ce champ est obligatoir"
      },
      message: {
        required: "Ce champ est obligatoir",
        color: "red"
      }
    }
  });
});