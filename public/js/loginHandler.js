
    document.addEventListener('DOMContentLoaded', () => {
        const loginForm = document.getElementById('login-form');
    
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 
    
            const email = event.target.email.value;
            const password = event.target.password.value;
    
            try {
                const response = await fetch('/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    window.location.href = '/';
                } else {
                   
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error de autenticación:', error);
                alert('Ocurrió un error. Por favor, inténtalo de nuevo.');
            }
        });
    });
    

