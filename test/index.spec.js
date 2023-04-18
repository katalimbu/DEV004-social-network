// importamos la funcion que vamos a testear
import { register } from '../src/componets/register';
import { navigateTo, registerError, showError } from '../src/router';
import { Login } from '../src/componets/login';
import { signInWithPassword, registerWithEmail, signInWithGoogle } from '../src/lib/authentication';
import { saveUsers, createpost } from '../src/lib/firebase';
import { feed } from '../src/componets/feed';

jest.mock('../src/lib/authentication', () => ({
  signInWithPassword: jest.fn().mockImplementation(() => Promise.resolve()),
  registerWithEmail: jest.fn().mockImplementation(() => Promise.resolve()),
  signInWithGoogle: jest.fn().mockImplementation(() => Promise.resolve()),
}));
jest.mock('../src/router', () => ({
  navigateTo: jest.fn(),
  registerError: jest.fn(),
  showError: jest.fn(),

}));
jest.mock('../src/lib/firebase', () => ({
  saveUsers: jest.fn().mockImplementation(() => Promise.resolve()),
  createpost: jest.fn().mockImplementation(() => Promise.resolve()),
}));

describe('register', () => {
  it('si el usuario se registrò correctamente debe direccionarse a home', (done) => {
    // router.navigateTo = jest.fn().mockImplementation(() => {
    // expect(router.navigateTo).toHaveBeenCalled();
    //   done();
    // });
    // registerWithEmail.mockResolvedValue(Promise.resolve());
    document.body.appendChild(register());
    document.querySelector('#name').value = 'reda';
    document.querySelector('#email').value = 'reda@gmail.com';
    document.querySelector('#psw').value = '123456';
    document.querySelector('#nationality').value = 'nacional';
    document.querySelector('#Bdate').value = '12-12-2003';
    document.querySelector('#ocupation').value = 'teacher';
    document.querySelector('#redaRol').value = 'especialista';
    document.querySelector('#btnregister').click();
    // document.querySelector('#btnregister').dispatchEvent(new Event('submit'));
    expect(registerWithEmail).toHaveBeenCalledWith(expect.any(String), expect.any(String));
    setTimeout(() => {
      expect(saveUsers).toHaveBeenCalled();
      expect(navigateTo).toHaveBeenCalledWith('/home');
      done();
    });
  });
});

it('si el usuario no comepleta los datos correctamente envia error ', (done) => {
  registerWithEmail.mockRejectedValue({ code: 'error' });
  document.body.appendChild(register());
  document.querySelector('#btnregister').click();
  setTimeout(() => {
    expect(registerError).toHaveBeenCalled();
    done();
  });
});

describe('login', () => {
  it('si el usuario se loguea correctamente debe direccionarse a feed', (done) => {
    // no entiendo si esta linea es necesaria, la 59
    signInWithPassword.mockResolvedValue(Promise.resolve());
    document.body.appendChild(Login());
    document.querySelector('#username').value = 'reda@gmail.com';
    document.querySelector('#psw').value = '12345';
    document.querySelector('.btnEnviarLogin').dispatchEvent(new Event('click'));
    // document.querySelector('.btnEnviarLogin').click()
    // router.navigateTo = jest.fn().mockImplementation(() => {
    expect(signInWithPassword).toHaveBeenCalledWith(expect.any(String), expect.any(String));
    setTimeout(() => {
      expect(navigateTo).toHaveBeenCalledWith('/feed');
      done();
    });
    // });
  });

  it('el login falla con un error', (done) => {
    // showError = jest.fn().mockImplementation(() => {
    signInWithPassword.mockRejectedValue({ code: 'error' });
    document.body.appendChild(Login());
    document.querySelector('.btnEnviarLogin').click();
    setTimeout(() => {
      expect(showError).toHaveBeenCalled();
      done();
    });
  });
});

describe('login with google', () => {
  it('si el usuario se registrò correctamente con google debe direccionarse a feed', (done) => {
    // router.navigateTo = jest.fn().mockImplementation(() => {
    signInWithGoogle.mockResolvedValue(Promise.resolve());
    document.body.appendChild(Login());
    document.querySelector('.google').dispatchEvent(new Event('click'));
    expect(signInWithGoogle).toHaveBeenCalled();
    setTimeout(() => {
      expect(navigateTo).toHaveBeenCalledWith('/feed');
      done();
    });

    // document.querySelector('.btnEnviarLogin').click()
  });

  it('el login de google falla con un error', (done) => {
    signInWithGoogle.mockResolvedValue({ code: 'error' });
    document.body.appendChild(Login());
    document.querySelector('.google').click();
    setTimeout(() => {
      expect(showError).toHaveBeenCalled();
      done();
    });
  });
});

describe('feed', () => {
  it('el usuario retorna un post y llama a la funcion dibujar después del crear el post', (done) => {
    const dibujar = jest.fn()
    document.body.appendChild(feed());
    document.querySelector('#btnPubFeed').click();
    createpost.mockResolvedValue(Promise.resolve());
    setTimeout(() => {
      expect(dibujar).toHaveBeenCalled();
      done();
    });
  });
});
