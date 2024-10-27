import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // Ensure this is correct
        changeOrigin: true,  // This ensures the proxy forwards the request correctly
        secure: false,  // For development, you can keep it false
      },
    },
  },
  plugins: [react()],
});
