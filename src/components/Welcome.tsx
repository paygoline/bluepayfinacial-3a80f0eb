
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';

const Welcome = () => {
  const { user, completeWelcome } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-orange-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-orange-400 text-white text-2xl font-bold py-4 px-8 rounded-lg mb-8 mx-auto w-fit">
            PAYGO
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
          <h2 className="text-3xl font-bold text-purple-600 mb-6">
            Welcome to PayGo!
          </h2>

          <p className="text-gray-600 mb-2">
            As a new user, you'll receive a generous welcome bonus of
          </p>
          <p className="text-2xl font-bold text-purple-600 mb-2">₦180,000</p>
          <p className="text-gray-600 mb-8">
            which can be withdrawn at any time. Yes, you read that right - it's yours to keep!
          </p>

          <Button
            onClick={completeWelcome}
            className="w-full bg-gradient-to-r from-purple-600 to-orange-400 text-white py-4 text-lg font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Continue to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
