import { useEffect, useState } from "react";
import supabase from "../../Config/supabaseConfig";
import { Navigate, Outlet } from "react-router-dom";

const AuthRouter = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (!error) {
      const accessToken = data.session?.access_token as string;
      setToken(accessToken);
    }
      setLoading(false);
  };

  useEffect(() => {
    getSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return token ? <Outlet /> : <Navigate to={'/login'} />;
};

export default AuthRouter;
