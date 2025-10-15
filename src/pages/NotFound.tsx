import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#2B9FD9] to-[#1f88ca]">
      <div className="text-center px-6">
        {/* Ícone de erro animado */}
        <div className="mb-8 relative">
          <div className="inline-block">
            <Search className="h-32 w-32 text-white/20 opacity-0" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-bold text-white">404</span>
            </div>
          </div>
        </div>

        {/* Título e descrição */}
        <h1 className="mb-4 text-4xl md:text-5xl font-bold text-white">
          Página Não Encontrada
        </h1>
        <p className="mb-8 text-xl text-white/90 max-w-md mx-auto">
          Ops! A página que você está procurando não existe ou foi movida.
        </p>

        {/* Caminho tentado */}
        <div className="mb-8 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 inline-block">
          <p className="text-white/80 text-sm font-mono">
            Rota: <span className="text-white font-semibold">{location.pathname}</span>
          </p>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-white text-[#1f88ca] px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl transform"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-white text-[#1f88ca] px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl transform "
          >
            <Home className="h-5 w-5" />
            Ir para Home
          </button>
        </div>

        {/* Decoração */}
        <div className="mt-12 text-white/60 text-sm">
          <p>SmartLab - Sistema de Gestão Laboratorial</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;