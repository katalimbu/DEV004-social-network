import { navigateTo } from '../router';
import {createpost} from '../lib/firebase.js';

export const feed = () => {
  const squareF = document.createElement('div');
  squareF.setAttribute('class', 'squareF');
  const squareHeaderF = document.createElement('header');
  squareHeaderF.setAttribute('class', 'squareHeaderF');
  const logoF = document.createElement('img');
  logoF.setAttribute('src', 'https://i.ibb.co/bWGQN64/REDA-1.png');
  logoF.setAttribute('class', 'logoF');
  const userInfoF = document.createElement('div');
  userInfoF.setAttribute('class', 'userInfoF');
  const postContainer = document.createElement('div');
  postContainer.setAttribute('class', 'postContainer');
  const postTitle = document.createElement('textarea');
  postTitle.setAttribute('class', 'postTitle');
  const post = document.createElement('textarea');
  post.setAttribute('class', 'post');
  const subsquareF = document.createElement('div');
  subsquareF.setAttribute('class', 'subsquareF');
  const btnHomeF = document.createElement('button');
  btnHomeF.setAttribute('class', 'btnHomeF');
  const btnPubF = document.createElement('button');
  btnPubF.setAttribute('class', 'btnPubF');
  btnPubF.textContent = 'publicar';
  btnHomeF.textContent = 'inicio';
  const squareFooterF = document.createElement('div');
  squareF.appendChild(squareHeaderF);
  squareHeaderF.appendChild(logoF);
  squareF.appendChild(postContainer);
  squareF.appendChild(userInfoF);
  postContainer.appendChild(postTitle);
  postContainer.appendChild(post);
  squareF.appendChild(subsquareF);
  subsquareF.appendChild(btnPubF);
  subsquareF.appendChild(btnHomeF);
  squareF.appendChild(squareFooterF);
  btnHomeF.addEventListener('click', () => {
    navigateTo('/home');
  });
  return squareF;
};
