import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Register</h2>
        
        <div className="mb-4">
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            onChange={handleChange} 
            value={formData.name}
            required 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            onChange={handleChange} 
            value={formData.email}
            required 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            value={formData.password}
            required 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <input 
            type="password" 
            name="password_confirmation" 
            placeholder="Confirm Password" 
            onChange={handleChange} 
            value={formData.password_confirmation}
            required 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
