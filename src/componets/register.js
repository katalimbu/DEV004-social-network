import { registerWithEmail } from '../lib/authentication.js';
import { navigateTo } from '../router.js';

export const register = () => {
  const div = document.createElement('div');

  div.innerHTML = `<form id="registerForm">
 
  
 <div class= 'contLogoReg'>
  <img class='logoReg' src="https://i.ibb.co/bWGQN64/REDA-1.png" alt="REDA-1"'> 
  </div>   
  <div class= 'containerTitulo'> 
  <h1 class= 'tituloReg'>  Registro de Usuario</h1>
  </div>
    <div class="containerRegister">

    
      

      <label for="name" class='labelReg'> <b>Nombre</b></label>
      <input type="text" placeholder="Laura Rodríguez" name="name" id="name" class='inputReg'>
      
      <label for="email" class='labelReg' ><b>Correo electrónico</b></label>
      <input type="text" placeholder="laurodriguez@gmail.com" name="email" id="email" required class='inputReg'>
     
      <label for="psw" class='labelReg'><b>Contraseña</b></label>
      <input type="password" placeholder="tu contraseña" name="psw" id="psw" required class='inputReg'>

      <label for="nationality" class='labelReg'><b>Nacionalidad</b></label>
      <input type="text" placeholder="" name="nationality" id="nationality" class='inputReg'>

      <label for="Bdate" class='labelReg'><b>Fecha de Nacimiento</b></label>
      <input type="date" placeholder="Fecha de nacimiento" name="Bdate" id="Bdate" class='inputReg'>

      <label for="ocupation" class='labelReg'><b>Ocupación</b></label>
      <input type="text" placeholder="" name="ocupation" id="ocupation" class='inputReg'>
      <label for="RedaRol" class='labelReg'><b>Tu rol en Reda</b></label>
      <select name=RedaRol>
      <option value= "expert" class='optionReg'>Especialista</option>
      <option value= "carer" class='optionReg'>Cuidador</option>
      <input type="submit" id="btnregister" value="Register"/>
      <div id="divParaErrores"></div>
      </div>   
    <div class="bottom-container">
      </div>
    </div>
    <div class='footerReg'<p>Reda©️</p> </div>
  </form>`;
  // aca metí el form en una constante para que sea mas claro
  const form = div.querySelector('#registerForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log('hola', e.target);
    const email = e.target.elements.email.value;
    const password = e.target.elements.psw.value;
    registerWithEmail(email, password)
      .then((useCredential) => {
        navigateTo('/home');
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.code);
        // eslint-disable-next-line no-lone-blocks
        if (error.code === 'auth/invalid-email') {
          const divErr = document.getElementById('divParaErrores');
          divErr.innerHTML = ('&#10060 &#128064 el e-mail no es válido');
        } else if (error.code === 'auth/weak-password') {
          const divErr = document.getElementById('divParaErrores');
          divErr.innerHTML = ('&#10060 &#128064 La contraseña es muy débil');
        } else if (error.code === 'auth/email-already-in-use') {
          const divErr = document.getElementById('divParaErrores');
          divErr.innerHTML = ('&#10060 &#128064 el e-mail ya está en uso');
        } else if (error.code) {
          const divErr = document.getElementById('divParaErrores');
          divErr.innerHTML = ('&#10060 &#128064 Algo salió mal');
        }
      });
  });
  // pintar el formulario así en vez de "return div" es mas claro y funciona,
  return form;
};
