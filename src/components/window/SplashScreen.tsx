import { useEffect, useState } from "react";
import "./SplashScreen.css"

const SplashScreen = ({ onLoaded }: { onLoaded: () => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
      onLoaded(); // Notificar que la app ha cargado
    }, 2000); // Simula un tiempo de carga
  }, []);

  if (!visible) return null;

  return (
    <div className="SplashScreen">
      Cargando...
    </div>
  );
};

export default SplashScreen;
