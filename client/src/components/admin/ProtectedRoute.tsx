import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";


export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const [status, setStatus] = useState<
    "checking" | "authorized" | "denied"
  >("checking");



  useEffect(() => {

    async function checkAdmin() {

      const {
        data: {
          session,
        },
      } = await supabase.auth.getSession();



      if (!session) {

        setStatus("denied");
        return;

      }



      const {
        data: profile,
        error,
      } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();



      if (error) {

        console.error(
          "Profile check failed:",
          error
        );

        setStatus("denied");
        return;

      }



      if (profile.role === "admin") {

        setStatus("authorized");

      } else {

        setStatus("denied");

      }

    }


    checkAdmin();


    const {
      data: {
        subscription,
      },
    } = supabase.auth.onAuthStateChange(() => {

      checkAdmin();

    });



    return () => {
      subscription.unsubscribe();
    };


  }, []);




  if (status === "checking") {

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#05070d] text-white">
        Checking admin access...
      </div>
    );

  }




  if (status === "denied") {

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );

  }



  return children;

}