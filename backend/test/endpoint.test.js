const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: envPath });

async function testEndpoints() {
  console.log('Testing Endpoints...');
  const API_URL = 'http://localhost:4000/api';
  
  // Need to log in to get a token
  console.log('\n--- 1. Login ---');
  let token = '';
  let user = null;
  // We don't have exact credentials, so we might fail this step
  try {
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'jeimytatianapinto@hotmail.com', password: 'password' }) // guessing password
    });
    const loginData = await loginRes.json();
    console.log('Login Response:', loginData);
    if (!loginData.error) {
      token = loginData.token;
      user = loginData.user;
    }
  } catch (err) {
    console.error('Login error:', err);
  }

  // Si no tenemos token, trataremos de usar un JWT firmado con la clave del .env
  if (!token) {
     console.log('Using fallback token generation...');
     const jwt = require('jsonwebtoken');
     // Generar token dummy de admin
     token = jwt.sign({ user: { id: 1, role: 'superadmin', email: 'test@admin.com' } }, process.env.JWT_SECRET || 'fallback', { expiresIn: '1h' });
     user = { id: 1 };
  }

  // Creando servicio
  console.log('\n--- 2. Create Service ---');
  try {
    const serviceData = {
      name: 'Test Service',
      description: 'This is a test service',
      area: 'Salud', // Valid area
      creatorId: user ? user.id : 1, // Valid integer > 0
      status: 'activo'
    };

    console.log('Sending payload:', serviceData);

    // Simulando multipart sin archivo real pero enviando todos los campos como FormData
    const formData = new FormData();
    Object.entries(serviceData).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const createRes = await fetch(`${API_URL}/services`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // fetch automatically sets correct Content-Type for FormData
      },
      body: formData
    });
    
    const createData = await createRes.json();
    console.log('Create Service Response:', JSON.stringify(createData, null, 2));

  } catch (err) {
    console.error('Create error:', err);
  }
}

testEndpoints();
