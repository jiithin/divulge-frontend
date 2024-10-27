import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react()],
})
 

// Any requests to /blog will be forwarded to http://localhost:3000.
// server:{
//   proxy:{
//     '/blog':{
//     target:'https://divlge-backend.onrender.com',
//     secure:false,
//   },
// },
// },