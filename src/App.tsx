import { RouterProvider } from 'react-router';
import router from '@/routers/router';
import GlobalStyles from '@/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
