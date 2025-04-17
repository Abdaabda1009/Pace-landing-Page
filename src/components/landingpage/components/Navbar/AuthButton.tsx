import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CircleHelp } from "lucide-react";
import { ROUTES } from "@/utils/constants";

export const AuthButtons = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("SignUp");
  };

  const HandleContactUs = () => {
    window.location.href = "mailto:Abdaabda1009@paceinv.com";
  }

  return (
    <div className="flex justify-center gap-4">
      <Button
        className=" h-full w-full bg-transparent border hover:bg-blue-200/20 transition-colors duration-200"
        onClick={HandleContactUs}
      >
        <CircleHelp className="w-4 h-4 bg-transparent hover:bg-blue-200/20" />
        Contact Us
      </Button>
      <Button
        className=" h-full w-full bg-transparent border hover:bg-blue-200/20 transition-colors duration-200"
        onClick={handleNavigation}
      >
        Get Started
      </Button>
    </div>
  );
};
