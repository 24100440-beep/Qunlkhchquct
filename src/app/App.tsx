import { RouterProvider } from 'react-router';
import { router } from './routes';
import { TravelerProvider } from './context/TravelerContext';

export default function App() {
  return (
    <TravelerProvider>
      <RouterProvider router={router} />
    </TravelerProvider>
  );
}