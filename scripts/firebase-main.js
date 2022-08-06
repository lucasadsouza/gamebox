// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASz67Q4zN-5WRc2YN_jOHhsL2hfG-atGM",
  authDomain: "gamebox-1f010.firebaseapp.com",
  projectId: "gamebox-1f010",
  storageBucket: "gamebox-1f010.appspot.com",
  messagingSenderId: "729292804872",
  appId: "1:729292804872:web:a252d0013c6843a65e92bd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
let user_token = null;


auth.onAuthStateChanged(async (firebase_user) => {
  if (firebase_user) {
    user_token = firebase_user.uid;

    check_auth();

    const profile_pic = document.querySelector('#profile-pic');
    const profile_img = document.querySelector('#profile-img');

    const profile_pic_template = document.querySelector('#profile-pic-template').cloneNode(true);
    const profile_img_template = document.querySelector('#profile-img-template').cloneNode(true);
  
    profile_pic_template.content.querySelectorAll('.pf-img')[0].src = `${coral.url}/images/users_profile_pictures/default-pfp.jpg`;
    profile_img_template.content.querySelectorAll('.profile-img')[0].src = `${coral.url}/images/users_profile_pictures/default-pfp.jpg`;

    profile_pic.replaceWith(document.importNode(profile_pic_template.content, true));
    profile_img.appendChild(document.importNode(profile_img_template.content, true));

    document.querySelector('#profile-nickname').innerText = (await (await coral.get_users(user_token)).json()).nickname;
  }
});


function check_auth() {
  const location_path = window.location.pathname;
  console.log(location_path, user_token);
  if (user_token && location_path == '/sign-in') {
    setTimeout(() => window.location.href = '/', 300);
  }

  if (user_token && location_path == '/sign-up') {
    setTimeout(() => window.location.href = '/', 300);
  }

  if (!user_token && location_path == '/list') {
    setTimeout(() => window.location.href = '/', 300);
  }

  if (!user_token && location_path == '/sign-in' || !user_token && location_path == '/sign-up')
    document.querySelector('#sign-in-form').addEventListener('keydown', (e) => {
      if (e.key == 'Enter') {
        if (window.location.pathname == '/sign-in') {
          sign_in();
    
        } else if (window.location.pathname == '/sign-up') {
          sign_up();
        }
      }
    });
}


async function sign_up() {
  const nickname = document.querySelectorAll('khonshu-text-input')[0].input.value;
  const age = document.querySelectorAll('khonshu-text-input')[1].input.value;
  const email = document.querySelectorAll('khonshu-text-input')[2].input.value;
  const password = document.querySelectorAll('khonshu-text-input')[3].input.value;

  try {
    const user = await auth.createUserWithEmailAndPassword(email, password);
    await coral.create_user(nickname, age, user.user.uid);

  } catch (err) {
    console.log(`Firebase Auth: ${err.message}`);
    const toast = document.querySelector('khonshu-toast');
    toast.innerHTML = '';
    toast.setAttribute('title', 'Erro!');
    toast.setAttribute('type', 'danger');

    if(err.message == 'The email address is badly formatted.') {
      toast.innerText = 'O e-mail inserido é invalido!';

    } else if (err.message == 'The password must be 6 characters long or more.') {
      toast.innerText = 'Sua senha deve ter 6 caracteres ou mais.';
    }

    const toast_icon = document.createElement('i');
    toast_icon.setAttribute('slot', 'icon');
    toast_icon.className = 'bi bi-x';
    toast.appendChild(toast_icon);

    setTimeout(() => toast.show(), 100);
  }
}


async function sign_in() {
  const email = document.querySelectorAll('khonshu-text-input')[0].input.value;
  const password = document.querySelectorAll('khonshu-text-input')[1].input.value;

  try {
    await auth.signInWithEmailAndPassword(email, password);

  } catch (err) {
    console.log(`Firebase Auth: ${err.message}`);
  }
}


function log_out_user() {
  auth.signOut();
  window.location.reload();
}
