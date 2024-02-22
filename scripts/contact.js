document.getElementById('contactForm').addEventListener('submit', function(event) {


  var email = document.getElementById('email').value;
  if (validateEmail(email)) {
      event.preventDefault();
    showModal(email, true);
    setTimeout(function() {

      document.getElementById('contactForm').submit();
  }, 2000);

  } else {
    showModal(email, false);
    event.preventDefault();
  }
});

function validateEmail(email) {
  var regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

function showModal(email, isValid) {
  const modalHtml = `
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <p>Email: ${email} ${isValid ? 'validated' : 'is not valid'}</p>
      </div>
    </div>
  `;


  document.body.insertAdjacentHTML('beforeend', modalHtml);


  var modal = document.getElementById("myModal");
  var span = modal.querySelector(".close");


  modal.style.display = "block";


  span.onclick = function () {
    modal.style.display = "none";
    modal.remove();
  };
}
